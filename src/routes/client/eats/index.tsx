import { component$ } from '@builder.io/qwik';
import { TrackFood } from '~/components/TrackFood/trackFood';

export default component$(() => {
  return (
    <div class="bg-emerald-950 h-screen text-emerald-50 flex flex-col gap-4 p-2">
      <h1 class="text-emerald-300 text-3xl">Mind Full eating</h1>
      <TrackFood />
    </div>
  );
});
