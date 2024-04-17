import { component$ } from '@builder.io/qwik';
import { PhFooPeinapple } from '~/components/icons/icons';

export default component$(() => {
  return (
    <div class="grid justify-self-start">
      <PhFooPeinapple class="w-32 h-32" />
      <p class="text-3xl text-center tracking-wider">Hi there! I'm Foo, your friendly guide on this exciting Foodit journey! 🌟</p>
    </div>
  );
});
