import { type PropsOf, component$ } from "@builder.io/qwik";
import { type VariantProps, cva } from "class-variance-authority";
import { PhDNA, PhDrop, PhFlag, PhHeart, PhLightning, PhNotepad, PhRanking, PhUser } from "~/components/icons/icons";
import { AppLink } from "~/routes.config";

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

    return (
      <ul class="grid grid-cols-4">
        <li class="grid grid-cols-2 items-center"><PhLightning class="fill-yellow-500 h-8 w-8 " /><p class="text-xs">{props.streak}</p></li>
        <li class="grid grid-cols-2 items-center"><PhDrop      class="fill-sky-500 h-8 w-8"     /><p class="text-xs">{props.water}</p></li>
        <li class="grid grid-cols-2 items-center"><PhHeart     class="fill-rose-500 h-8 w-8 "   /><p class="text-xs">{props.heart}</p></li>
        <li class="grid grid-cols-2 items-center"><PhDNA       class="fill-green-500 h-8 w-8 "  /><p class="text-xs">{props.dna}</p></li>
      </ul>
    )
  });

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
    },
  );
  
  type Alink = PropsOf<"a"> & VariantProps<typeof buttonVariants> & {
    classMain?: string;
  };

  interface BottomNavBar {
    flag?: Alink;
    user?: Alink;
    leaderBoard?: Alink;
  }
  
  
  export const BottomNavBar = component$<BottomNavBar>((props) => {
    return (
      <ul class="grid grid-cols-4 ">
        <li class="grid items-center justify-items-center"><AppLink route='/client/(main)/track/' {...props.leaderBoard || {}}><PhNotepad class="fill-indigo-500 h-8 w-8 " /></AppLink></li>
        <li class="grid items-center justify-items-center"><AppLink route='/client/(main)/play/' {...props.flag}><PhFlag class="fill-indigo-500 h-8 w-8 " /></AppLink></li>
        <li class="grid items-center justify-items-center"><AppLink route='/client/(main)/user/' {...props.user || {}}><PhUser       class="fill-indigo-500 h-8 w-8 " /></AppLink></li>
        <li class="grid items-center justify-items-center"><AppLink route='/client/(main)/leaderBoard/' {...props.leaderBoard || {}}><PhRanking       class="fill-indigo-500 h-8 w-8 " /></AppLink></li>
      </ul>
    )
  });