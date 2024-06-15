import { component$, useContext } from '@builder.io/qwik';
import { routeLoader$, server$, z } from '@builder.io/qwik-city';
import { serverDatabaseUserSession } from '~/routes/seedDatabase';
import { getCurrentDateForInput } from '~/util/types';
import { WeightRecord, WeightsWarper, contextWeightsStore } from './Context';
import { WeightsUnitPopover } from './PopOverWeight';
import { schemaWeightRecord } from './types';

export const useLoaderUserWeights = routeLoader$(async function () {
  const userDB = await serverDatabaseUserSession();
  if (!userDB || !userDB.success) return { error: "No user", data: null, success: false }
  else {
    const weights = await userDB.value?.query<[WeightRecord]>("SELECT * FROM weight ORDER BY updateAt DESC");
    return {
      success: true,
      data: {
        weights: schemaWeightRecord.array().parse(weights?.[0]),
        currentDate: getCurrentDateForInput(new Date),
      },
      error: "",
    }
  }
});

export type ReturnTypeUseLoaderUserWeights = NonNullable<ReturnType<typeof useLoaderUserWeights>["value"]["data"]>;

export default component$(() => {
  const data = useLoaderUserWeights().value.data;
  if (!data) return <div>Error</div>;
  return (
    <WeightsWarper {...data} >
      <Weights/>
    </WeightsWarper>
  );
});

export  const Weights = component$(() => {
  const sc = useContext(contextWeightsStore);
  
  return (
      <div class="min-h-screen bg-gray-950 p-4 grid gap-8 content-start">
        <h1 class="text-gray-400 text-2xl ">New weight</h1>

        <section class="">
          {/* textarea look like input */}
          <div class="grid grid-cols-[1fr,auto,auto] gap-4">
            <div class=" ">
              <label for="weights-insert-input" class="text-gray-400">Date</label>
              <input 
                name="weights-insert" 
                id="weights-insert-input" 
                type='date' 
                value={sc.updateAtValue.value}
                onInput$={async (e,el) => await sc.store.setUpdateAt(el.value)}
                class="inp w-full"
              />
            </div>
            <div class="grid ">
              <label for="weights-insert-input" class="text-gray-400">Weight</label>
              <input 
                ref={sc.refWeightInput}
                name="weights-insert" 
                placeholder='xxx' 
                inputMode='decimal' 
                type='text' 
                value={sc.weightValue.value}
                onInput$={(_,el) => sc.store.setWeight(el.value)}
                id="weights-insert-input" 
                class="inp w-[70px]" />
            </div>
            <div>
            <label for="unit-insert-input" class="text-gray-400">Weight</label>
            <WeightsUnitPopover inputId='unit-input-weight' />
            </div>
          </div>
        </section>
        <section class="font-roundsans text-gray-50 flex gap-7 flex-col ">
          {/* weights */}
          <h1 class="text-gray-400 text-2xl ">My weights</h1>
          <div class="flex flex-col gap-4 before:bg-sky-400 ">
            {
              sc.weights.map((weight) => {
                return (
                  <div key={weight.updateAt.toString()} class="grid grid-cols-2 gap-3">
                    <p>{weight.updateAt.toString()}</p>
                    <p>{weight.value} {weight.type}</p>
                  </div>
                );
              })
            }
          </div>
          <button class="btn" onClick$={async () => await sc.send()} >
            Submit Weights
          </button>
          {/* float button to unfocus */}
        </section>
      </div>
  );
})

export const serverInsertWeight = server$(async function (data: Partial<WeightRecord>[]) {
  const userDB = await serverDatabaseUserSession();
  if (!userDB || !userDB.success) return { error: "No user", success: false }
  const weights = await userDB.value?.insert("weight", data);
  console.log("weights", weights);
  return {
    success: true,
  };
});


