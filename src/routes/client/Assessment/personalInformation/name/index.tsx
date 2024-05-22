import { component$, useContext } from '@builder.io/qwik';
import { Label } from '~/components/ui/label/label';
import { contextAssessmentStore } from '../../../layout';
import { cn } from '@qwik-ui/utils';


export default component$(() => {
  const sc = useContext(contextAssessmentStore);

  return (
    <div class="w-full">

      <div class="grid max-w-sm items-center gap-1.5">
        <Label for="email-2" class="text-gray-100 text-2xl font-roundsans font-extrabold">Nickname</Label>

        <input type="nickname" id="nickname" placeholder="Me" onInput$={async (e,el) => {
          sc.data.personalInformation.name = el.value;
        }} class={cn(
          "inp flex h-12 w-full px-3 tracking-wider",
        )} value={sc.data.personalInformation.name}/>
        <p class="text-sm text-gray-700 font-roundsans">The name shown by others in the application </p>

      </div>

    </div>
  );
});



