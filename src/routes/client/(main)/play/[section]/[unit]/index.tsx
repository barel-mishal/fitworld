import { $, Fragment, type QRL, component$, useComputed$, useStore } from '@builder.io/qwik';
import { routeLoader$ } from '@builder.io/qwik-city';
import { cn } from '@qwik-ui/utils';
import { PhClose, PhHeart } from '~/components/icons/icons';
import { AppLinkGlobal } from '~/routes.config';
import { serverUpdateUserStep, serverUserAddStep } from '~/routes/api/service_game/serviceUserAddStep';
import { type Step, type StepMultipleChoiceType, type StepTextType } from '~/routes/api/service_game/types';

export const useLoaderQuestioner = routeLoader$(async function (event) {
  const params = event.params as { section: string, unit: string };
  const steps = await serverUserAddStep({
    unit: parseInt(params.unit),
    section: parseInt(params.section),
  });
  return steps;
});

type CountStore = {
  step: number;
  onStepChange: QRL<() => void>;
  changeAnswer: QRL<(answer: string) => void>;
  answers: {
    [key: string]: string;
  }
};


export default component$(() => {
  const loadedQuestioner = useLoaderQuestioner().value;
  if (!loadedQuestioner || !loadedQuestioner.success || !loadedQuestioner.value) {
    return <div>Error</div>;
  }

  const game = useStore<CountStore>({
    step: 0,
    onStepChange: $(function(this: CountStore) {
      const current = loadedQuestioner.value.at(this.step);
      switch (current?.metadata.type) {
        case "step_text":
        case "step_multiple_choice":
          this.step = this.step + 1;
          break;
        case "step_finish":
          break;
      }
    }),
    changeAnswer: $(async  function(this: CountStore, answer: string) {
      const current = loadedQuestioner.value[this.step];
      if (current.metadata.type !== "step_multiple_choice") {
        return;
      }
      this.answers[current.metadata.title] = answer;

      current.metadata.answer = current.metadata.options.indexOf(answer);

      await serverUpdateUserStep(current);

    }),
    // TODO: this code below is running on the client each time the there is change. Fix this.
    answers: loadedQuestioner.value.reduce((acc, curr) => {
      if (curr.metadata.type === "step_multiple_choice" && curr.metadata.answer !== undefined) {
        acc[curr.metadata.title] = curr.metadata.options[curr.metadata.answer];
      }
      return acc;
    }, {} as Record<string, string>),
  });

  
  const computedProgress = useComputed$(() => {
    
    function countTotalSteps(steps: Step[]): number {
      return steps.length;
    }
  
    function countRemainingSteps(currentStep: number, steps: Step[]): number {
      return steps.length - currentStep;
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
  return (
    <div class={cn("grid grid-rows-[40px,1fr,60px] gap-3 h-screen text-gray-50  bg-gray-950 font-roundsans tracking-wide overflow-y-auto")}>
      <div q:slot='header' class=" grid grid-cols-[auto,1fr,auto] gap-3 content-center items-center p-2 text-gray-400">
        <AppLinkGlobal route='/client/(main)/play/'>
          <PhClose class="w-6 h-6 fill-gray-700" />
        </AppLinkGlobal>
        <div class="w-full bg-gray-200 rounded-full h-2.5 dark:bg-gray-700">
          <div class="bg-blue-600 h-2.5 rounded-full" style={`width: ${computedProgress.value}%`}></div>
        </div>
        <PhHeart class="w-6 h-6 fill-rose-600" />
      </div>
      <div q:slot='main' class="p-2 overflow-y-auto h-full bg-gray-950">
        {
          currentStep.value.metadata.type === "step_text" ? (
            <RenderLearningTypeText
              text={currentStep.value.metadata.text}
              title={currentStep.value.metadata.title}
              id={`${currentStep.value.id}`}

            />
          ) : currentStep.value.metadata.type === "step_multiple_choice" ? (
            <RenderLearningTypeQuestion
              title={currentStep.value.metadata.title}
              question={currentStep.value.metadata.question}
              options={currentStep.value.metadata.options}
              correctAnswer={currentStep.value.metadata.correctAnswer}
              answer={currentStep.value.metadata.answer}
              id={`${currentStep.value.id}`}
              store={game}
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



export interface RenderLearningTypeTextProps extends Omit<StepTextType, "type" | "next"> {id: string;}

export const RenderLearningTypeText = component$<RenderLearningTypeTextProps>((props) => {

  return (
    <Fragment key={props.id}>
      <h1 class="text-2xl mb-3">{props.title}</h1>
      <p class="text-xl text-gray-400">{props.text}</p>
    </Fragment>
  )
});

export interface RenderLearningTypeQuestionProps extends Omit<StepMultipleChoiceType, "type" | "next"> {
  id: string;
  store: CountStore;
}

export const RenderLearningTypeQuestion = component$<RenderLearningTypeQuestionProps>((props) => {

  return (
    <Fragment key={props.id}>
      <h1 class="text-2xl mb-3">{props.title}</h1>
      <p class="text-xl text-gray-400">{props.question}</p>
      <fieldset
        onChange$={(e) => {
          const target = e.target as HTMLInputElement;
          props.store.changeAnswer(target.value);
        }}
        class="mt-4"
      >
        <legend class="text-xl text-gray-400 pb-4">Choose an option:</legend>
        <div class="grid grid-cols-1 gap-4">
          {props.options.map((option) => (
            <label key={option} class="flex items-center cursor-pointer">
              <input
                type="radio"
                name="question"
                checked={option === props.store.answers[props.title]}
                value={option}
                class="peer hidden"
              />
              <span
                class="ml-2 text-gray-50 p-3 border-gray-50 border-2 sm:w-auto w-full peer-checked:border-blue-200 rounded-md peer-checked:bg-blue-950 peer-checked:text-blue-200 peer-checked:font-bold duration-300 transition-all ease-in-out"
              >
                {option}
              </span>
            </label>
          ))}
        </div>
      </fieldset>
    </Fragment>
  )
});