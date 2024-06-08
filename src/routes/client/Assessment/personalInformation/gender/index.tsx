import { component$, useContext } from "@builder.io/qwik";
import { Button } from "~/components/ui/button/button";
import { contextAssessmentStore } from "../../../layout";

export default component$(() => {
  const sc = useContext(contextAssessmentStore);

  return (
    <div class="grid w-full grid-cols-2 grid-rows-[200px] gap-4">
      <Button
        class={[
          "grid h-full bg-pink-700 tracking-widest transition-all duration-200 ease-in-out hover:bg-pink-700 active:bg-pink-800",
          sc.data.personalInformation.gender === "female"
            ? "scale-90 ring ring-offset-1"
            : "",
        ]}
        onClick$={() => {
          sc.data.personalInformation.gender = "female";
        }}
      >
        Female
      </Button>
      <Button
        class={[
          "grid h-full bg-blue-700 tracking-widest transition-all duration-200 ease-in-out hover:bg-blue-700 active:bg-blue-800",
          sc.data.personalInformation.gender === "male"
            ? "scale-90 ring ring-offset-1"
            : "",
        ]}
        onClick$={() => {
          sc.data.personalInformation.gender = "male";
        }}
      >
        Male
      </Button>
    </div>
  );
});
