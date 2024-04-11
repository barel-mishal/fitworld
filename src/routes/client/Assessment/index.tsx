import { component$ } from '@builder.io/qwik';
import { AppLink } from '~/routes.config';

export default component$(() => {
  return (
    <div>
      <p>Hi there! I'm Foo, your friendly guide on this exciting Foodit journey! 🌟</p>
      <p>[Foo Avatar]</p>
      {/* Personal Information */}
      {/* Name */}
      <AppLink route="/client/Assessment/personalInformation/">CONTINUE</AppLink>
    </div>
  );
});
