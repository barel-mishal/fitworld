import { component$ } from '@builder.io/qwik';
import { AppLink } from '~/routes.config';

export default component$(() => {
  return (
    <div>
      First things first, let's get to know you better!
      <AppLink route="/client/Assessment/personalInformation/name/">CONTINUE</AppLink>

    </div>
  );
});
