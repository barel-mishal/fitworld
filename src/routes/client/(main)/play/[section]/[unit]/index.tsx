import { $, Fragment, type QRL, component$, useComputed$, useStore, useVisibleTask$ } from '@builder.io/qwik';
import { routeLoader$, useLocation, useNavigate } from '@builder.io/qwik-city';
import { cn } from '@qwik-ui/utils';
import { PhClose, PhHeart } from '~/components/icons/icons';

type StepTextType = {
  type: "text";
  text: string;
  next: keyof AnyStepType;
}

type StepMultipleChoiceType = {
  type: "multiple-choice";
  question: string;
  options: string[];
  correctAnswer: number;
  answer: number | undefined;
  next: keyof AnyStepType;
}

type StepFinishType = {
  type: "finish";
}

type AnyStepType = {
  [key: string]: StepTextType | StepMultipleChoiceType | StepFinishType;
} 

export const useLoaderQuestioner = routeLoader$(function () {


  const questions = {
    q1: {
      type: "multiple-choice",
      question: "What are the immediate benefits of understanding good nutrition?",
      options: ["Improved mental clarity", "Boosted energy levels", "Promoted long-term health", "All of the above"],
      correctAnswer: 3,
      answer: undefined as number | undefined
    }
  };
  
  const stepsData = {
    intro: "Understanding the basics of good nutrition can significantly boost your energy levels, improve your mental clarity, and promote long-term health. Scientific studies support these claims, providing a solid foundation for these benefits.",
    content: `Good nutrition is the foundation of a healthy life. It provides your body with the essential nutrients it needs to function correctly. By eating a balanced diet rich in fruits, vegetables, whole grains, and lean proteins, you can maintain a healthy weight, reduce the risk of chronic diseases, and feel more energetic throughout the day. According to a study published in the Journal of Nutrition, individuals who followed a balanced diet reported higher energy levels and overall well-being (Smith et al., 2020).
  
    Proper nutrition also impacts your mental health. Studies have shown that a diet high in processed foods can lead to feelings of fatigue and depression, whereas a diet rich in vitamins and minerals can enhance your mood and cognitive function. A study from the American Journal of Psychiatry found that participants who consumed a diet high in fruits, vegetables, and whole grains had a lower risk of depression compared to those with a diet high in processed foods (Jacka et al., 2017).
    
    Moreover, adopting healthy eating habits can have long-term benefits. Consuming a variety of nutrient-dense foods can strengthen your immune system, support healthy aging, and improve your overall quality of life. The New England Journal of Medicine published research showing that individuals who adhered to a Mediterranean diet had lower incidences of cardiovascular disease and improved longevity (Estruch et al., 2018).`,
    conclusion: "By focusing on nutrition, you’re investing in a healthier, happier future. Let’s dive into a few questions to help solidify your understanding of these benefits."
  };

  const steps: AnyStepType = {
    intro: {
      type: "text",
      text: stepsData.intro,
      next: "content"
    },
    content: {
      type: "text",
      text: stepsData.content,
      next: "conclusion"
    },
    conclusion: {
      type: "text",
      text: stepsData.conclusion,
      next: "question1"
    },
    question1: {
      type: "multiple-choice",
      question: questions.q1.question,
      options: questions.q1.options,
      correctAnswer: questions.q1.correctAnswer,
      answer: questions.q1.answer,
      next: "finish"
    },
    question2: {
      type: "multiple-choice",
      question: "", // Placeholder for another question if needed
      options: [],
      correctAnswer: 0,
      answer: undefined,
      next: "finish"
    },
    finish: {
      type: "finish",
    }
  };

  return steps;
});

type CountStore = {
  step: keyof AnyStepType;
  onStepChange: QRL<() => void>;
};


