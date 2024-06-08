import {
  $,
  Fragment,
  component$,
  useOnDocument,
  useSignal,
} from "@builder.io/qwik";
import { PhClose, PhFooPeinapple } from "~/components/icons/icons";

export default component$(() => {
  const refRoot = useSignal<HTMLDivElement>();
  const show = useSignal<boolean>(false);

  const onClickOpen = $(() => (show.value = !show.value));
  const onClickOutside = $((even: Event) => {
    const isClickOutside =
      refRoot.value && !refRoot.value.contains(even.target as Node);
    if (isClickOutside && show.value) {
      show.value = false;
    }
  });

  useOnDocument("click", onClickOutside);

  return (
    <Fragment>
      <button onClick$={onClickOpen}>
        <PhClose class="h-6 w-6 fill-gray-700" />
      </button>
      <div
        ref={refRoot}
        class="absolute flex h-full w-full flex-col items-end backdrop-blur-md transition-all duration-200 data-[show='false']:-bottom-full data-[show='true']:-bottom-0 data-[show='true']:bg-gray-400/30"
        data-show={String(show.value)}
      >
        <button
          class="h-full w-full bg-transparent"
          onClick$={onClickOpen}
        ></button>
        <div class="w-full bg-gray-950 p-4">
          <div class="flex h-full w-full flex-col items-center justify-center gap-5">
            <PhFooPeinapple class="h-24 w-24 fill-gray-700" />
            <h4 class="grid gap-2 text-center font-roundsans font-bold text-gray-50">
              <span>Hold on! If you leave now,</span>
              <span>you might lose all your progress.</span>
            </h4>
            <button class="btn h-12 w-full border border-b-4 border-sky-700 bg-sky-300 font-bold text-gray-950">
              Keep Learning
            </button>

            <button onClick$={onClickOpen} class="w-full text-rose-600">
              End Session
            </button>
          </div>
        </div>
      </div>
    </Fragment>
  );
});
