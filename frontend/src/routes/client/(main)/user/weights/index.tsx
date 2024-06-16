import { component$, useContext } from '@builder.io/qwik';
import { routeLoader$, server$, z } from '@builder.io/qwik-city';
import { serverDatabaseUserSession } from '~/routes/seedDatabase';
import { WeightRecord, WeightsWarper, contextWeightsStore } from './Context';
import { WeightsUnitPopover } from './PopOverWeight';
import { schemaWeightRecord } from './types';
import { formatedDateToUser, getCurrentDateForInput } from '~/util/formatDate';

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
      <div class="min-h-screen bg-gray-950 p-4 grid gap-3 content-start font-roundsans text-gray-50 grid-rows-[auto,1fr,auto] h-screen">
        <section class="">
          {/* textarea look like input */}
          <h1 class="text-gray-400 text-2xl leading-10 ">New weight</h1>
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
        <section class="font-roundsans  flex gap-2 flex-col overflow-y-auto ">
          <h1 class="text-gray-300 text-2xl font-bold ">My past weights</h1>
          <div class="flex flex-col gap-4 before:bg-sky-400 ">
            {
              sc.weights.value.map((weight) => {
                const newDate = formatedDateToUser(getCurrentDateForInput(weight.updateAt))
                return (
                  <div key={weight.updateAt.toString()} class="grid grid-cols-[1fr,auto] gap-3">
                    <p class="text-gray-400 ">{newDate}</p>
                    <p>{weight.value} {weight.type}</p>
                  </div>
                );
              })
            }
          </div>
        </section>
        <section class="grid grid-rows-[24px,1fr] ">
          <label for="input-weight-error" id='input-weight-error' class="text-rose-300 text-xs">{sc.store?.messageErrorSubmit}</label>
          <button class="btn" onClick$={async () => await sc.send()} >
            Submit Weight
          </button>
        </section>
      </div>
  );
})

export const serverInsertWeight = server$(async function (data: Partial<WeightRecord>) {
  const userDB = await serverDatabaseUserSession();
  if (!userDB || !userDB.success) return { error: "No user", success: false }
  try {
    const weights = await userDB.value?.create<Partial<WeightRecord>>("weight", data);
    
    if (!weights) return { 
      success: false, 
      error: "Failed to insert weight",
      value: [],
    };
    return {
      success: true,
      error: "",
      value: weights,
    };
  } catch (error) {
    console.error(error);
    return { 
      success: false, 
      error: "Already exists weight for this date",
      value: [],
    }; 
  }
});


