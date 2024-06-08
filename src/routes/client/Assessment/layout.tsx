import {
  $,
  Slot,
  component$,
  useComputed$,
  useContext,
} from "@builder.io/qwik";
import { useLocation, useNavigate } from "@builder.io/qwik-city";
import { cn } from "@qwik-ui/utils";
import { BsArrowLeft } from "@qwikest/icons/bootstrap";
import { FaUploadSolid } from "@qwikest/icons/font-awesome";
import HeaderMainBottomNav from "~/components/gamelayouts/smallScreens/headerMainBottomNav";
import { Button } from "~/components/ui/button/button";
import { type RoutesLiteral } from "~/util/types";
import { contextAssessmentStore } from "../layout";

export default component$(() => {
  const sc = useContext(contextAssessmentStore);

  type FilterAssessmentPaths<T> = T extends
    | `/client/Assessment/${string}`
    | `/client/(main)/play/`
    ? T
    : never;
  type RoutesLiteralAssessment = FilterAssessmentPaths<RoutesLiteral>;

  const routes: RoutesLiteralAssessment[] = [
    "/client/Assessment/",
    "/client/Assessment/personalInformation/",
    "/client/Assessment/personalInformation/name/",
    "/client/Assessment/personalInformation/DateofBirth/",
    "/client/Assessment/personalInformation/gender/",
    "/client/Assessment/personalInformation/height/",
    "/client/Assessment/personalInformation/current-weight/",
    "/client/Assessment/activity-level/",
    "/client/play/" as "/client/(main)/play/",
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
        sc.actions.mergeProfile.submit({
          field: "name",
          value: sc.data.personalInformation.name,
        });
      },
      "/client/Assessment/personalInformation/DateofBirth/": () => {
        if (!sc.data.personalInformation.dateOfBirth) return;
        const date = new Date(
          `${sc.data.personalInformation.dateOfBirth.year}-${sc.data.personalInformation.dateOfBirth.month}-${sc.data.personalInformation.dateOfBirth.day}`,
        );
        sc.actions.mergeProfile.submit({ field: "dateOfBirth", value: date });
      },
      "/client/Assessment/personalInformation/gender/": function (): unknown {
        sc.actions.mergeProfile.submit({
          field: "gender",
          value: sc.data.personalInformation.gender,
        });
        return;
      },
      "/client/Assessment/": function (): unknown {
        return;
      },
      "/client/Assessment/lifestyleFactors/": function (): unknown {
        throw new Error("Function not implemented.");
      },
      "/client/Assessment/personalInformation/": function (): unknown {
        return;
      },
      "/client/Assessment/personalInformation/current-weight/":
        async function () {
          await sc.actions.mergeWeight.submit({
            value: sc.data.personalInformation.weight.value,
            _type: sc.data.personalInformation.weight.type,
            record: sc.data.personalInformation.weight.id,
          });
          return;
        },
      "/client/Assessment/personalInformation/height/": async function () {
        await sc.actions.mergeHeight.submit({
          value: sc.data.personalInformation.height.value,
          _type: sc.data.personalInformation.height.type,
          record: sc.data.personalInformation.height.id,
        });
        return;
      },
      "/client/(main)/play/": function (): unknown {
        throw new Error("Function not implemented.");
      },
      "/client/Assessment/activity-level/": function (): unknown {
        sc.actions.mergeProfile.submit({
          field: "activity_level",
          value: sc.data.lifeStyle.activityLevel,
        });
        return;
      },
      "/client/Assessment/personalInformation/goals/": function (): unknown {
        throw new Error("Function not implemented.");
      },
    };
    const result = await actions[route]();
    return result;
  });

  // Phone size screen is 380px wide 600px tall
  return (
    <HeaderMainBottomNav>
      <div q:slot="header" class="mx-2">
        <Button
          onClick$={prev}
          look={"ghost"}
          class={cn(
            "p-0 text-gray-200 hover:bg-transparent active:bg-transparent",
            isFirst.value && "hidden",
          )}
        >
          <BsArrowLeft class="" style={{ height: 30, width: 30 }} />
        </Button>
      </div>
      <div q:slot="main" class="mx-2 flex h-full items-start">
        <Slot />
      </div>
      <div q:slot="footer" class="mx-2">
        <button
          disabled={sc.settings.buttonDisabled}
          class="btn-primary w-full text-orange-100"
          onClick$={[merge, next]}
        >
          {" "}
          {sc.actions.mergeProfile.isRunning ? (
            <FaUploadSolid />
          ) : (
            <p class="font-roundsans font-extrabold">CONTINUE</p>
          )}{" "}
        </button>
      </div>
    </HeaderMainBottomNav>
  );
});
