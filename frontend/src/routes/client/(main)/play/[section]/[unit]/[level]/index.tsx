import {
  $,
  Fragment,
  type QRL,
  component$,
  useComputed$,
  useStore,
} from "@builder.io/qwik";
import { routeLoader$, useLocation, useNavigate } from "@builder.io/qwik-city";
import { cn } from "@qwik-ui/utils";
import CloseModal from "~/components/Modals/CloseModal/CloseModal";
import { PhArrowBendUpLeft, PhHeart } from "~/components/icons/icons";
import { type AppRoutes } from "~/routes.gen";
import {
  serverRemoveUserStep,
  serverUpdateUserStep,
  serverUserAddStep,
} from "~/routes/api/service_game/serviceUserAddStep";
import {
  type Step,
  type StepMultipleChoiceType,
  type StepTextType,
} from "~/routes/api/service_game/types";

export const useLoaderQuestioner = routeLoader$(async function (event) {
  const params = event.params as {
    section: string;
    unit: string;
    level: string;
  };
  const steps = await serverUserAddStep({
    unit: parseInt(params.unit),
    section: parseInt(params.section),
    level: parseInt(params.level),
  });
  return steps;
});

type CountStore = {
  step: number;
  onStepChange: QRL<() => void>;
  changeAnswer: QRL<(answer: string) => void>;
  answers: {
    [key: string]: string | undefined;
  };
  allowNext: QRL<() => boolean>;
  commitedAnswer: boolean;
  commitAnswer: QRL<() => void>;
};

export default component$(() => {
  const loadedQuestioner = useLoaderQuestioner().value;
  const loc = useLocation();
  if (
    !loadedQuestioner ||
    !loadedQuestioner.success ||
    !loadedQuestioner.value
  ) {
    return <div>Error</div>;
  }

  const g = useEducationalGameQuestioner(
    loadedQuestioner.value,
    Number(loc.params.section),
    Number(loc.params.unit),
  );
  return (
    <div
      class={cn(
        "grid h-screen grid-rows-[40px,1fr,60px] gap-3 overflow-y-auto bg-gray-950 font-roundsans tracking-wide text-gray-50",
        ""
      )}
    >
      <div
        q:slot="header"
        class="grid grid-cols-[auto,1fr,auto] content-center items-center gap-3 p-2 bg-gray-950 text-gray-400"
      >
        <CloseModal onClickClose$={g.handelClose} />
        <div class="h-2.5 w-full rounded-full bg-gray-200 dark:bg-gray-700">
          <div
            class="h-2.5 rounded-full bg-blue-600"
            style={`width: ${g.computedProgress.value}%`}
          ></div>
        </div>
        <PhHeart class="h-6 w-6 fill-rose-600" />
      </div>
      <div q:slot="main" class="h-full overflow-y-auto bg-gray-950 p-2">
        {g.currentStep.value.metadata.type === "step_text" ? (
          <RenderLearningTypeText
            text={g.currentStep.value.metadata.text}
            title={g.currentStep.value.metadata.title}
            id={`${g.currentStep.value.id}`}
          />
        ) : (
          // g.currentStep.value.metadata.type === "step_multiple_choice" &&
          <RenderLearningTypeQuestion
            title={g.currentStep.value.metadata.title}
            question={g.currentStep.value.metadata.question}
            options={g.currentStep.value.metadata.options}
            correctAnswer={g.currentStep.value.metadata.correctAnswer}
            answer={g.currentStep.value.metadata.answer}
            id={`${g.currentStep.value.id}`}
            store={g.game}
          />
        )}
      </div>
      <div
        q:slot="footer"
        class={cn(
          "grid gap-2 p-2 pb-6",
          g.currentStep.value.metadata.type === "step_text" &&
            "grid-cols-[auto,1fr]",
        )}
      >
        {g.currentStep.value.metadata.type === "step_text" && (
          <button
            data-right-answer={`${g.game.commitedAnswer ? g.isRightAnswer.value : ""}`}
            class="btn disabled:border-gray-800 disabled:bg-gray-800 data-[right-answer='false']:border-rose-900 data-[right-answer='true']:border-emerald-900 data-[right-answer='false']:bg-rose-700 data-[right-answer='true']:bg-emerald-700"
            disabled={
              g.computedBtnState.value === "disabled" || g.game.step === 0
            }
            onClick$={() => g.game.step !== 0 && g.game.step--}
          >
            <PhArrowBendUpLeft class="h-6 w-6 fill-current" />
          </button>
        )}
        <button
          data-right-answer={`${g.game.commitedAnswer ? g.isRightAnswer.value : ""}`}
          class="btn disabled:border-gray-800 disabled:bg-gray-800 data-[right-answer='false']:border-rose-900 data-[right-answer='true']:border-emerald-900 data-[right-answer='false']:bg-rose-700 data-[right-answer='true']:bg-emerald-700"
          disabled={g.computedBtnState.value === "disabled"}
          onClick$={() => g.game.onStepChange()}
        >
          {g.currentStep.value.metadata.type === "step_text"
            ? "Continue"
            : g.game.commitedAnswer
              ? "Continue"
              : "Check"}
        </button>
      </div>
    </div>
  );
});

export interface RenderLearningTypeTextProps
  extends Omit<StepTextType, "type" | "next"> {
  id: string;
}

