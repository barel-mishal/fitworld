import { component$, useContext, useSignal, useComputed$ } from '@builder.io/qwik';
import { cn } from '@qwik-ui/utils';
import { Label } from '~/components/ui/label/label';
import { contextAssessmentStore } from '../../../layout';
import { PopoverTrigger } from '@qwik-ui/headless';
import { Popover } from '~/components/ui/popover/popover';
import { convertHeightUnits } from '~/util/convertUnits';
import { formatedNumber } from '~/util/formatNumber';



export default component$(() => {
  const sc = useContext(contextAssessmentStore);
  const refHeight = useSignal<HTMLButtonElement>();
  const isAvtive = useSignal<boolean>(false);

  const computeHeight = useComputed$(async () => `${formatedNumber(convertHeightUnits(170, "cm", sc.data.personalInformation.height.type))}`);
  const inputHeightValue = useComputed$(() => {
    const isActiveAndEmpty = isAvtive.value && !sc.data.personalInformation.height.value;
    if (isActiveAndEmpty) {
      return "";
    }
    const isActiveAndNotEmpty = isAvtive.value && sc.data.personalInformation.height.value;
    if (isActiveAndNotEmpty) {
      return sc.data.personalInformation.height.value;
    }
    const isNotActiveAndNotEmpty = !isAvtive.value && sc.data.personalInformation.height.value;
    if (isNotActiveAndNotEmpty) {
      return `${formatedNumber(sc.data.personalInformation.height.value)}`;
    }
    return "";
  });

  return (
    <div class="grid grid-cols-[1fr,auto] gap-4 w-full info-title tracking-wide">

      <div class="grid max-w-sm items-center gap-1.5 ">
        <Label for="email-2" class="text-emerald-100 [text-wrap:balance]">Height</Label>
        <input 
        ref={refHeight}
        
        type="Height"
        id="Height" 
        placeholder={computeHeight.value.toString()} 
        
        onInput$={async (e,el) => {
          const height = parseFloat(el.value);
          sc.data.personalInformation.height.value = height;
          }} class={cn(
            "inp",
          )} 
          onFocus$={() => {
            isAvtive.value = true;
          }}
          onBlur$={() => {
            isAvtive.value = false;
          }}
          value={inputHeightValue.value}
        />

        <p class="text-sm text-emerald-200/70 h-5">The name shown by others in the application </p>
      </div>
      <div class="grid max-w-sm items-center gap-1.5 ">
        <Label for="email-2" class="text-emerald-100">Unit</Label>
        <MyPopover height={sc.data.personalInformation.height} />
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
    switch (sc.data.personalInformation.height.type) {
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
        class={"btn"}
        popovertarget="unit-height-id"

      >
        <span>
          {sc.data.personalInformation.height.type.toUpperCase()}
        </span>
      </PopoverTrigger>
      <Popover
        flip={false}
        class="bg-emerald-950 text-emerald-50 border border-emerald-800 rounded-base shadow-sm p-2 w-32 -translate-x-[24px] "
        gutter={4}
        ref={popoverRef}
        anchorRef={triggerRef}
        floating={true}
        placement="bottom"
        id="unit-height-id"

      >
        <div class="grid gap-4 w-auto ">
          <button 
          data-active={`${sc.data.personalInformation.height.type === "cm"}`}
          class="btn btn-data-active" onClick$={() => {
            sc.data.personalInformation.height = {...sc.data.personalInformation.height, type: "cm", value: parseFloat(formatedNumber(convertHeightUnits(sc.data.personalInformation.height.value, sc.data.personalInformation.height.type, "cm")))};
          }}>
            <span>CM</span>
          </button>

          <button 
          data-active={`${sc.data.personalInformation.height.type === "m"}`}
          class="btn btn-data-active" onClick$={() => {
            sc.data.personalInformation.height = {...sc.data.personalInformation.height, type: "m", value: parseFloat(formatedNumber(convertHeightUnits(sc.data.personalInformation.height.value, sc.data.personalInformation.height.type, "m")))};
          }}>
            <span>M</span>
          </button>

          <button 
          data-active={`${sc.data.personalInformation.height.type === "FT"}`}
          class="btn btn-data-active" onClick$={() => {
            sc.data.personalInformation.height = {...sc.data.personalInformation.height, type: "FT", value: parseFloat(formatedNumber(convertHeightUnits(sc.data.personalInformation.height.value, sc.data.personalInformation.height.type, "FT")))};
          }}>
            <span>FT</span>
          </button>

        </div>
      </Popover>
      <p class="text-sm text-emerald-200/70 h-5">{getHeightUnit()}</p>
    </>
  );
});
