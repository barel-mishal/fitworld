import { component$ } from "@builder.io/qwik";
import { routeLoader$ } from "@builder.io/qwik-city";
import { serverUserAddStep } from "~/routes/api/service_game/serviceUserAddStep";
import ImageFooParty from "~/media/partyFooPeinapple.png?jsx";
import { StepSchema } from "~/routes/api/service_game/types";
import { AppLink } from "~/routes.config";

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

  const stepsValue = steps.value;
  if (!stepsValue) return <div>Loading...</div>;
  const stepsParsed = StepSchema.required().array().min(3).safeParse(stepsValue.value);
  if (!stepsParsed.success) return <div>Error: {stepsParsed.error.message}</div>;
  const lastRecord = stepsParsed.data.reduce((acc, curr) => {
    const updated = new Date(curr.updated_at);
    return {
      min: updated < acc.min ? updated : acc.min,
      max: updated > acc.max ? updated : acc.max,
      correct: acc.correct + (curr.metadata.type === "step_multiple_choice" && curr.metadata.answer === curr.metadata.correctAnswer ? 1 : 0),
    };
  }, { min: new Date(stepsParsed.data[0].updated_at), max: new Date(stepsParsed.data[0].updated_at), correct: 0 });

  const { min: firstRecordDate, max: lastRecordDate } = lastRecord;

  const totalSeconds = (lastRecordDate.getTime() - firstRecordDate.getTime()) / 1000;
  const totalMinutes = Math.floor(totalSeconds / 60);
  const remainingSeconds = Math.floor(totalSeconds % 60);

  const formattedMinutes = totalMinutes.toString().padStart(2, "0");
  const formattedSeconds = remainingSeconds.toString().padStart(2, "0");

  const time = `${formattedMinutes}:${formattedSeconds}`;
  const presentageCorrect = `${lastRecord.correct/stepsParsed.data.filter(s => s.metadata.type === "step_multiple_choice").length * 100}%`
    
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
        <p class="bg-yellow-300 rounded-t-xl text-center">Total XP</p>
        <h1 class="text-center bg-gray-950 rounded-xl flex-grow text-gray-50 place-content-center">25</h1>
      </div>
      <div class="h-20 w-full bg-sky-300 flex flex-col p-[2px] rounded-xl">
        <p class="bg-sky-300 rounded-t-xl text-center">Quick</p>
        <h1 class="text-center bg-gray-950 rounded-xl flex-grow text-gray-50 place-content-center">{time}</h1>
      </div>
      <div class="h-20 w-full bg-emerald-300 flex flex-col p-[2px] rounded-xl">
        <p class="bg-emerald-300 rounded-t-xl text-center">Amazing</p>
        <h1 class="text-center bg-gray-950 rounded-xl flex-grow text-gray-50 place-content-center">{presentageCorrect}</h1>
      </div>
    </section>
    <section class="text-gray-50 flex-grow flex items-end w-full">
      <AppLink route={"/client/play/" as "/client/(main)/play/"} class="btn items-center flex justify-center rounded-xl h-12 bg-sky-500 border-sky-700 text-sky-950 font-extrabold flex-grow w-full ">Claim XP</AppLink>
    </section>
  </div>;
});
