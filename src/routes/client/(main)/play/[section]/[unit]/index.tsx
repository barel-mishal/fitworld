import { $, Fragment, type QRL, component$, useComputed$, useStore, useTask$ } from '@builder.io/qwik';
import { routeLoader$, useLocation, useNavigate } from '@builder.io/qwik-city';
import { cn } from '@qwik-ui/utils';
import { PhClose, PhHeart } from '~/components/icons/icons';

export const useLoaderQuestioner = routeLoader$(function () {
  

  return {
    steps: {
      intro: "Understanding the basics of good nutrition can significantly boost your energy levels, improve your mental clarity, and promote long-term health. Scientific studies support these claims, providing a solid foundation for these benefits.",
      content: `Good nutrition is the foundation of a healthy life. It provides your body with the essential nutrients it needs to function correctly. By eating a balanced diet rich in fruits, vegetables, whole grains, and lean proteins, you can maintain a healthy weight, reduce the risk of chronic diseases, and feel more energetic throughout the day. According to a study published in the Journal of Nutrition, individuals who followed a balanced diet reported higher energy levels and overall well-being (Smith et al., 2020).

      Proper nutrition also impacts your mental health. Studies have shown that a diet high in processed foods can lead to feelings of fatigue and depression, whereas a diet rich in vitamins and minerals can enhance your mood and cognitive function. A study from the American Journal of Psychiatry found that participants who consumed a diet high in fruits, vegetables, and whole grains had a lower risk of depression compared to those with a diet high in processed foods (Jacka et al., 2017).
      
      Moreover, adopting healthy eating habits can have long-term benefits. Consuming a variety of nutrient-dense foods can strengthen your immune system, support healthy aging, and improve your overall quality of life. The New England Journal of Medicine published research showing that individuals who adhered to a Mediterranean diet had lower incidences of cardiovascular disease and improved longevity (Estruch et al., 2018).`,
      conclusion: `By focusing on nutrition, you’re investing in a healthier, happier future. Let’s dive into a few questions to help solidify your understanding of these benefits.`,
      questions: [{
        type: "multiple-choice",
        question: "What are the immediate benefits of understanding good nutrition?",
        options: ["Improved mental clarity", "Boosted energy levels", "Promoted long-term health", "All of the above"],
        correctAnswer: 3,
        answer: undefined as number | undefined
      }]
    }
  }
});

type CountStore = {
  step: "intro" | "content" | "conclusion" | "questions";
  onStepChange: QRL<() => void>;
};


export default component$(() => {
  const game = useStore<CountStore>({
    step: "intro",  
    onStepChange: $(function(this: CountStore) {
      const goto = {
        intro: "content",
        content: "conclusion",
        conclusion: "questions",
        questions: "intro"
      } as const;
      this.step = goto[this.step];
    })
  });

  const computedProgress = useComputed$(() => {
    if (game.step === "intro") {
      return 0;
    }
    if (game.step === "content") {
      return 33;
    }
    if (game.step === "conclusion") {
      return 66;
    }
    if (game.step === "questions") {
      return 100;
    }
    return 0
  });
  const computedBtnState = useComputed$(() => {
    if (game.step === "questions") {
      return "disabled";
    }
    return "enabled";
  });
  const loadedQuestioner = useLoaderQuestioner();
  const loc = useLocation();
  const nav = useNavigate();

  useTask$(({track, cleanup}) => {
    const stp = track(() => game.step);
    console.log(stp);
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
        game.step === "intro" && <Fragment key={"intro"}>
          <h1 class="text-2xl mb-3">Intro</h1>
          <p class="text-xl text-gray-400">{loadedQuestioner.value.steps.intro}</p>
        </Fragment>
        }
        {
        game.step === "content" && <Fragment key={"content"}>
          <h1 class="text-2xl mb-3">Content</h1>
          <p class="text-xl text-gray-400">{loadedQuestioner.value.steps.content}</p>
        </Fragment>
        }
        {
        game.step === "conclusion" && <Fragment key={"conclusion"}>
          <h1 class="text-2xl mb-3">Conclusion</h1>
          <p class="text-xl text-gray-400">{loadedQuestioner.value.steps.conclusion}</p>
        </Fragment>
        }
        {
        game.step === "questions" && <Fragment key={"questions"}>
          <h1 class="text-2xl mb-3">Questions</h1>
          <p class="text-xl text-gray-400">{loadedQuestioner.value.steps.questions.map(i => {
            return i.question;
          })}</p>
        </Fragment>
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
