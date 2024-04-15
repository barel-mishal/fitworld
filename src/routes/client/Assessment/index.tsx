import { component$ } from '@builder.io/qwik';
import { PhFooPeinapple } from '~/components/icons/icons';

export default component$(() => {
  return (
    <div>
      <p>Hi there! I'm Foo, your friendly guide on this exciting Foodit journey! 🌟</p>
      <PhFooPeinapple class="w-32 h-32" />
    </div>
  );
});
