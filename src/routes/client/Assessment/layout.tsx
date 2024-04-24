import { $, Slot, component$, useComputed$, useContext } from '@builder.io/qwik';
import { useLocation, useNavigate } from '@builder.io/qwik-city';
import { cn } from '@qwik-ui/utils';
import { BsArrowLeft } from '@qwikest/icons/bootstrap';
import { FaUploadSolid } from '@qwikest/icons/font-awesome';
import HeaderMainBottomNav from '~/components/gamelayouts/smallScreens/headerMainBottomNav';
import { Button } from '~/components/ui/button/button';
import { type RoutesLiteral } from '~/util/types';
import { contextAssessmentStore } from '../layout';



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
        sc.actions.mergeProfile.submit({ field: "name", value: sc.data.personalInformation.name })
      },
      "/client/Assessment/personalInformation/DateofBirth/": () => {
        if (!sc.data.personalInformation.dateOfBirth) return;
        sc.actions.mergeProfile.submit({ field: "dateOfBirth", value: sc.data.personalInformation.dateOfBirth });
      },
      '/client/Assessment/personalInformation/gender/': function (): unknown {
        sc.actions.mergeProfile.submit({ field: "gender", value: sc.data.personalInformation.gender });
        return 
      },
      '/client/Assessment/': function (): unknown {
        return 
      },
      '/client/Assessment/lifestyleFactors/': function (): unknown {
        throw new Error('Function not implemented.');
      },
      '/client/Assessment/personalInformation/': function (): unknown {
        return
      },
      '/client/Assessment/personalInformation/current-weight/': function (): unknown {
        sc.actions.mergeWeight.submit({ field: "weight", value: sc.data.personalInformation.currentWeight.value });
        return
      },
      '/client/Assessment/personalInformation/height/': function (): unknown {
        sc.actions.mergeHeight.submit({ field: "height", value: sc.data.personalInformation.height.value });
        return
      },
      '/client/(main)/play/': function (): unknown {
        throw new Error('Function not implemented.');
      }
    }
    const result = await actions[route]();
    console.log("result", result);
  });

  // Phone size screen is 380px wide 600px tall
  return (
  
    <HeaderMainBottomNav >
      <div q:slot='header' class=""><Button onClick$={prev} look={"ghost"} class={cn("text-emerald-200 p-0 active:bg-transparent hover:bg-transparent ", isFirst.value && "hidden")}><BsArrowLeft class="" style={{height: 30, width: 30}} /></Button></div>
      <div q:slot='main' class=" h-full flex items-start"><Slot /></div>
      <div q:slot='footer'><Button 
        disabled={sc.settings.buttonDisabled} 
        class="w-full" 
        role={"button"} 
        look={sc.settings.buttonStyle} 
        size={"md"} 
        onClick$={[merge, next]}> {sc.actions.mergeProfile.isRunning ? <FaUploadSolid /> : <p>CONTINUE</p>  } </Button></div>
    </HeaderMainBottomNav>
  );
});
