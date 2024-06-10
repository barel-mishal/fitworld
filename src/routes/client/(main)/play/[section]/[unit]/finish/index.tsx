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
  const stepsParsed = StepSchema.required()
    .array()
    .min(3)
    .safeParse(stepsValue.value);
  if (!stepsParsed.success)
    return <div>Error: {stepsParsed.error.message}</div>;
  const lastRecord = stepsParsed.data.reduce(
    (acc, curr) => {
      const updated = new Date(curr.updated_at);
      return {
        min: updated < acc.min ? updated : acc.min,
        max: updated > acc.max ? updated : acc.max,
        correct:
          acc.correct +
          (curr.metadata.type === "step_multiple_choice" &&
          curr.metadata.answer === curr.metadata.correctAnswer
            ? 1
            : 0),
      };
    },
    {
      min: new Date(stepsParsed.data[0].updated_at),
      max: new Date(stepsParsed.data[0].updated_at),
      correct: 0,
    },
  );

  const { min: firstRecordDate, max: lastRecordDate } = lastRecord;

  const totalSeconds =
    (lastRecordDate.getTime() - firstRecordDate.getTime()) / 1000;
  const totalMinutes = Math.floor(totalSeconds / 60);
  const remainingSeconds = Math.floor(totalSeconds % 60);

  const formattedMinutes = totalMinutes.toString().padStart(2, "0");
  const formattedSeconds = remainingSeconds.toString().padStart(2, "0");

  const time = `${formattedMinutes}:${formattedSeconds}`;
  const presentageCorrect = `${(lastRecord.correct / stepsParsed.data.filter((s) => s.metadata.type === "step_multiple_choice").length) * 100}%`;

  return (
    <div class="flex h-full flex-col place-items-center gap-8 bg-gray-950 p-5">
      <section class="flex flex-grow items-end">
        <ImageFooParty class="h-44 w-44" />
      </section>
      <section>
        <h1 class="text-center text-2xl font-bold text-yellow-600">
          Perfect lesson!
        </h1>
        <p class="text-center text-lg text-gray-300">Cheers!</p>
      </section>
      <section class="grid w-screen grid-cols-3 justify-items-center gap-3 px-5">
        <div class="flex h-20 w-full flex-col rounded-xl bg-yellow-300 p-[2px]">
          <p class="rounded-t-xl bg-yellow-300 text-center">Total XP</p>
          <h1 class="flex-grow place-content-center rounded-xl bg-gray-950 text-center text-gray-50">
            25
          </h1>
        </div>
        <div class="flex h-20 w-full flex-col rounded-xl bg-sky-300 p-[2px]">
          <p class="rounded-t-xl bg-sky-300 text-center">Quick</p>
          <h1 class="flex-grow place-content-center rounded-xl bg-gray-950 text-center text-gray-50">
            {time}
          </h1>
        </div>
        <div class="flex h-20 w-full flex-col rounded-xl bg-emerald-300 p-[2px]">
          <p class="rounded-t-xl bg-emerald-300 text-center">Amazing</p>
          <h1 class="flex-grow place-content-center rounded-xl bg-gray-950 text-center text-gray-50">
            {presentageCorrect}
          </h1>
        </div>
      </section>
      <section class="flex w-full flex-grow items-end text-gray-50">
        <AppLink
          route={"/client/play/" as "/client/(main)/play/"}
          class="btn flex h-12 w-full flex-grow items-center justify-center rounded-xl border-sky-700 bg-sky-500 font-extrabold text-sky-950"
        >
          Claim XP
        </AppLink>
      </section>
    </div>
  );
});
