import { $, component$ } from '@builder.io/qwik';
import { useLocation, useNavigate } from '@builder.io/qwik-city';

export default component$(() => {
  const nav = useNavigate();
  const loc = useLocation();
  const onClickEditSelections = $(() => {
    const urlPathname = new URLSearchParams(loc.url.pathname);
    console.log(urlPathname.toString());
    nav(`/construction?prev=${urlPathname.toString()}`, {replaceState: true, forceReload: true})
  });
  const onClickCommitEating = $(() => {
    nav('/client/play/', {replaceState: true, forceReload: true})
  });
  return (
    <div class="grid grid-rows-2 p-4 gap-3 min-h-96 ">
      <button onClick$={onClickEditSelections} class="underline text-emerald-200 p-2 [text-wrap:balance] rounded-lg text-2xl">Edit Selections</button>
      <button onClick$={onClickCommitEating} class="bg-emerald-600 p-2 [text-wrap:balance] rounded-lg text-2xl">Yap! that what I have eated</button>
    </div>
  );
});
