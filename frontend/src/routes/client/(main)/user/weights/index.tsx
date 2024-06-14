import { $, component$, useComputed$, useSignal, useStore } from '@builder.io/qwik';
import { routeLoader$, server$, z } from '@builder.io/qwik-city';
import { PhClose } from '~/components/icons/icons';
import { serverDatabaseUserSession } from '~/routes/seedDatabase';


export const useLoaderUserWeights = routeLoader$(async function () {
  const userDB = await serverDatabaseUserSession();
  if (!userDB || !userDB.success) return { error: "No user", weights: [], success: false }
  const weights = await userDB.value?.select<WeightRecord>("weight");
  console.log("weights", weights);
  return {
    weights
  }
});

export default component$(() => {
  const weights = useLoaderUserWeights().value;
  const textValue = useSignal<string>("");
  return (
    <div class="min-h-screen bg-gray-950 p-4 grid gap-8 content-start">
      <h1 class="text-gray-400 text-2xl ">New weight</h1>

      <section class="">
        {/* textarea look like input */}
        <div class="grid grid-cols-[1fr,auto,auto] gap-4">
          <div class=" ">
            <input name="weights-insert" id="weights-insert-input" type='date' class="inp max-w-full   " bind:value={textValue}></input>
          </div>
          <div class=" ">
            <input name="weights-insert" id="weights-insert-input" class="inp w-full    " bind:value={textValue}></input>
          </div>

          <button class="btn-primery text-gray-50  m-1 mr-2  bg-sky-600 self-center justify-self-end p-1 rounded-full"><PhClose class="w-4 h-4" /></button>
        </div>
      </section>
      <section class="font-roundsans text-gray-50 flex gap-7 flex-col ">
        {/* weights */}
        <h1 class="text-gray-400 text-2xl ">My weights</h1>
        <div class="flex flex-col gap-4 before:bg-sky-400 before:h-full before:rounded-full before:absolute before:-translate-x-2 before:-translate-y-2 before:w-[1px]">
          {
            weights.weights?.map((weight) => {
              return (
                <div key={weight.updateAt} class="grid grid-cols-2 gap-3">
                  <p>{weight.updateAt}</p>
                  <p>{weight.value} {weight.type}</p>
                </div>
              );
            })
            }
        </div>
        <button>
          Submit Weights
        </button>
        {/* float button to unfocus */}
      </section>
    </div>
  );
});

export const serverInsertWeight = server$(async function (data: { weight: number, type: string }[]) {
  const userDB = await serverDatabaseUserSession();
  if (!userDB || !userDB.success) return { error: "No user", success: false }
  const weights = await userDB.value?.insert("weight", data);
  console.log("weights", weights);
  return {
    success: true,
  };
});

export const schemaWeightRecord = z.object(  {
  createdAt: z.string(),
  id: z.string(),
  type: z.literal("kg"),
  updateAt: z.string(),
  userId: z.string(),
  value: z.number(),
});
