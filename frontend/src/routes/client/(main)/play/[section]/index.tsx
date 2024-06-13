import { component$ } from "@builder.io/qwik";
import { routeLoader$, useLocation } from "@builder.io/qwik-city";
import {
  type StepKey,
  serverGPTSTexts,
} from "~/routes/api/service_game/serviceGPTResult";
import { PhClose, PhFooPeinapple } from "~/components/icons/icons";
import { AppLink } from "~/routes.config";

export const useLoadSteps = routeLoader$(async function (data) {
  try {
    const section = data.params.section as StepKey;
    const steps = await serverGPTSTexts();
    const sectionSteps = steps[section];
    return {
      success: true,
      value: sectionSteps,
    };
  } catch (error) {
    return {
      success: false,
      value: "Error loading steps.",
    };
  }
});

export default component$(() => {
  const loadedSteps = useLoadSteps().value;
  const loc = useLocation();
  const section = loc.params.section;
  const splited = section.split(" ");
  const H1Text = `section ${splited.at(1)} unit ${splited.at(3)} level ${splited.at(5)}`;
  return (
    <div class="h-full overflow-y-scroll bg-gray-950">
      <div class="flex flex-col gap-4 p-3">
        <AppLink route="/client/(main)/play/">
          <PhClose class="fill-white" />
        </AppLink>
        <h1 class="text-2xl text-white">{H1Text}</h1>
        <div class="flex justify-center">
          <PhFooPeinapple class="h-32 w-32" />
        </div>
        {loadedSteps.success ? (
          Array.isArray(loadedSteps.value) ? (
            loadedSteps.value.map((step) => {
              if (step.metadata.type !== "step_text") return null;
              return (
                <div
                  class="bg-gray-850 rounded-md p-3"
                  key={step.metadata.title}
                >
                  <h2 class="text-lg text-white">{step.metadata.title}</h2>
                  <p class="text-white">{step.metadata.text}</p>
                </div>
              );
            })
          ) : (
            <p class="text-white">Unexpected data format.</p>
          )
        ) : (
          <p class="text-white">
            {typeof loadedSteps.value === "string" && loadedSteps.value}
          </p>
        )}
      </div>
    </div>
  );
});
