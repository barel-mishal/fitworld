import { component$ } from '@builder.io/qwik';
import { Input } from '~/components/ui/input/input';
import { Label } from '~/components/ui/label/label';


export default component$(() => {
  return (
    <div>

      <div class="grid w-full max-w-sm items-center gap-1.5">
        <Label for="email-2">Email</Label>
        <Input type="email" id="email-2" placeholder="Email" />
        <p class="text-sm text-muted-foreground">Enter your email address.</p>
      </div>

    </div>
  );
});