export const RenderLearningTypeText = component$<RenderLearningTypeTextProps>(
  (props) => {
    return (
      <Fragment key={props.id}>
        <h1 class="mb-3 text-2xl">{props.title}</h1>
        <p class="text-xl text-gray-400">{props.text}</p>
      </Fragment>
    );
  },
);

export interface RenderLearningTypeQuestionProps
  extends Omit<StepMultipleChoiceType, "type" | "next"> {
  id: string;
  store: CountStore;
}

export const RenderLearningTypeQuestion =
  component$<RenderLearningTypeQuestionProps>((props) => {
    return (
      <Fragment key={props.id}>
        <h1 class="mb-3 text-2xl">{props.title}</h1>
        <p class="text-xl text-gray-400">{props.question}</p>
        <fieldset
          onChange$={(e) => {
            const target = e.target as HTMLInputElement;
            props.store.changeAnswer(target.value);
          }}
          class="mt-4"
        >
          <legend class="pb-4 text-xl text-gray-400">Choose an option:</legend>
          <div class="grid grid-cols-1 gap-4">
            {props.options.map((option) => (
              <label key={option} class="flex cursor-pointer items-center">
                <input
                  type="radio"
                  name="question"
                  checked={option === props.store.answers[props.title]}
                  value={option}
                  class="peer hidden"
                />
                <span class="ml-2 w-full rounded-md border-2 border-gray-50 p-3 text-gray-50 transition-all duration-300 ease-in-out peer-checked:border-blue-200 peer-checked:bg-blue-950 peer-checked:font-bold peer-checked:text-blue-200 sm:w-auto">
                  {option}
                </span>
              </label>
            ))}
          </div>
        </fieldset>
      </Fragment>
    );
  });

export const useEducationalGameQuestioner = (
  loadedQuestioner: Step[],
  section: number,
  unit: number,
) => {
  const a = loadedQuestioner.reduce(
    (acc, curr) => {
      if (
        curr.metadata.type === "step_multiple_choice" &&
        curr.metadata.answer !== undefined
      ) {
        acc[curr.metadata.title] = curr.metadata.options[curr.metadata.answer];
      }
      return acc;
    },
    {} as Record<string, string>,
  );
  const nav = useNavigate();
  const finishPath: AppRoutes =
    `/client/play/${section}/${unit}/finish/` as "/client/(main)/play/[section]/[unit]/finish/";
  const game = useStore<CountStore>({
    step: 0,
    onStepChange: $(function (this: CountStore) {
      const current = loadedQuestioner.at(this.step);
      if (this.step === loadedQuestioner.length - 1) {
        if (this.commitedAnswer) {
          return nav(finishPath, { forceReload: true });
        }
        this.commitAnswer();
        return;
      }
      switch (current?.metadata.type) {
        case "step_text":
          this.step = this.step + 1;
          break;
        case "step_multiple_choice":
          if (this.commitedAnswer) {
            this.step = this.step + 1;
          }
          this.commitAnswer();
          break;
        default:
          break;
      }
    }),
    changeAnswer: $(async function (this: CountStore, answer: string) {
      const current = loadedQuestioner[this.step];
      if (current.metadata.type !== "step_multiple_choice") {
        return;
      }
      this.answers[current.metadata.title] = answer;

      current.metadata.answer = current.metadata.options.indexOf(answer);

      await serverUpdateUserStep(current);
      await this.allowNext();
    }),
    allowNext: $(function (this: CountStore) {
      const answers = this.answers;
      const current = loadedQuestioner[this.step];
      if (current.metadata.type === "step_multiple_choice") {
        return answers[current.metadata.title] !== undefined;
      }
      return true;
    }),
    commitedAnswer: false,
    commitAnswer: $(async function (this: CountStore) {
      this.commitedAnswer = !this.commitedAnswer;
    }),
    // TODO: this code below is running on the client each time the there is change. Fix this.
    answers: a,
  });

  const computedProgress = useComputed$(() => {
    function countTotalSteps(steps: Step[]): number {
      return steps.length - 1;
    }

    function countRemainingSteps(currentStep: number, steps: Step[]): number {
      return countTotalSteps(steps) - currentStep;
    }
    const totalSteps = countTotalSteps(loadedQuestioner);
    const remainingSteps = countRemainingSteps(game.step, loadedQuestioner);
    const completedSteps = totalSteps - remainingSteps;

    return (completedSteps / totalSteps) * 100;
  });

  const computedBtnState = useComputed$(async () => {
    return (await game.allowNext()) ? "enabled" : "disabled";
  });

  const currentStep = useComputed$(() => {
    return loadedQuestioner[game.step];
  });

  const handelClose = $(async () => {
    const result = await serverRemoveUserStep(currentStep.value);
    if (!result.success) return;
    const pathy: AppRoutes = "/client/play/" as "/client/(main)/play/";
    nav(pathy, { forceReload: true });
  });

  const isRightAnswer = useComputed$(() => {
    const current = loadedQuestioner[game.step];
    if (current.metadata.type !== "step_multiple_choice") return undefined;
    const answers = Object.values(game.answers);
    return answers.includes(
      current.metadata.options[current.metadata.correctAnswer],
    );
  });

  return {
    game,
    computedProgress,
    computedBtnState,
    currentStep,
    handelClose,
    isRightAnswer,
  };
};
