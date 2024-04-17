import { component$, useContext, useSignal, useComputed$ } from '@builder.io/qwik';
import { cn } from '@qwik-ui/utils';
import { Label } from '~/components/ui/label/label';
import { contextAssessmentStore } from '../../../layout';
import { PopoverTrigger } from '@qwik-ui/headless';
import { buttonVariants } from '~/components/ui/button/button';
import { Popover } from '~/components/ui/popover/popover';
import { convertHeightUnits } from '~/util/convertUnits';
import { formatedNumber } from '~/util/formatNumber';



export default component$(() => {
  const sc = useContext(contextAssessmentStore);
  const refHeight = useSignal<HTMLButtonElement>();
  const isAvtive = useSignal<boolean>(false);

  const computeHeight = useComputed$(async () => `${formatedNumber(convertHeightUnits(170, "cm", sc.assessmentStore.data.personalInformation.height.type))}`);
  const inputHeightValue = () => {
    const isActiveAndEmpty = isAvtive.value && !sc.assessmentStore.data.personalInformation.height.value;
    if (isActiveAndEmpty) {
      return "";
    }
    const isActiveAndNotEmpty = isAvtive.value && sc.assessmentStore.data.personalInformation.height.value;
    if (isActiveAndNotEmpty) {
      return sc.assessmentStore.data.personalInformation.height.value;
    }
    const isNotActiveAndNotEmpty = !isAvtive.value && sc.assessmentStore.data.personalInformation.height.value;
    if (isNotActiveAndNotEmpty) {
      return `${formatedNumber(sc.assessmentStore.data.personalInformation.height.value)}`;
    }
    return "";
  };

  return (
    <div class="grid grid-cols-[1fr,auto] gap-4 w-full">

      <div class="grid max-w-sm items-center gap-1.5 ">
        <Label for="email-2" class="text-emerald-100">Height</Label>
        <input 
        ref={refHeight}
        type="Height" id="Height" placeholder={computeHeight.value.toString()} onInput$={async (e,el) => {
          const height = parseFloat(el.value);
          sc.assessmentStore.data.personalInformation.height.value = height;
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
        <MyPopover height={sc.assessmentStore.data.personalInformation.height} />
      </div>

    </div>
  );
});

interface HeightGetter {
  height?: {
    type: string;
    value: number;
  }
}

export const MyPopover = component$<HeightGetter>(() => {
  const sc = useContext(contextAssessmentStore);
  const triggerRef = useSignal<HTMLButtonElement>();
  const popoverRef = useSignal<HTMLElement>();
  const getHeightUnit = () => {
    switch (sc.assessmentStore.data.personalInformation.height.type) {
      case "cm":
      case "m":
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
        popovertarget="unit-height-id"
      >
        <span>
          {sc.assessmentStore.data.personalInformation.height.type.toUpperCase()}
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
        id="unit-height-id"

      >
        <div class="grid gap-4 w-auto">
          <button onClick$={() => {
            sc.assessmentStore.data.personalInformation.height = {type: "cm", value: parseFloat(formatedNumber(convertHeightUnits(sc.assessmentStore.data.personalInformation.height.value, sc.assessmentStore.data.personalInformation.height.type, "cm")))};
          }}>
            <span>CM</span>
          </button>

          <button onClick$={() => {
            sc.assessmentStore.data.personalInformation.height = {type: "m", value: parseFloat(formatedNumber(convertHeightUnits(sc.assessmentStore.data.personalInformation.height.value, sc.assessmentStore.data.personalInformation.height.type, "m")))};
          }}>
            <span>M</span>
          </button>

          <button onClick$={() => {
            sc.assessmentStore.data.personalInformation.height = {type: "FT", value: parseFloat(formatedNumber(convertHeightUnits(sc.assessmentStore.data.personalInformation.height.value, sc.assessmentStore.data.personalInformation.height.type, "FT")))};
          }}>
            <span>FT</span>
          </button>

        </div>
      </Popover>
      <p class="text-sm text-emerald-200/70 h-5">{getHeightUnit()}</p>
    </>
  );
});
