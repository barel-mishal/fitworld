import { component$ } from '@builder.io/qwik';
import { cn } from '@qwik-ui/utils';
import { ModalLogout } from '~/components/gamelayouts/modals/ModalLogout';
import { BottomNavBar } from '~/components/layout_blocks/NavBar/Navs';
import { useAuthSession, useAuthSignout } from '~/routes/plugin@auth';

export default component$(() => {
  const auth = useAuthSession();
  const signout = useAuthSignout();
  console.log('auth', auth.value);
  return (
  <div class={cn("grid grid-rows-[1fr,30px] h-screen text-emerald-50 p-3 bg-emerald-950")}>
    <div class={cn("bg-emerald-950 overflow-y-auto")}>
        <div >
          <div>
            New route works.
            <p>{auth.value?.user?.email}</p>
            <ModalLogout name={auth.value?.user?.name ?? "B"} signout={signout} />
          </div>
        </div>
    </div>
    <div class="bg-emerald-950 content-center">
      <div q:slot='footer' class=""><BottomNavBar user={{class: "--tw bg-sky-300/20 p-1 rounded-md outline-2 outline outline-indigo-200"}} /></div>
    </div>
  </div>
  );
});
