import { component$, useContext, useSignal, useComputed$, useTask$ } from '@builder.io/qwik';
import { cn } from '@qwik-ui/utils';
import { Label } from '~/components/ui/label/label';
import { contextAssessmentStore } from '../../layout';
import { PopoverTrigger } from '@qwik-ui/headless';
import { buttonVariants } from '~/components/ui/button/button';
import { Popover } from '~/components/ui/popover/popover';
import { convertWeightUnits } from '~/util/convertUnits';
import { formatedNumber } from '~/util/formatNumber';



export default component$(() => {
  const sc = useContext(contextAssessmentStore);
  const refWeight = useSignal<HTMLButtonElement>();
  const isAvtive = useSignal<boolean>(false);

  const computeHeight = useComputed$(async () => `${formatedNumber(convertWeightUnits(76, "kg", sc.personalInformation.currentWeight.unit))}`);
  const inputHeightValue = () => {
    const isActiveAndEmpty = isAvtive.value && !sc.personalInformation.currentWeight.value;
    if (isActiveAndEmpty) {
      return "";
    }
    const isActiveAndNotEmpty = isAvtive.value && sc.personalInformation.currentWeight.value;
    if (isActiveAndNotEmpty) {
      return sc.personalInformation.currentWeight.value;
    }
    const isNotActiveAndNotEmpty = !isAvtive.value && sc.personalInformation.currentWeight.value;
    if (isNotActiveAndNotEmpty) {
      return `${formatedNumber(sc.personalInformation.currentWeight.value)}`;
    }
    return "";
  };

  const isValid = useComputed$(() => {
    const isNan = isNaN(sc.personalInformation.currentWeight.value);
    const isBig = sc.personalInformation.currentWeight.value > 0;
    return !isNan && isBig
  });

  useTask$(() => {
    sc.settings.buttonDisabled = true;
  })

  useTask$(({track}) => {
    const valid = track(() => isValid.value);
    console.log("valid", valid, sc.personalInformation.currentWeight.value);
    if (valid) {
      sc.settings.buttonDisabled = false;
    } else {
      sc.settings.buttonDisabled = true;
    }
  });

  return (
    <div class="grid grid-cols-[1fr,auto] gap-4 w-full">

      <div class="grid max-w-sm items-center gap-1.5 ">
        <Label for="email-2" class="text-emerald-100">Current Weight</Label>
        <input 
        ref={refWeight}
        type="Height" id="Height" placeholder={computeHeight.value.toString()} onInput$={async (e,el) => {
          const height = parseFloat(el.value);
          sc.personalInformation.currentWeight.value = height;
          }} class={cn(
            "flex h-12 w-full rounded-base border border-input bg-background px-3 py-1 text-sm text-foreground shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50",
          )} value={inputHeightValue()}
          onFocus$={() => {
            isAvtive.value = true;
          }}
          onBlur$={() => {
            isAvtive.value = false;
          }}
        />

        <p class="text-sm text-emerald-200/70 h-5">The name shown by others in the application </p>
      </div>
      <div class="grid max-w-sm items-center gap-1.5 ">
        <Label for="email-2" class="text-emerald-100">Unit</Label>
        <MyPopover height={sc.personalInformation.currentWeight} />
      </div>

    </div>
  );
});

interface HeightGetter {
  height?: {
    unit: string;
    value: number;
  }
}

export const MyPopover = component$<HeightGetter>(() => {
  const sc = useContext(contextAssessmentStore);
  const triggerRef = useSignal<HTMLButtonElement>();
  const popoverRef = useSignal<HTMLElement>();
  const getWeightUnitSystem = () => {
    switch (sc.personalInformation.currentWeight.unit) {
      case "kg":
      case "g":
        return "Metric";
      default:
        return "Imperial";
    }
  };

  return (
    <>
      <PopoverTrigger
        ref={triggerRef}
        class={buttonVariants({ look: 'outline', class: "rounded-sm" })}
        popovertarget="hero-id"
      >
        <span>
          {sc.personalInformation.currentWeight.unit.toUpperCase()}
        </span>
      </PopoverTrigger>
      <Popover
        flip={false}
        class=""
        gutter={4}
        ref={popoverRef}
        anchorRef={triggerRef}
        floating={true}
        placement="bottom"
        id="hero-id"

      >
        <div class="grid gap-4 w-auto">
          <button onClick$={() => {
            sc.personalInformation.currentWeight = {unit: "kg", value: parseFloat(formatedNumber(convertWeightUnits(sc.personalInformation.currentWeight.value, sc.personalInformation.currentWeight.unit, "kg")))};
          }}>
            <span>KG</span>
          </button>

          <button onClick$={() => {
            sc.personalInformation.currentWeight = {unit: "g", value: parseFloat(formatedNumber(convertWeightUnits(sc.personalInformation.currentWeight.value, sc.personalInformation.currentWeight.unit, "g")))};
          }}>
            <span>G</span>
          </button>

          <button onClick$={() => {
            sc.personalInformation.currentWeight = {unit: "lb", value: parseFloat(formatedNumber(convertWeightUnits(sc.personalInformation.currentWeight.value, sc.personalInformation.currentWeight.unit, "lb")))};
          }}>
            <span>LB</span>
          </button>

        </div>
      </Popover>
      <p class="text-sm text-emerald-200/70 h-5">{getWeightUnitSystem()}</p>
    </>
  );
});
