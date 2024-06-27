import { $, component$, useOnDocument, useSignal } from '@builder.io/qwik';
import { PhClose } from '~/components/icons/icons';
import { cn } from '@qwik-ui/utils';

export default component$(() => {
  const scrollPass = useScrollPass(200);

  return (
    <div class="grid grid-rows-[40px,200px,1fr] font-roundsans">
      <div
       data-scroll-position={`${scrollPass.value}`}
       class={cn(
        `bg-gray-800 min-h-10 flex items-center transition-all ease-in-out duration-300 p-2 border-b border-gray-800 fade-in sticky top-0`,
        `data-[scroll-position='true']:bg-gray-950 `
        )}>
        <PhClose class="h-7 w-7 fill-current" />
        <h4 class="mx-auto">Energy Streak</h4>
      </div>
      <div class="bg-gray-800"></div>
      <div class="bg-gray-950 h-screen"></div>
    </div>
  );
});


export const useScrollPass = (pass: number) => {
  const fadeIn = useSignal(false);
  useOnDocument('scroll', $((event) => {
    const doc = event.target as Document;
    const scrollTop = doc.documentElement.scrollTop || doc.body.scrollTop;
    if (scrollTop > pass) {
      console.log('Scroll position:', scrollTop);
      fadeIn.value = true;
    } else {
      fadeIn.value = false;
    }
  }));
  return fadeIn;
}