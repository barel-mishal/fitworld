import { component$ } from '@builder.io/qwik';
import ImageFooParty from "~/media/LikeFooPeinApple.png?jsx";
import { AppLink } from '~/routes.config';


export default component$(() => {
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
            10:00
            {/* {time} */}
          </h1>
        </div>
        <div class="flex h-20 w-full flex-col rounded-xl bg-emerald-300 p-[2px]">
          <p class="rounded-t-xl bg-emerald-300 text-center">Amazing</p>
          <h1 class="flex-grow place-content-center rounded-xl bg-gray-950 text-center text-gray-50">
            30%
            {/* {presentageCorrect} */}
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
