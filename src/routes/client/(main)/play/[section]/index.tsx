import { $, component$ } from '@builder.io/qwik';
import { useLocation } from '@builder.io/qwik-city';
import { serverUserAddStep } from '~/routes/api/service_game/serviceUserAddStep';

export default component$(() => {
  const loc = useLocation();
  const handleStepChange = $(async () => {
    try {
      const result = await serverUserAddStep({index: 0, unit: 0, section: 0, step: 0});
      console.log({result});
    } catch (error) {
      console.log(error); 
    }
    
  })
  return (
    <div>    
      <button onClick$={handleStepChange}>CLICK ME</button>
      New route works. {loc.params.section} {loc.params.unit}
    </div>
  );
});
