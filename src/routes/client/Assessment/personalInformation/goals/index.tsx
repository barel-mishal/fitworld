import {
  component$,
  useContext,
  useSignal,
} from "@builder.io/qwik";
import { cn } from "@qwik-ui/utils";
import { Label } from "~/components/ui/label/label";
import { contextAssessmentStore } from "../../../layout";

export default component$(() => {
  const sc = useContext(contextAssessmentStore);
  const isAvtive = useSignal<boolean>(false);

  return (
    <div class="info-title grid w-full gap-4 tracking-wide">
      <h3 class="text-lg text-gray-100">Personal Goals</h3>

      <div class="grid max-w-sm items-center gap-1.5">
        <Label for="email-2" class="text-gray-100 [text-wrap:balance]">
          Goal 1
        </Label>
        <input
          type="text"
          placeholder={"Enter your goal here..."}
          onInput$={async (e, el) => {
            const goal = el.value;
            sc.data.lifeStyle.goals[0] = goal;
          }}
          class={cn("inp")}
          onFocus$={() => {
            isAvtive.value = true;
          }}
          onBlur$={() => {
            isAvtive.value = false;
          }}
          value={sc.data.lifeStyle.goals[0]}
        />

        <p class="h-5 text-sm text-gray-200/70"></p>
      </div>
      <div class="grid max-w-sm items-center gap-1.5">
        <Label for="email-2" class="text-gray-100 [text-wrap:balance]">
          Goal 2
        </Label>
        <input
          type="text"
          placeholder={"Enter your goal here..."}
          onInput$={async (e, el) => {
            const goal = el.value;
            sc.data.lifeStyle.goals[1] = goal;
          }}
          class={cn("inp")}
          onFocus$={() => {
            isAvtive.value = true;
          }}
          onBlur$={() => {
            isAvtive.value = false;
          }}
          value={sc.data.lifeStyle.goals[1]}
        />

        <p class="h-5 text-sm text-gray-200/70"></p>
      </div>
      <div class="grid max-w-sm items-center gap-1.5">
        <Label for="email-2" class="text-gray-100 [text-wrap:balance]">
          Goal 3
        </Label>
        <input
          type="text"
          placeholder={"Enter your goal here..."}
          onInput$={async (e, el) => {
            const goal = el.value;
            sc.data.lifeStyle.goals[2] = goal;
          }}
          class={cn("inp")}
          onFocus$={() => {
            isAvtive.value = true;
          }}
          onBlur$={() => {
            isAvtive.value = false;
          }}
          value={sc.data.lifeStyle.goals[2]}
        />

        <p class="h-5 text-sm text-gray-200/70"></p>
      </div>
    </div>
  );
});
