import { $, component$ } from "@builder.io/qwik";
import { useLocation, useNavigate } from "@builder.io/qwik-city";

export default component$(() => {
  const nav = useNavigate();
  const loc = useLocation();
  const onClickEditSelections = $(() => {
    const urlPathname = new URLSearchParams(loc.url.pathname);
    nav(`/construction?prev=${urlPathname.toString()}`, {
      replaceState: true,
      forceReload: true,
    });
  });
  const onClickCommitEating = $(() => {
    nav("/client/play/", { replaceState: true, forceReload: true });
  });
  return (
    <div class="grid min-h-96 grid-rows-2 gap-3 p-4">
      <button
        onClick$={onClickEditSelections}
        class="rounded-lg p-2 text-2xl text-gray-200 underline [text-wrap:balance]"
      >
        Edit Selections
      </button>
      <button
        onClick$={onClickCommitEating}
        class="rounded-lg bg-gray-600 p-2 text-2xl [text-wrap:balance]"
      >
        Yap! that what I have eated
      </button>
    </div>
  );
});
