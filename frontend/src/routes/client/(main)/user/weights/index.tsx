import { $, component$, createContextId, useComputed$, useContext, useSignal, useStore } from '@builder.io/qwik';
import { routeLoader$, server$, z } from '@builder.io/qwik-city';
import { cn } from '@qwik-ui/utils';
import { Popover } from '~/components/ui/popover/popover';
import { serverDatabaseUserSession } from '~/routes/seedDatabase';
import { sDate } from '~/util/types';


export const useLoaderUserWeights = routeLoader$(async function () {
  const userDB = await serverDatabaseUserSession();
  if (!userDB || !userDB.success) return { error: "No user", weights: [], success: false }
  const weights = await userDB.value?.select<WeightRecord>("weight");
  return {
    weights: schemaWeightRecord.array().parse(weights),
  }
});

export const useWeights = (data: WeightRecord[]) => {
  const value = useSignal<string>();
  const date = useSignal<string>();
  const type = useSignal<string>();
  return {
    value,
    date,
    type,
    data,
  }
};
export type WeightsContext = ReturnType<typeof useWeights>;

export const contextWeightsStore = createContextId<WeightsContext>("contextWeightsStore");

export default component$(() => {
  const weights = useLoaderUserWeights().value;
  const ws = useWeights(weights.weights);
  
  return (
    <div class="min-h-screen bg-gray-950 p-4 grid gap-8 content-start">
      <h1 class="text-gray-400 text-2xl ">New weight</h1>

      <section class="">
        {/* textarea look like input */}
        <div class="grid grid-cols-[1fr,auto,auto] gap-4">
          <div class=" ">
            <input name="weights-insert" id="weights-insert-input" type='date' class="inp w-full   " bind:value={ws.date}></input>
          </div>
          <div class=" ">
            <input name="weights-insert" id="weights-insert-input" class="inp w-[70px]    " bind:value={ws.value}></input>
          </div>
          <div class=" ">
            <input name="weights-insert" id="weights-insert-input" class="inp w-[80px]" bind:value={ws.type}></input>
          </div>
        </div>
      </section>
      <section class="font-roundsans text-gray-50 flex gap-7 flex-col ">
        {/* weights */}
        <h1 class="text-gray-400 text-2xl ">My weights</h1>
        <div class="flex flex-col gap-4 before:bg-sky-400 ">
          {
            weights.weights?.map((weight) => {
              return (
                <div key={weight.updateAt.toString()} class="grid grid-cols-2 gap-3">
                  <p>{weight.updateAt.toString()}</p>
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
  createdAt: sDate,
  id: z.string(),
  type: z.literal("kg"),
  updateAt: sDate,
  userId: z.string(),
  value: z.number(),
});

export type WeightRecord = z.infer<typeof schemaWeightRecord>;



export const HeightPopover = component$(() => {
  const sc = useContext(contextWeightsStore);

  const getHeightUnit = () => {
    switch (sc.type.value) {
      case "cm":
      case "m":
        return "Metric";
      default:
        return "Imperial";
    }
  };

  const handleChnage = $((type: string) => {
    sc.type.value = type;
    // const result = {
    //   ...sc.value,
    //   type: "kg",
    //   value: parseFloat(
    //     formatedNumber(
    //       convertWeightUnits(
    //         sc.value.value,
    //         sc.type.value,
    //         "kg",
    //       ),
    //     ),
    //   ),
    // };
  })

  return (
    <Popover.Root flip={true} gutter={8}>
      <Popover.Trigger class={cn("btn w-20")}>
        {sc.type.value?.toUpperCase()}
      </Popover.Trigger>
      <Popover.Panel class="w-32 -translate-x-[23px] border border-gray-800 bg-gray-950 text-gray-50">
        <div class="grid w-auto gap-4">
          <button
            data-active={`${sc.type.value === "kg"}`}
            class="btn btn-data-active"
            onClick$={async (e,el) => await handleChnage(el.value)}>
            <span>KG</span>
          </button>

          <button
            data-active={`${sc.value.value === "g"}`}
            class="btn btn-data-active"
            onClick$={async (e,el) => await handleChnage(el.value)}>
            <span>G</span>
          </button>

          <button
            data-active={`${sc.value.value === "FT"}`}
            class="btn btn-data-active"
            onClick$={async (e,el) => await handleChnage(el.value)}>
            <span>FT</span>
          </button>
          <p class="h-5 text-sm text-gray-200/70">{getHeightUnit()}</p>
        </div>
      </Popover.Panel>
    </Popover.Root>
  );
});
