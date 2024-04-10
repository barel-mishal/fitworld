import { component$ } from '@builder.io/qwik';
import { Link } from '@builder.io/qwik-city';

export default component$(() => {
  return (
    <div>
      New route works.
      <Link href="/dashboard/profile/settings">Profile</Link>
    </div>
  );
});
