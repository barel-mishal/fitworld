import { component$, useContext, useSignal, $, useComputed$ } from '@builder.io/qwik';
import { cn } from '@qwik-ui/utils';
import { Label } from '~/components/ui/label/label';
import { contextAssessmentStore } from '../../layout';
import { PopoverTrigger } from '@qwik-ui/headless';
import { buttonVariants } from '~/components/ui/button/button';
import { Popover } from '~/components/ui/popover/popover';
import { convertUnits } from '~/util/convertUnits';



export default component$(() => {
  const sc = useContext(contextAssessmentStore);
  const getHeight = $((height: number, type: string | undefined) => {
    switch (type) {
      case "cm":
        return height;
      case "m":
        return height * 100;
      case "FT":
        return height * 30.48;
      default:
        return 0;
    }
  });
  const computeHeight = useComputed$(async () => `${await getHeight(170, sc.personalInformation.height.type)}${sc.personalInformation.height.type}`);
  const inputHeightValue = () => sc.personalInformation.height.value ? `${sc.personalInformation.height.value}${sc.personalInformation.height.type}` : "";
  return (
    <div class="grid grid-cols-[1fr,auto] gap-4 w-full">

      <div class="grid max-w-sm items-center gap-1.5 ">
        <Label for="email-2" class="text-emerald-100">Height</Label>
        <input type="Height" id="Height" placeholder={computeHeight.value.toString()} onInput$={async (e,el) => {
          const height = await getHeight(parseFloat(el.value), sc.personalInformation.height.type);
          sc.personalInformation.height.value = height;
          }} class={cn(
            "flex h-12 w-full rounded-base border border-input bg-background px-3 py-1 text-sm text-foreground shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50",
          )} value={inputHeightValue()} 
        />

        <p class="text-sm text-emerald-200/70 h-5">The name shown by others in the application </p>
      </div>
      <div class="grid max-w-sm items-center gap-1.5 ">
        <Label for="email-2" class="text-emerald-100">Unit</Label>
        <MyPopover height={sc.personalInformation.height} />
      </div>

    </div>
  );
});

interface HeightGetter {
  height?: {
    type: "cm";
    value: number;
} | {
    type: "m";
    value: number;
} | {
    type: "FT";
    value: number;
} | undefined
}

export const MyPopover = component$<HeightGetter>(() => {
  const sc = useContext(contextAssessmentStore);
  const triggerRef = useSignal<HTMLButtonElement>();
  const popoverRef = useSignal<HTMLElement>();
  const getHeightUnit = () => {
    switch (sc.personalInformation.height.type) {
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
        class={buttonVariants({ look: 'outline' })}
        popovertarget="hero-id"
      >
        <span>
          {getHeightUnit()}
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
            sc.personalInformation.height = {type: "cm", value: convertUnits(sc.personalInformation.height.value, sc.personalInformation.height.type, "cm")};
          }}>
            <span>CM</span>
          </button>

          <button onClick$={() => {
            sc.personalInformation.height = {type: "m", value: convertUnits(sc.personalInformation.height.value, sc.personalInformation.height.type, "m")};
          }}>
            <span>M</span>
          </button>

          <button onClick$={() => {
            sc.personalInformation.height = {type: "FT", value: convertUnits(sc.personalInformation.height.value, sc.personalInformation.height.type, "FT")};
          }}>
            <span>FT</span>
          </button>

        </div>
      </Popover>
      <p class="text-sm text-emerald-200/70 h-5">{getHeightUnit()}</p>
    </>
  );
});
