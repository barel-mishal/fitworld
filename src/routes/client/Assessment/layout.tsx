import { type Session } from '@auth/core/types';
import { $, Slot, component$, createContextId, useComputed$, useContextProvider, useStore, useVisibleTask$ } from '@builder.io/qwik';
import { useLocation, useNavigate, type RequestHandler } from '@builder.io/qwik-city';
import { cn } from '@qwik-ui/utils';
import { Bs0Circle, BsArrowLeft } from '@qwikest/icons/bootstrap';
import HeaderMainBottomNav from '~/components/gamelayouts/smallScreens/headerMainBottomNav';
import { Button } from '~/components/ui/button/button';
import { type RoutesLiteral } from '~/util/types';
import { useActionMergeProfile } from '../layout';

export const onRequest: RequestHandler = (event) => {
  const session: Session | null = event.sharedMap.get('session');
  const isSignedIn = session && new Date(session.expires) > new Date();
  if (!isSignedIn) {
    console.log("redirecting")
    throw event.redirect(302, `/client/play/`);
  }
};

interface AssessmentStoreType {
  settings: { buttonStyle: "outline" | "link" | "primary" | "secondary" | "alert" | "ghost" | null | undefined,
  buttonDisabled: boolean
},
  personalInformation: {
    gender: "female" | "male" | "" | undefined,
    name: string,
    dateOfBirth: Date | undefined,
    height: {type: "cm" | "m" | "FT", value: number},
    currentWeight: {unit: "kg" | "g" | "lb", value: number},
  },
  lifeStyle: {
    occupation: string,
    activityLevel: string,
    goals: [string, string, string]
  },
  currentView: RoutesLiteral
} 

export const useAssessmentStore = () => {
  const actionProfileMerge = useActionMergeProfile()

  const assessmentStore = useStore<AssessmentStoreType>({ 
    settings: { 
      buttonStyle: "outline", 
      buttonDisabled: false 
    }, 
    personalInformation: {
      gender: "", 
      name: "",
      dateOfBirth: undefined,
      height: {
        type: "cm", 
        value: 0
      },
      currentWeight: {
        unit: "kg", 
        value: 0
      }
    },
    lifeStyle: {
      occupation: "",
      activityLevel: "",
      goals: ["", "", ""],
    },
    currentView: "/client/Assessment/",
});


  return {assessmentStore, actionProfileMerge};
}

export type AssessmentStore = ReturnType<typeof useAssessmentStore>;

export const contextAssessmentStore = createContextId<AssessmentStore>("Assessment");


export default component$(() => {
  const sc = useAssessmentStore();
  useContextProvider(contextAssessmentStore, sc);

  const routes: RoutesLiteral[] = [
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
    switch (location.url.pathname) {
      case "/client/Assessment/personalInformation/name/":
        await sc.actionProfileMerge.submit({field: "name", value: sc.assessmentStore.personalInformation.name});
        break;
      case "/client/Assessment/personalInformation/DateofBirth/":
        if (!sc.assessmentStore.personalInformation.dateOfBirth) {
          break;
        }
        await sc.actionProfileMerge.submit({field: "dateOfBirth", value: sc.assessmentStore.personalInformation.dateOfBirth});
        break;
      default:
          break;
    }
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
      <div q:slot='main' class=" h-full flex items-center"><Slot /></div>
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
