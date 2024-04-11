import { type Session } from '@auth/core/types';
import { $, Slot, component$ } from '@builder.io/qwik';
import { useLocation, useNavigate, type RequestHandler } from '@builder.io/qwik-city';
import { BsArrowLeft } from '@qwikest/icons/bootstrap';
import HeaderMainBottomNav from '~/components/gamelayouts/smallScreens/headerMainBottomNav';
import { Button } from '~/components/ui/button/button';
import { type RoutesLiteral } from '~/util/types';

export const onRequest: RequestHandler = (event) => {
  const session: Session | null = event.sharedMap.get('session');
  const isSignedIn = session && new Date(session.expires) > new Date();
  if (!isSignedIn) {
    console.log("redirecting")
    throw event.redirect(302, `/`);
  }
};

export default component$(() => {
  const routes: RoutesLiteral[] = [
    "/client/Assessment/",
    "/client/Assessment/personalInformation/",
    "/client/Assessment/personalInformation/name/",
    "/client/Assessment/personalInformation/DateofBirth/",
    "/client/Assessment/personalInformation/gender/",
    "/client/Assessment/personalInformation/height/",
    "/client/Assessment/personalInformation/current-weight/",
  ];
  
  const location = useLocation();
  const navigate = useNavigate();
  
  const next = $(() => {
    const current = location.url.pathname;
    const currentIndex = routes.findIndex((route) => route === current);
    if (currentIndex !== -1 && currentIndex < routes.length - 1) {
      navigate(routes[currentIndex + 1]);
    }
  });
  
  const prev = $(() => {
    const current = location.url.pathname;
    const currentIndex = routes.findIndex((route) => route === current);
    if (currentIndex > 0) {
      navigate(routes[currentIndex - 1]);
    }
  });

  // Phone size screen is 380px wide 600px tall
  return (
  
    <HeaderMainBottomNav >
      <div q:slot='header'><Button onClick$={prev}><BsArrowLeft /></Button></div>
      <div q:slot='main'><Slot /></div>
      <div q:slot='footer'><Button onClick$={next}>CONTINUE</Button></div>
    </HeaderMainBottomNav>
  );
});