export default component$(() => {
  const loadedQuestioner = useLoaderQuestioner();
  const game = useStore<CountStore>({
    step: "intro",  
    onStepChange: $(function(this: CountStore) {
      const current = loadedQuestioner.value[this.step];
      switch (current.type) {
        case "text":
        case "multiple-choice":
          this.step = current.next;
          break;
        case "finish":
          break;
      }
    })
  });

  
  const computedProgress = useComputed$(() => {
    
    function countTotalSteps(steps: AnyStepType): number {
      let count = 0;
      for (const key in steps) {
        if (steps[key as keyof AnyStepType].type !== "finish") {
          count++;
        }
      }
      return count;
    }
  
    function countRemainingSteps(currentStep: keyof AnyStepType, steps: AnyStepType): number {
      const step = steps[currentStep];
      if (step.type === "finish") {
        return 0;
      }
      const nextStep = step.next;
      return 1 + countRemainingSteps(nextStep, steps);
    }
    const totalSteps = countTotalSteps(loadedQuestioner.value);
    const remainingSteps = countRemainingSteps(game.step, loadedQuestioner.value);
    const completedSteps = totalSteps - remainingSteps;
  
    return (completedSteps / totalSteps) * 100;
  });
  
  const computedBtnState = useComputed$(() => {
    return "enabled";
  });

  const currentStep = useComputed$(() => {
    return loadedQuestioner.value[game.step]
  });
  const loc = useLocation();
  const nav = useNavigate();

  // eslint-disable-next-line qwik/no-use-visible-task
  useVisibleTask$(({ track }) => {
    const stp = track(() => game.step);
    
    // Create a new URLSearchParams object from the current search params
    const searchParams = new URLSearchParams(loc.url.search);

    // Set or update the search parameter
    searchParams.set('step', stp.toString());

    // Construct the new URL with updated search parameters
    const newUrl = `${loc.url.pathname}?${searchParams.toString()}`;

    // Navigate to the new URL
    nav(newUrl, { replaceState: false });
  });
  return (
    <div class={cn("grid grid-rows-[40px,1fr,60px] gap-3 h-screen text-gray-50  bg-gray-950 font-roundsans tracking-wide overflow-y-auto")}>
      <div q:slot='header' class=" grid grid-cols-[auto,1fr,auto] gap-3 content-center items-center p-2 text-gray-400">
        <PhClose class="w-6 h-6 fill-gray-700" />
        <div class="w-full bg-gray-200 rounded-full h-2.5 dark:bg-gray-700">
          <div class="bg-blue-600 h-2.5 rounded-full" style={`width: ${computedProgress.value}%`}></div>
        </div>
        <PhHeart class="w-6 h-6 fill-rose-600" />
      </div>
      <div q:slot='main' class="p-2 overflow-y-auto h-full bg-gray-950">
        {
          currentStep.value.type === "text" ? (
            <RenderLearningTypeText
              text={currentStep.value.text}
              title={game.step as string}
              id={game.step as string}
            />
          ) : currentStep.value.type === "multiple-choice" ? (
            <RenderLearningTypeQuestion
              question={currentStep.value.question}
              options={currentStep.value.options}
              correctAnswer={currentStep.value.correctAnswer}
              answer={currentStep.value.answer}
              id={game.step as string}
            />
          ) : (
            <div>Finish</div>
          )
        }


      </div>
      <div q:slot='footer' class="grid pb-6 p-2">
        <button class="btn disabled:bg-gray-800 disabled:border-gray-800 " disabled={computedBtnState.value === "disabled"} onClick$={() => game.onStepChange()}>
          Continue
        </button>
      </div>
  </div>
  );
});



export interface RenderLearningTypeTextProps {
  text: string;
  title: string;
  id: string;
}

export const RenderLearningTypeText = component$<RenderLearningTypeTextProps>((props) => {

  return (
    <Fragment key={props.id}>
      <h1 class="text-2xl mb-3">{props.title}</h1>
      <p class="text-xl text-gray-400">{props.text}</p>
    </Fragment>
  )
});

export interface RenderLearningTypeQuestionProps {
  question: string;
  options: string[];
  correctAnswer: number;
  answer: number | undefined;
  id: string;
}

export const RenderLearningTypeQuestion = component$<RenderLearningTypeQuestionProps>((props) => {

  return (
    <Fragment key={props.id}>
      <h1 class="text-2xl mb-3">{props.id}</h1>
      <p class="text-xl text-gray-400">{props.question}</p>
      <fieldset>
        <legend class="text-xl text-gray-400">Choose an option:</legend>
        <div class="grid grid-cols-1 gap-2">
          {props.options.map((option, index) => (
            <div class="flex items center gap-2" key={index}>
              <input type="radio" id={`option${index}`} name="option" value={index} checked={props.answer === index} />
              <label for={`option${index}`}>{option}</label>
            </div>
          ))}
        </div>
      </fieldset>
    </Fragment>
  )
});