import { component$, Slot, PropsOf } from "@builder.io/qwik";
import { cn } from "@qwik-ui/utils";

type LabelProps = PropsOf<"label">;

export const Label = component$<LabelProps>((props) => {
  return (
    <label
      {...props}
      class={cn(
        "font-medium peer-disabled:cursor-not-allowed peer-disabled:opacity-70",
        props.class,
      )}
    >
      <Slot />
    </label>
  );
});
