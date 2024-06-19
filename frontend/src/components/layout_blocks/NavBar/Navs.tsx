import { type PropsOf, component$, useStyles$ } from "@builder.io/qwik";
import { Modal } from "@qwik-ui/headless";
import { type VariantProps, cva } from "class-variance-authority";
import {
  PhDNA,
  PhDrop,
  PhFlag,
  PhHeart,
  PhLightning,
  PhNotepad,
  PhRanking,
  PhUser,
} from "~/components/icons/icons";
import { AppLink } from "~/routes.config";
import styles from '~/components/layout_blocks/NavBar/styles.css?inline';
import { cn } from "@qwik-ui/utils";

interface TopNavBarProps {
  streak: number;
  water: number;
  heart: number;
  dna: number | string;
  prev?: {
    streak: number;
    water: number;
    heart: number;
    dna: number;
  };
}

export const TopNavBar = component$<TopNavBarProps>((props) => {
  useStyles$(styles);

  return (
    <ul class="grid grid-cols-4">
      <li class="">
      <Modal.Root closeOnBackdropClick={true}>
          <Modal.Trigger class="modal-trigger grid grid-cols-2 items-center slide-down">
              <PhLightning class="h-8 fill-yellow-500" />
              <p class="text-xs">{props.streak}</p>
          </Modal.Trigger>
          <Modal.Panel
            class={cn(
              `fixed inset-x-0 top-0 h-1/2 w-full bg-gray-950 shadow-lg p-4 m-0 backdrop:bg-slate-400/70 backdrop-blur-sm slide-down backdrop:opacity-90`,
            )}
          >
            <div class="grid">
            <Modal.Title>Hello 1</Modal.Title>
            <Modal.Close class="">Close</Modal.Close>
          </div>
        </Modal.Panel>
      </Modal.Root>
      </li>
      <li class="">
      <Modal.Root closeOnBackdropClick={true}>
        <Modal.Trigger class="modal-trigger grid grid-cols-2 items-center slide-down">
            <PhDrop class="h-8 fill-blue-500" />
            <p class="text-xs">{props.water}</p>
        </Modal.Trigger>
        <Modal.Panel
          class={cn(
            `fixed inset-x-0 top-0 h-1/2 w-full bg-gray-950 shadow-lg p-4 m-0 backdrop:bg-slate-400/70 backdrop-blur-sm slide-down backdrop:opacity-90`,
          )}
        >
          <div class="grid">
            <Modal.Title>Hello 1</Modal.Title>
            <Modal.Close class="">Close</Modal.Close>
          </div>
        </Modal.Panel>
      </Modal.Root>
      </li>
      <li class="">
      <Modal.Root closeOnBackdropClick={true}>
        <Modal.Trigger class="modal-trigger grid grid-cols-2 items-center slide-down">
            <PhHeart class="h-8 fill-rose-500" />
            <p class="text-xs">{props.heart}</p>
        </Modal.Trigger>
        <Modal.Panel
          class={cn(
            `fixed inset-x-0 top-0 h-1/2 w-full bg-gray-950 shadow-lg p-4 m-0 backdrop:bg-slate-400/70 backdrop-blur-sm slide-down backdrop:opacity-90`,
          )}
        >
          <div class="grid">
            <Modal.Title>Hello 1</Modal.Title>
            <Modal.Close class="">Close</Modal.Close>
          </div>
        </Modal.Panel>
      </Modal.Root>
      </li>
      <li class="">
      <Modal.Root closeOnBackdropClick={true}>
        <Modal.Trigger class="grid grid-cols-2 items-center slide-down">
          <PhDNA class="h-8 fill-green-500" />
          <p class="text-xs">{props.dna}</p>
        </Modal.Trigger>
        <Modal.Panel
          class={cn(
            `fixed inset-x-0 top-0 h-1/2 w-full bg-gray-950 shadow-lg p-4 m-0 backdrop:bg-slate-400/70 backdrop-blur-sm slide-down backdrop:opacity-90`,
          )}
        >
          <div class="grid">
            <Modal.Title>Hello 1</Modal.Title>
            <Modal.Close class="">Close</Modal.Close>
          </div>
        </Modal.Panel>
      </Modal.Root>
      </li>
    </ul>
  );
});

export const buttonVariants = cva("", {
  variants: {
    look: {
      primary: "",
      secondary: "",
      alert: "",
      outline: "",
      ghost: "",
      link: "",
      active: "bg-sky-300/20 rounded-md outline-2 outline outline-indigo-200",
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

type Alink = PropsOf<"a"> &
  VariantProps<typeof buttonVariants> & {
    classMain?: string;
  };

interface BottomNavBar {
  flag?: Alink;
  user?: Alink;
  leaderBoard?: Alink;
}

export const BottomNavBar = component$<BottomNavBar>((props) => {
  return (
    <ul class="grid grid-cols-4">
      <li class="grid items-center justify-items-center">
        <AppLink route="/client/(main)/track/" {...(props.leaderBoard || {})}>
          <PhNotepad class="h-8 w-8 fill-indigo-500" />
        </AppLink>
      </li>
      <li class="grid items-center justify-items-center">
        <AppLink route="/client/(main)/play/" {...props.flag}>
          <PhFlag class="h-8 w-8 fill-indigo-500" />
        </AppLink>
      </li>
      <li class="grid items-center justify-items-center">
        <AppLink route="/client/(main)/user/" {...(props.user || {})}>
          <PhUser class="h-8 w-8 fill-indigo-500" />
        </AppLink>
      </li>
      <li class="grid items-center justify-items-center">
        <AppLink
          route="/client/(main)/leaderBoard/"
          {...(props.leaderBoard || {})}
        >
          <PhRanking class="h-8 w-8 fill-indigo-500" />
        </AppLink>
      </li>
    </ul>
  );
});
