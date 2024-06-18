import { type JSX, Slot, component$ } from "@builder.io/qwik";
import { Popover } from "~/components/ui/popover/popover";

interface PopoverPlayUnitPopoverProps {
  inputId: string;
  title: JSX.Element;
}
export const PopoverPlayUnitPopover = component$<PopoverPlayUnitPopoverProps>((props) => {
  
    return (
      <Popover.Root flip={false}  gutter={8}>
        <Popover.Trigger id={props.inputId}>
          {props.title}
        </Popover.Trigger>
        <Popover.Panel class="">
            <Slot />
        </Popover.Panel>
      </Popover.Root>
    );
  });