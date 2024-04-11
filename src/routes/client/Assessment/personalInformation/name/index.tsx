import { component$ } from '@builder.io/qwik';
import { Input } from '~/components/ui/input/input';
import { Label } from '~/components/ui/label/label';


export default component$(() => {
  return (
    <div class="w-full">

      <div class="grid max-w-sm items-center gap-1.5 ">
        <Label for="email-2" class="text-emerald-100">Nickname</Label>
        <Input type="nickname" id="nickname" placeholder="Me" class=""/>
        <p class="text-sm text-emerald-200/70">The name shown by others in the application </p>
      </div>

    </div>
  );
});



