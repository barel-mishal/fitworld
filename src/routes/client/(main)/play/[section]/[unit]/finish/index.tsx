import { component$ } from "@builder.io/qwik";
import { routeLoader$ } from "@builder.io/qwik-city";
import { serverUserAddStep } from "~/routes/api/service_game/serviceUserAddStep";

export const useLoaderQuestioner = routeLoader$(async function (event) {
  const params = event.params as { section: string; unit: string };
  const steps = await serverUserAddStep({
    unit: parseInt(params.unit),
    section: parseInt(params.section),
  });
  return steps;
});

export default component$(() => {
  const steps = useLoaderQuestioner();
  console.log(steps.value)
  return <div class="flex flex-col gap-8 bg-gray-950 h-full place-items-center p-5">
    <section class="flex-grow flex items-end"><div class="h-44 w-44 bg-green-400 " ></div></section>
    <section>
      <h1 class="text-2xl font-bold text-yellow-600 text-center">
        Parfect lesson!
      </h1>
      <p class="text-lg text-gray-300 text-center">
        Cheers!
      </p>
    </section>
    <section class="grid grid-cols-3 gap-3 w-screen px-5 justify-items-center">
      <div class="h-20 w-full bg-green-400" ></div>
      <div class="h-20 w-full bg-green-400" ></div>
      <div class="h-20 w-full bg-green-400" ></div>
    </section>
    <section class="text-gray-50 flex-grow flex items-end w-full">
      <button class="btn bg-sky-500 border-sky-700 text-sky-950 font-extrabold flex-grow w-full ">Claim XP</button>
    </section>
  </div>;
});
