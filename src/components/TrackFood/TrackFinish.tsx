import { component$, useContext } from "@builder.io/qwik";
import { contextFoodTrack } from "./trackFood";

const FinishTrack = component$(() => {
    const myEats = useContext(contextFoodTrack);

  
    return (
      <>
        <div class="flex flex-col justify-between">
          
          <div class="grid gap-3 sticky top-0 bg-emerald-950 z-50">

            {JSON.stringify(myEats.store)}
            finish
          </div>

        </div>
      </>
    )
});

export default FinishTrack;