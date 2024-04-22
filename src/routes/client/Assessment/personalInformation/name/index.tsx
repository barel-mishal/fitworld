import { component$, useContext, useVisibleTask$ } from '@builder.io/qwik';
import { Label } from '~/components/ui/label/label';
import { contextAssessmentStore } from '../../../layout';
import { cn } from '@qwik-ui/utils';


export default component$(() => {
  const sc = useContext(contextAssessmentStore);

  useVisibleTask$(async () => {
    console.log(sc)
  });  

  return (
    <div class="w-full">

      <div class="grid max-w-sm items-center gap-1.5 ">
        <Label for="email-2" class="text-emerald-100">Nickname</Label>

        <input type="nickname" id="nickname" placeholder="Me" onInput$={async (e,el) => {
          sc.data.personalInformation.name = el.value;
        }} class={cn(
          "flex h-12 w-full rounded-base border border-input bg-background px-3 py-1 text-sm text-foreground shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50",
        )} value={sc.data.personalInformation.name}/>
        <p class="text-sm text-emerald-200/70">The name shown by others in the application </p>

      </div>

    </div>
  );
});



