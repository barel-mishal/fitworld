import { component$ } from '@builder.io/qwik';
import { PhFooPeinapple } from '~/components/icons/icons';

export default component$(() => {
  return (
    <div class="text-orange-100 tracking-wider flex place-items-start text-2xl font-roundsans font-extrabold [text-wrap:balance]">
      <PhFooPeinapple class="w-32 h-32" />
      <p>
        Let's get to know you better!
      </p>
    </div>
  );
});
