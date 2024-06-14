import { type PropsOf, Slot, component$ } from "@builder.io/qwik";
import { cn } from "@qwik-ui/utils";
import { type VariantProps, cva } from "class-variance-authority";

export const buttonVariants = cva("", {
  variants: {
    look: {
      primary: "",
      secondary: "",
      alert: "",
      outline: "",
      ghost: "",
      link: "",
    },
    size: {
      sm: "",
      md: "",
      lg: "",
      icon: "",
    },
  },
  defaultVariants: {
    look: "primary",
    size: "md",
  },
});

type DivGameLayoutProps = PropsOf<"div"> &
  VariantProps<typeof buttonVariants> & {
    classMain?: string;
  };

export default component$<DivGameLayoutProps>((props) => {
  // Phone size screen is 380px wide 600px tall
  return (
    <div
      class={cn(
        "grid h-screen grid-rows-[40px,1fr,60px] bg-gray-950 p-1 text-gray-50 overflow-hidden",
        props.class,
      )}
    >
      <div class="content-center bg-gray-950">
        <Slot name="header" />
      </div>
      <div class={cn("overflow-y-auto bg-gray-950", props.classMain)}>
        <Slot name="main" />
      </div>
      <div class="content-center bg-gray-950">
        <Slot name="footer" />
      </div>
    </div>
  );
});
