import { $, component$,useOnDocument, useSignal, useStore} from '@builder.io/qwik';
import { PhClose, PhDNA, PhLightning } from '~/components/icons/icons';
import { cn } from '@qwik-ui/utils';
import { formatedMonthNameAndYear } from '~/util/formatDate';
import { Calender } from '~/components/Calender';
import { routeLoader$ } from '@builder.io/qwik-city';
import { server_user_intake } from '~/routes/api/service_user_intake';
import { AppLink } from '~/routes.config';

export const useLoaderUserIntake = routeLoader$(async () => {
  const intake = await server_user_intake();
  if (!intake.success) {
    return { error: "Could not fetch data", success: false, value: null };
  }
  return { success: true, value: intake.value, error: null}
  
})

export default component$(() => {
  const intake = useLoaderUserIntake();
  if (!intake.value.success) {
    return <div>Error: {intake.value.error}</div>
  }
  const num = useStore({
    withinRange: 90,
    now: new Date,
  });
  return (
    <div class="grid grid-rows-[40px,200px,1fr] font-roundsans">
      <SectionHeader />
      <section class="bg-gray-800 grid grid-cols-2 place-items-center">
        <p class="flex flex-col gap-4 pl-2 max-w-40 h-40 justify-end pb-1">
          <span class="text-6xl font-extrabold">{num.withinRange}%</span>
          <span class="[text-wrap:balance] text-xs max-w-40">Day Energy Present Streak!</span>
        </p>
        <PhLightning class="h-40 w-40 fill-yellow-500" />
      </section>
      <section class="bg-gray-950 p-4 grid gap-5">
        <h4 class=" self-start text-2xl line-clamp-6">
          Streak Energy Challenge
        </h4>
        <div class="grid grid-cols-[auto,1fr] gap-4 border-2 border-gray-800 p-4 rounded-lg place-items-start self-start">
          <PhDNA class="fill-green-500 self-start h-16 w-16" />
          <div class="flex flex-col gap-3  ">
            <p class="text-xs [text-wrap:balance]">
              Earn Your DNA Points by completing the daily energy streak challenge.
            </p>
            <button class="btn bg-green-500 border-green-800 h-12 rounded-lg">Join Challenge</button>
          </div>
        </div>
        {/* calender */}
        <Calender.Root selected={intake.value.value?.times || []}>
        <div class="grid grid-cols-[1fr,auto,auto] gap-8 pr-3">
          <h4 class=" self-start text-2xl line-clamp-6">
            {formatedMonthNameAndYear(num.now)}
          </h4>
          <Calender.TriggerSkipMonths/>

        </div>
        <div class="grid grid-cols-2 gap-4">
          <div class="grid grid-cols-[auto,1fr] relative gap-2 border-2 border-gray-800 p-2 rounded-lg place-items-start self-start">
            <PhDNA class="fill-green-500 self-start h-8 w-8" />
            <div class="flex flex-col gap-1   ">
              <p class="text ">
                2
              </p>
              <p class="text-xs [text-wrap:balance]">
                Days Complietion
              </p>
            </div>
              <p class="absolute -top-2 -right-2 bg-yellow-600 px-2 py-1 text-xs rounded-full ">Great</p>
          </div>
          <div class="grid grid-cols-[auto,1fr] relative gap-2 border-2 border-gray-800 p-2 rounded-lg place-items-start self-start">
            <PhDNA class="fill-green-500 self-start h-8 w-8" />
            <div class="flex flex-col gap-1   ">
              <p class="text ">
                2
              </p>
              <p class="text-xs [text-wrap:balance]">
                Days Freeze
              </p>
            </div>
          </div>
          <div class="grid min-h-[268px] col-span-2 relative gap-2 border-2 border-gray-800 p-2 rounded-lg place-items-start self-start">
            <Calender.TableCalender />
          </div>
        </div>
        </Calender.Root>
      </section>
    </div>
  );
});




export const useScrollPass = (pass: number) => {
  const fadeIn = useSignal(false);
  useOnDocument('scroll', $((event) => {
    const doc = event.target as Document;
    const scrollTop = doc.documentElement.scrollTop || doc.body.scrollTop;
    if (scrollTop > pass) {
      fadeIn.value = true;
    } else {
      fadeIn.value = false;
    }
  }));
  return fadeIn;
}

export const SectionHeader = component$(() => {
  const scrollPass = useScrollPass(200);
  return <section
  data-scroll-position={`${scrollPass.value}`}
  class={cn(
   `bg-gray-800 min-h-10 flex z-50 items-center transition-all ease-in-out duration-300 p-2 border-b border-gray-800 fade-in sticky top-0`,
   `data-[scroll-position='true']:bg-gray-950 `
   )}>
  <AppLink class="flex gap-2 items-center" route='/client/(main)/play/'>
      <PhClose class="h-7 w-7 fill-current" />
   </AppLink>
   <h4 class="mx-auto">Energy Streak</h4>
 </section>
});


