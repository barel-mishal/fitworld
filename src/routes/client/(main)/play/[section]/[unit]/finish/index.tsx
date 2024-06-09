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
  return <div class="grid grid-rows-[auto,auto,auto,150px] gap-8 bg-gray-950 h-full place-content-center place-items-center p-5">
    <section><div class="h-44 w-44 bg-green-400" ></div></section>
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
    <section class="text-gray-50 w-full px-5 self-end">
      <button class="btn bg-sky-500 border-sky-700 w-full text-sky-950 font-extrabold ׳">Claim XP</button>
    </section>
  </div>;
});
