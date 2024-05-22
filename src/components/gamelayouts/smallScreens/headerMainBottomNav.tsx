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

type DivGameLayoutProps = PropsOf<"div"> & VariantProps<typeof buttonVariants> & {
  classMain?: string;
};


export default component$<DivGameLayoutProps>((props) => {
  // Phone size screen is 380px wide 600px tall
  return (
    <div class={cn("grid grid-rows-[40px,1fr,60px] h-screen text-gray-50 p-1 bg-gray-950", props.class)}>
      <div class="bg-gray-950 content-center">
        <Slot name="header" />
      </div>
      <div class={cn("bg-gray-950 overflow-y-auto", props.classMain)}>
        <Slot name="main" />
      </div>
      <div class="bg-gray-950 content-center">
        <Slot name="footer" />
      </div>
    </div>
  );
});
