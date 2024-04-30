import { component$, useContext, useSignal, useComputed$ } from '@builder.io/qwik';
import { cn } from '@qwik-ui/utils';
import { Label } from '~/components/ui/label/label';
import { contextAssessmentStore } from '../../../layout';
import { PopoverTrigger } from '@qwik-ui/headless';
import { Popover } from '~/components/ui/popover/popover';
import { convertWeightUnits } from '~/util/convertUnits';
import { formatedNumber } from '~/util/formatNumber';



export default component$(() => {
  const sc = useContext(contextAssessmentStore);
  const refWeight = useSignal<HTMLButtonElement>();
  const isAvtive = useSignal<boolean>(false);

  const computeHeight = useComputed$(async () => `${formatedNumber(convertWeightUnits(76, "kg", sc.data.personalInformation.weight.type))}`);
  const inputHeightValue = () => {
    const isActiveAndEmpty = isAvtive.value && !sc.data.personalInformation.weight.value;
    if (isActiveAndEmpty) {
      return "";
    }
    const isActiveAndNotEmpty = isAvtive.value && sc.data.personalInformation.weight.value;
    if (isActiveAndNotEmpty) {
      return sc.data.personalInformation.weight.value;
    }
    const isNotActiveAndNotEmpty = !isAvtive.value && sc.data.personalInformation.weight.value;
    if (isNotActiveAndNotEmpty) {
      return `${formatedNumber(sc.data.personalInformation.weight.value)}`;
    }
    return "";
  };

  return (
    <div class="grid grid-cols-[1fr,auto] gap-4 w-full font-roundsans">

      <div class="grid max-w-sm items-center gap-1.5 grid-rows-[auto,46px,auto] ">
        <Label for="email-2" class="text-emerald-100">Current Weight</Label>
        <input 
        ref={refWeight}
        type="Height" id="Height" placeholder={computeHeight.value.toString()} onInput$={async (e,el) => {
          const height = parseFloat(el.value);
          sc.data.personalInformation.weight.value = height;
          }} class={cn(
            "inp"
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

        <p class="text-sm text-emerald-200/70 h-5">The name shown by others in the application </p>
      </div>
      <div class="grid max-w-sm items-center gap-1.5 grid-rows-[auto,46px,auto] w-20 h-16">
        <Label for="email-2" class="text-emerald-100">Unit</Label>
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
      <PopoverTrigger
        ref={triggerRef}
        class={cn("btn")}
        popovertarget="current-weight"
      >
        <span>
          {sc.data.personalInformation.weight.type.toUpperCase()}
        </span>
      </PopoverTrigger>
      <Popover
        flip={false}
        class="-translate-x-[23px] bg-emerald-950 border border-emerald-800 text-emerald-50 "
        gutter={4}
        ref={popoverRef}
        anchorRef={triggerRef}
        floating={true}
        placement="bottom"
        id="current-weight"

      >
        <div class="grid gap-4 w-auto">
          <button 
          data-active={`${sc.data.personalInformation.weight.type === "kg"}`}
          class="btn btn-data-active"
          onClick$={async () => {
            const weight = sc.data.personalInformation.weight.value;
            const fromUnit = sc.data.personalInformation.weight.type;
            await sc.cahngeWeightUnit( weight, fromUnit, "kg");
          }}>
            <span>KG</span>
          </button>

          <button 
          data-active={`${sc.data.personalInformation.weight.type === "g"}`}
          class="btn btn-data-active"
          onClick$={async () => {
            const weight = sc.data.personalInformation.weight.value;
            const fromUnit = sc.data.personalInformation.weight.type;
            await sc.cahngeWeightUnit( weight, fromUnit, "g");
          }}>
            <span>G</span>
          </button>

          <button 
          data-active={`${sc.data.personalInformation.weight.type === "lb"}`}
          class="btn btn-data-active"
          onClick$={async () => {
            const weight = sc.data.personalInformation.weight.value;
            const fromUnit = sc.data.personalInformation.weight.type;
            await sc.cahngeWeightUnit( weight, fromUnit, "lb");
          }}>
            <span>LB</span>
          </button>

        </div>
      </Popover>
      <p class="text-sm text-emerald-200/70 h-5">{getWeightUnitSystem()}</p>
    </>
  );
});
