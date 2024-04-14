import { component$ } from "@builder.io/qwik";
import { PhCaretRight, PhDNA, PhDrop, PhFlag, PhHeart, PhLightning, PhUser } from "~/components/icons/icons";
import { AppLink } from "~/routes.config";

export const TopNavBar = component$(() => {

    return (
      <ul class="grid grid-cols-4">
        <li class="grid grid-cols-2 items-center"><PhLightning class="fill-yellow-500 h-8 w-8 " /><p class="text-xs">300</p></li>
        <li class="grid grid-cols-2 items-center"><PhDrop      class="fill-sky-500 h-8 w-8"     /><p class="text-xs">200</p></li>
        <li class="grid grid-cols-2 items-center"><PhHeart     class="fill-rose-500 h-8 w-8 "   /><p class="text-xs">400</p></li>
        <li class="grid grid-cols-2 items-center"><PhDNA       class="fill-green-500 h-8 w-8 "  /><p class="text-xs">210</p></li>
      </ul>
    )
  });
  
  export const BottomNavBar = component$(() => {
    return (
      <ul class="grid grid-cols-3 ">
        <li class="grid items-center justify-items-center"><AppLink route='/client/user/'><PhCaretRight class="fill-indigo-500 h-8 w-8 " /></AppLink></li>
        <li class="grid items-center justify-items-center"><AppLink route='/client/user/'><PhUser       class="fill-indigo-500 h-8 w-8 " /></AppLink></li>
        <li class="grid items-center justify-items-center"><AppLink route='/client/user/'><PhFlag       class="fill-indigo-500 h-8 w-8 " /></AppLink></li>
      </ul>
    )
  });