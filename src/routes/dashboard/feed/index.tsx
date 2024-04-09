import { component$ } from '@builder.io/qwik';

export default component$(() => {
  return (
    <div class="flex gap-2 bg-sky-200">
      <aside class="">
        <h1 class="font-bold text-sky-800">Notes</h1>
        <ul class="grid gap-1">
          <li>1</li>
          <li>2</li>
          <li>3</li>
          <li>4</li>
        </ul>
      </aside>
      <section class="bg-sky-500 flex flex-grow justify-center justify-items-center justify-self-center">
        <p>sdlfkj</p>
      </section>
    </div>
  );
});
