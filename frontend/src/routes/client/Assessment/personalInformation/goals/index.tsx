import {
  $,
  component$,
  useComputed$,
  useContext,
  useSignal,
  useStylesScoped$,
} from "@builder.io/qwik";
import { Label } from "~/components/ui/label/label";
import { contextAssessmentStore } from "../../../layout";
import { routeLoader$ } from "@builder.io/qwik-city";
import { fitnessWellnessNutritionGoals } from "~/util/goals";

export const useGoals = routeLoader$(() => {
  return fitnessWellnessNutritionGoals;
});

export default component$(() => {
  const goals = useGoals();
  const index = useSignal<number>(0);
  const currentGoal = useComputed$(
    () => goals.value[index.value % goals.value.length],
  );

  const sc = useContext(contextAssessmentStore);

  // Consolidate state for goals
  const goalStates = useSignal<
    { isActive: boolean; currentWordIndex: number; wordArray: string[] }[]
  >([
    { isActive: false, currentWordIndex: 0, wordArray: [] },
    { isActive: false, currentWordIndex: 0, wordArray: [] },
    { isActive: false, currentWordIndex: 0, wordArray: [] },
  ]);

  // Function to start word display
  const startWordDisplay = $((goal: string, stateIndex: number) => {
    const goalState = goalStates.value[stateIndex];
    goalState.wordArray = goal.split(" ");
    goalState.currentWordIndex = 0;
    goalState.isActive = true;

    const wordTimer = setInterval(() => {
      goalStates.value = goalStates.value.map((state, i) => {
        if (i === stateIndex) {
          if (state.currentWordIndex < state.wordArray.length - 1) {
            return { ...state, currentWordIndex: state.currentWordIndex + 1 };
          } else {
            clearInterval(wordTimer);
            return state;
          }
        }
        return state;
      });
    }, 500);

    return wordTimer;
  });

  // Generalized event handler
  const handleFocus = $((goal: string, stateIndex: number) => {
    index.value = Math.floor(Math.random() * goals.value.length);
    startWordDisplay(goal, stateIndex);
  });

  // Generalized input handler
  const handleInput = $((e: Event, index: number) => {
    const target = e.target as HTMLInputElement;
    sc.data.lifeStyle.goals[index] = target.value;
  });

  useStylesScoped$(`
  .word {
    opacity: 0;
    transition: opacity 0.2s ease-in;
  }
  
  .word.visible {
    opacity: 1;
  }
  `);

  return (
    <div class="info-title grid w-full gap-4 tracking-wide">
      <h3 class="text-lg text-gray-100">Personal Goals</h3>
      {goalStates.value.map((goalState, i) => (
        <div key={i} class="grid max-w-sm items-center gap-1.5">
          <Label
            for={`goal-${i + 1}`}
            class="text-gray-100 [text-wrap:balance]"
          >
            Goal {i + 1}
          </Label>
          <input
            type="text"
            placeholder="Enter your goal here..."
            onInput$={(e) => handleInput(e, i)}
            class="inp"
            onFocus$={() => handleFocus(currentGoal.value, i)}
            value={sc.data.lifeStyle.goals[i]}
          />
          <Label
            for={`goal-${i + 1}`}
            class={`text-xs text-gray-100 [text-wrap:balance] ${goalState.isActive ? "opacity-100" : "opacity-0"}`}
          >
            {goalState.wordArray.map((word, wordIndex) => (
              <span
                key={wordIndex}
                class={`word ${wordIndex <= goalState.currentWordIndex ? "visible" : ""}`}
              >
                {word} {wordIndex < goalState.wordArray.length - 1 ? " " : ""}
              </span>
            ))}
          </Label>
          <p class="h-5 text-sm text-gray-200/70"></p>
        </div>
      ))}
    </div>
  );
});
