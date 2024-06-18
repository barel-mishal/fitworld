import { component$ } from '@builder.io/qwik';
import ImageFooParty from "~/media/LikeFooPeinApple.png?jsx";
import { AppLink } from '~/routes.config';


export default component$(() => {
  // TODO: add real score system
  // TODO: save the score after Claim XP
  // TODO: add the score to the user profile

  return (
       <div class="flex h-full flex-col place-items-center gap-8 bg-gray-950 p-5">
      <section class="flex flex-grow items-end">
        <ImageFooParty class="h-44 w-44" />
      </section>
      <section>
        <h1 class="text-center text-2xl font-bold text-yellow-600">
          New Record 🎉
        </h1>
        <p class="text-center text-lg text-gray-300">Cheers! You Got 10 XP points</p>
        <p class="text-center text-lg text-gray-300">For adding a weekly Record</p>
      </section>
      <section class="grid w-screen place-content-center justify-items-center gap-3 px-5">
        <div class="flex h-32 flex-col rounded-xl w-32 bg-yellow-300 p-[2px]">
          <p class="rounded-t-xl bg-yellow-300 text-center">Total XP</p>
          <h1 class="flex-grow place-content-center rounded-xl bg-gray-950 text-center text-gray-50 text-3xl">
            10
          </h1>
        </div>

      </section>
      <section class="flex w-full flex-grow items-end text-gray-50">
        <AppLink
          route={"/client/user/" as "/client/(main)/user/"}
          class="btn flex h-12 w-full flex-grow items-center justify-center rounded-xl border-sky-700 bg-sky-500 font-extrabold text-sky-950"
        >
          Claim XP
        </AppLink>
      </section>
    </div>
  );
});
