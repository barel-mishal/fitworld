import { component$ } from "@builder.io/qwik";
import { routeLoader$ } from "@builder.io/qwik-city";
import { serverUserAddStep } from "~/routes/api/service_game/serviceUserAddStep";
import ImageFooParty from "~/media/partyFooPeinapple.png?jsx";

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
    <section class="flex-grow flex items-end">
      <ImageFooParty class="h-44 w-44" />
    </section>
    <section>
      <h1 class="text-2xl font-bold text-yellow-600 text-center">
        Perfect lesson!
      </h1>
      <p class="text-lg text-gray-300 text-center">
        Cheers!
      </p>
    </section>
    <section class="grid grid-cols-3 gap-3 w-screen px-5 justify-items-center">
      <div class="h-20 w-full bg-yellow-300 flex flex-col p-[2px] rounded-xl">
        <p class="bg-yellow-300 rounded-t-xl text-center">total</p>
        <h1 class="text-center bg-gray-950 rounded-xl flex-grow">30:2</h1>
      </div>
      <div class="h-20 w-full bg-sky-300 flex flex-col p-[2px] rounded-xl">
        <p class="bg-sky-300 rounded-t-xl text-center">total</p>
        <h1 class="text-center bg-gray-950 rounded-xl flex-grow">30:2</h1>
      </div>
      <div class="h-20 w-full bg-emerald-300 flex flex-col p-[2px] rounded-xl">
        <p class="bg-emerald-300 rounded-t-xl text-center">total</p>
        <h1 class="text-center bg-gray-950 rounded-xl flex-grow">30:2</h1>
      </div>
    </section>
    <section class="text-gray-50 flex-grow flex items-end w-full">
      <button class="btn rounded-xl h-12 bg-sky-500 border-sky-700 text-sky-950 font-extrabold flex-grow w-full ">Claim XP</button>
    </section>
  </div>;
});
