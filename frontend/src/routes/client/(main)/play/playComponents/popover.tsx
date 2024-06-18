import { Slot, component$, useContext } from "@builder.io/qwik";
import { cn } from "@qwik-ui/utils";
import { Popover } from "~/components/ui/popover/popover";

interface PopoverPlayUnitPopoverProps {
  inputId: string;
}
export const PopoverPlayUnitPopover = component$<PopoverPlayUnitPopoverProps>((props) => {
  
    return (
      <Popover.Root flip={true} gutter={8}>
        <Popover.Trigger class={cn("btn w-20 text-gray-50")} id={props.inputId}>
          My Popover
        </Popover.Trigger>
        <Popover.Panel class="w-32 -translate-x-[23px] border border-gray-800 bg-gray-950 text-gray-50">
            <Slot />
        </Popover.Panel>
      </Popover.Root>
    );
  });