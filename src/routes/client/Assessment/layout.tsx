import { type Session } from '@auth/core/types';
import { $, Slot, component$, useComputed$, useContext, useVisibleTask$ } from '@builder.io/qwik';
import { useLocation, useNavigate, type RequestHandler } from '@builder.io/qwik-city';
import { cn } from '@qwik-ui/utils';
import { Bs0Circle, BsArrowLeft } from '@qwikest/icons/bootstrap';
import HeaderMainBottomNav from '~/components/gamelayouts/smallScreens/headerMainBottomNav';
import { Button } from '~/components/ui/button/button';
import { type RoutesLiteral } from '~/util/types';
import { contextAssessmentStore } from '../layout';

export const onRequest: RequestHandler = (event) => {
  const session: Session | null = event.sharedMap.get('session');
  const isSignedIn = session && new Date(session.expires) > new Date();
  if (!isSignedIn) {
    console.log("redirecting")
    throw event.redirect(302, `/client/play/`);
  }
};



export default component$(() => {
  const sc = useContext(contextAssessmentStore)

  type FilterAssessmentPaths<T> = T extends (`/client/Assessment/${string}` | `/client/(main)/play/`) ? T : never;
  type RoutesLiteralAssessment = FilterAssessmentPaths<RoutesLiteral>;

  const routes: RoutesLiteralAssessment[] = [
    "/client/Assessment/",
    "/client/Assessment/personalInformation/",
    "/client/Assessment/personalInformation/name/",
    "/client/Assessment/personalInformation/DateofBirth/",
    "/client/Assessment/personalInformation/gender/",
    "/client/Assessment/personalInformation/height/",
    "/client/Assessment/personalInformation/current-weight/",
    "/client/play/" as "/client/(main)/play/"
  ];

  
  const location = useLocation();
  const navigate = useNavigate();

  const isFirst = useComputed$(() => {
    const current = location.url.pathname;
    return routes[0] === current;
  });
  
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

  const merge = $(async () => {
    // take long time
    const route = location.url.pathname as RoutesLiteralAssessment;
    const actions: Record<RoutesLiteralAssessment, () => unknown> = {
      "/client/Assessment/personalInformation/name/": () => {
        sc.actionProfileMerge.submit({ field: "name", value: sc.assessmentStore.personalInformation.name })
      },
      "/client/Assessment/personalInformation/DateofBirth/": () => {
        if (!sc.assessmentStore.personalInformation.dateOfBirth) return;
        sc.actionProfileMerge.submit({ field: "dateOfBirth", value: sc.assessmentStore.personalInformation.dateOfBirth });
      },
      '/client/Assessment/personalInformation/gender/': function (): unknown {
        sc.actionProfileMerge.submit({ field: "gender", value: sc.assessmentStore.personalInformation.gender });
        return 
      },
      '/client/Assessment/': function (): unknown {
        // throw new Error('Function not implemented.');
        return 
      },
      '/client/Assessment/lifestyleFactors/': function (): unknown {

        throw new Error('Function not implemented.');
      },
      '/client/Assessment/personalInformation/': function (): unknown {
        return
      },
      '/client/Assessment/personalInformation/current-weight/': function (): unknown {
        throw new Error('Function not implemented.');
      },
      '/client/Assessment/personalInformation/height/': function (): unknown {
        throw new Error('Function not implemented.');
      },
      '/client/(main)/play/': function (): unknown {
        throw new Error('Function not implemented.');
      }
    }
    const result = await actions[route]();
    console.log("result", result);
  });

  // eslint-disable-next-line qwik/no-use-visible-task
  useVisibleTask$(({track}) => {
    const curr = track(() => sc);
    console.log("assessmentStore", curr);
  });

  // Phone size screen is 380px wide 600px tall
  return (
  
    <HeaderMainBottomNav >
      <div q:slot='header' class=""><Button onClick$={prev} look={"ghost"} class={cn("text-emerald-200 p-0 active:bg-transparent hover:bg-transparent ", isFirst.value && "hidden")}><BsArrowLeft class="" style={{height: 30, width: 30}} /></Button></div>
      <div q:slot='main' class=" h-full flex items-start"><Slot /></div>
      <div q:slot='footer'><Button 
        disabled={sc.assessmentStore.settings.buttonDisabled} 
        class="w-full" 
        role={"button"} 
        look={sc.assessmentStore.settings.buttonStyle} 
        size={"md"} 
        onClick$={[merge, next]}> {sc.actionProfileMerge.isRunning ? <Bs0Circle /> : <p>CONTINUE</p>  } </Button></div>
    </HeaderMainBottomNav>
  );
});
