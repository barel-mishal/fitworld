import { component$, useContext, useSignal, useComputed$ } from '@builder.io/qwik';
import { cn } from '@qwik-ui/utils';
import { Label } from '~/components/ui/label/label';
import { contextAssessmentStore } from '../../../layout';
import { PopoverTrigger } from '@qwik-ui/headless';
import { buttonVariants } from '~/components/ui/button/button';
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
    const isNotActiveAndNotEmpty = !isAvtive.value && sc.data.personalInformation?.weight?.value;
    if (isNotActiveAndNotEmpty) {
      return `${formatedNumber(sc.data.personalInformation.weight.value)}`;
    }
    return "";
  };

  return (
    <div class="grid grid-cols-[1fr,auto] gap-4 w-full">

      <div class="grid max-w-sm items-center gap-1.5 ">
        <Label for="email-2" class="text-emerald-100">Current Weight</Label>
        <input 
        ref={refWeight}
        type="Height" id="Height" placeholder={computeHeight.value.toString()} onInput$={async (e,el) => {
          const height = parseFloat(el.value);
          sc.data.personalInformation.weight.value = height;
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
        class={buttonVariants({ look: 'outline', class: "rounded-sm" })}
        popovertarget="current-weight"
      >
        <span>
          {sc.data.personalInformation.weight.type.toUpperCase()}
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
        id="current-weight"

      >
        <div class="grid gap-4 w-auto">
          <button onClick$={() => {
            sc.data.personalInformation.weight = {...sc.data.personalInformation.weight, type: "kg", value: parseFloat(formatedNumber(convertWeightUnits(sc.data.personalInformation.weight.value, sc.data.personalInformation.weight.type, "kg")))};
          }}>
            <span>KG</span>
          </button>

          <button onClick$={() => {
            sc.data.personalInformation.weight = {...sc.data.personalInformation.weight, type: "g", value: parseFloat(formatedNumber(convertWeightUnits(sc.data.personalInformation.weight.value, sc.data.personalInformation.weight.type, "g")))};
          }}>
            <span>G</span>
          </button>

          <button onClick$={() => {
            sc.data.personalInformation.weight = {...sc.data.personalInformation.weight, type: "lb", value: parseFloat(formatedNumber(convertWeightUnits(sc.data.personalInformation.weight.value, sc.data.personalInformation.weight.type, "lb")))};
          }}>
            <span>LB</span>
          </button>

        </div>
      </Popover>
      <p class="text-sm text-emerald-200/70 h-5">{getWeightUnitSystem()}</p>
    </>
  );
});
