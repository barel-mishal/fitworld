import { type PropsOf, Slot, component$ } from '@builder.io/qwik';
import { cn } from '@qwik-ui/utils';
import { type VariantProps, cva } from 'class-variance-authority';

export const buttonVariants = cva(
  "",
  {
    variants: {
      look: {
        primary:
          "",
        secondary:
          "",
        alert:
          "",
        outline:
          "",
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
  },
);

type DivGameLayoutProps = PropsOf<"div"> & VariantProps<typeof buttonVariants>;


export default component$<DivGameLayoutProps>(() => {
  // Phone size screen is 380px wide 600px tall
  return (
    <div class={cn("grid grid-rows-[40px,1fr,60px] h-screen text-emerald-50 p-3 bg-emerald-950")}>
      <div class="bg-emerald-950">
        <Slot name="header" />
      </div>
      <div class="bg-emerald-950 overflow-y-auto ">
        <Slot name="main" />
      </div>
      <div class="bg-emerald-950">
        <Slot name="footer" />
      </div>
    </div>
  );
});
