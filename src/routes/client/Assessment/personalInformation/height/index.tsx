import { component$, useContext, useSignal } from '@builder.io/qwik';
import { cn } from '@qwik-ui/utils';
import { Label } from '~/components/ui/label/label';
import { contextAssessmentStore } from '../../layout';
import { PopoverTrigger } from '@qwik-ui/headless';
import { buttonVariants } from '~/components/ui/button/button';
import { Popover } from '~/components/ui/popover/popover';

export default component$(() => {
  const sc = useContext(contextAssessmentStore);
  return (
    <div class="grid grid-cols-[1fr,auto] gap-4 w-full">

      <div class="grid max-w-sm items-center gap-1.5 ">
        <Label for="email-2" class="text-emerald-100">Height</Label>
        <input type="Height" id="Height" placeholder="170" onInput$={(e,el) => {
          sc.personalInformation.name = el.value;
          }} class={cn(
            "flex h-12 w-full rounded-base border border-input bg-background px-3 py-1 text-sm text-foreground shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50",
          )} value={sc.personalInformation.name}/>

        <p class="text-sm text-emerald-200/70 h-5">The name shown by others in the application </p>
      </div>
      <div class="grid max-w-sm items-center gap-1.5 ">
        <Label for="email-2" class="text-emerald-100">Unit</Label>
        <MyPopover />
        <p class="text-sm text-emerald-200/70 h-5">Metric</p>
      </div>

    </div>
  );
});

export const MyPopover = component$(() => {
  const triggerRef = useSignal<HTMLButtonElement>();
  const popoverRef = useSignal<HTMLElement>();

  return (
    <>
      <PopoverTrigger
        ref={triggerRef}
        class={buttonVariants({ look: 'outline' })}
        popovertarget="hero-id"
      >
        CM
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
          <button>
            <span>CM</span>
          </button>

          <button>
            <span>FT</span>
          </button>

          <button>
            <span>M</span>
          </button>
        </div>
      </Popover>
    </>
  );
});
