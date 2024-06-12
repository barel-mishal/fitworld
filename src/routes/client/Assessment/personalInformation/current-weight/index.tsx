import {
  component$,
  useContext,
  useSignal,
  useComputed$,
} from "@builder.io/qwik";
import { cn } from "@qwik-ui/utils";
import { Label } from "~/components/ui/label/label";
import { contextAssessmentStore } from "../../../layout";
import { convertWeightUnits } from "~/util/convertUnits";
import { formatedNumber } from "~/util/formatNumber";

export default component$(() => {
  const sc = useContext(contextAssessmentStore);
  const refWeight = useSignal<HTMLButtonElement>();
  const isAvtive = useSignal<boolean>(false);

  const computeHeight = useComputed$(
    async () =>
      `${formatedNumber(convertWeightUnits(76, "kg", sc.data.personalInformation.weight.type))}`,
  );
  const inputHeightValue = () => {
    const isActiveAndEmpty =
      isAvtive.value && !sc.data.personalInformation.weight.value;
    if (isActiveAndEmpty) {
      return "";
    }
    const isActiveAndNotEmpty =
      isAvtive.value && sc.data.personalInformation.weight.value;
    if (isActiveAndNotEmpty) {
      return sc.data.personalInformation.weight.value;
    }
    const isNotActiveAndNotEmpty =
      !isAvtive.value && sc.data.personalInformation.weight.value;
    if (isNotActiveAndNotEmpty) {
      return `${formatedNumber(sc.data.personalInformation.weight.value)}`;
    }
    return "";
  };

  return (
    <div class="grid w-full grid-cols-[1fr,auto] gap-4 font-roundsans">
      <div class="grid max-w-sm grid-rows-[auto,46px,auto] items-center gap-1.5">
        <Label for="email-2" class="text-gray-100">
          Current Weight
        </Label>
        <input
          ref={refWeight}
          type="Height"
          id="Height"
          placeholder={computeHeight.value.toString()}
          onInput$={async (e, el) => {
            const height = parseFloat(el.value);
            sc.data.personalInformation.weight.value = height;
          }}
          class={cn(
            "inp",
            // "flex h-12 w-full rounded-base border border-input bg-background px-3 py-1 text-sm text-foreground shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50",
          )}
          value={inputHeightValue()}
          onFocus$={() => {
            isAvtive.value = true;
          }}
          onBlur$={() => {
            isAvtive.value = false;
          }}
        />

        <p class="h-5 text-sm text-gray-200/70">
          The name shown by others in the application{" "}
        </p>
      </div>
      <div class="grid h-16 w-20 max-w-sm grid-rows-[auto,46px,auto] items-center gap-1.5">
        <Label for="email-2" class="text-gray-100">
          Unit
        </Label>
        <MyPopover />
      </div>
    </div>
  );
});

export const MyPopover = component$(() => {
  const sc = useContext(contextAssessmentStore);
  const triggerRef = useSignal<HTMLButtonElement>();
  const popoverRef = useSignal<HTMLElement>();
  const getWeightUnitSystem = () => {
    switch (sc.data.personalInformation.weight.unit) {
      case "kg":
      case "g":
        return "Metric";
      default:
        return "Imperial";
    }
  };

  return (
    <>
      <div
        ref={triggerRef}
        class={cn("btn")}
        data-popovertarget="current-weight"
      >
        <span>{sc.data.personalInformation.weight.type.toUpperCase()}</span>
      </div>
      <div
        class="-translate-x-[23px] border border-gray-800 bg-gray-950 text-gray-50"
        ref={popoverRef}
        id="current-weight"
      >
        <div class="grid w-auto gap-4">
          <button
            data-active={`${sc.data.personalInformation.weight.type === "kg"}`}
            class="btn btn-data-active"
            onClick$={async () => {
              const weight = sc.data.personalInformation.weight.value;
              const fromUnit = sc.data.personalInformation.weight.type;
              await sc.cahngeWeightUnit(weight, fromUnit, "kg");
            }}
          >
            <span>KG</span>
          </button>

          <button
            data-active={`${sc.data.personalInformation.weight.type === "g"}`}
            class="btn btn-data-active"
            onClick$={async () => {
              const weight = sc.data.personalInformation.weight.value;
              const fromUnit = sc.data.personalInformation.weight.type;
              await sc.cahngeWeightUnit(weight, fromUnit, "g");
            }}
          >
            <span>G</span>
          </button>

          <button
            data-active={`${sc.data.personalInformation.weight.type === "lb"}`}
            class="btn btn-data-active"
            onClick$={async () => {
              const weight = sc.data.personalInformation.weight.value;
              const fromUnit = sc.data.personalInformation.weight.type;
              await sc.cahngeWeightUnit(weight, fromUnit, "lb");
            }}
          >
            <span>LB</span>
          </button>
        </div>
      </div>
      <p class="h-5 text-sm text-gray-200/70">{getWeightUnitSystem()}</p>
    </>
  );
});
