import { component$ } from '@builder.io/qwik';
import { MyModalSignOut } from '~/components/layout_blocks/dashboard_layout_components/dashboardModal';
import { useAuthSession, useAuthSignout } from '~/routes/plugin@auth';

export default component$(() => {
  const auth = useAuthSession();
  const signout = useAuthSignout();
  return (
    <div>
      New route works.
      <p>{auth.value?.user?.email}</p>
      <MyModalSignOut name={auth.value?.user?.name ?? "B"} signout={signout} />

    </div>
  );
});
