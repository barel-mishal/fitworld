import { component$, useContext, useTask$ } from '@builder.io/qwik';
import { Button } from '~/components/ui/button/button';
import { contextAssessmentStore } from '../../layout';

export default component$(() => {
  const sc = useContext(contextAssessmentStore);

  useTask$(({track}) => {
    const gender = track(() => sc.personalInformation.gender);
    if (gender === "") {
      sc.settings.buttonDisabled = true;
      return;
    }
    sc.settings.buttonDisabled = false;
  });
  
  return (
    <div class="grid grid-cols-2 w-full gap-4 grid-rows-[200px] ">
      <Button class={[
        "grid h-full bg-pink-700 hover:bg-pink-700 duration-200 active:bg-pink-800 tracking-widest ease-in-out transition-all",
        sc.personalInformation.gender === "female" ? "scale-90 ring ring-offset-1" : ""
      ]} onClick$={() => {
        sc.personalInformation.gender = "female";
      }} >Female</Button>
      <Button class={[
        "grid h-full bg-blue-700 hover:bg-blue-700 duration-200 active:bg-blue-800 tracking-widest ease-in-out transition-all",
        sc.personalInformation.gender === "male" ? "scale-90 ring ring-offset-1" : ""
      ]} onClick$={() => {
        sc.personalInformation.gender = "male";
      }}>Male</Button>
    </div>
  );
});
