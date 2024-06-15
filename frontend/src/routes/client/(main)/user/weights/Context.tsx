import { $, QRL, Signal, Slot, component$, createContextId, useComputed$, useContextProvider, useSignal, useStore } from "@builder.io/qwik";
import { WeightUnit } from "~/routes/client/layout";
import { ReturnTypeUseLoaderUserWeights, serverInsertWeight } from ".";
import { z } from "@builder.io/qwik-city";
import { getCurrentDateForInput, sDate } from "~/util/types";
import { schemaWeightRecord } from "./types";


  
export type WeightRecord = z.infer<typeof schemaWeightRecord>;
  
type WeightStoreHook = {
    weight: number;
    type: WeightUnit;
    date: Date;
    setWeight: QRL<(weight: string) => void>;
    hydrateRecord: QRL<() => Partial<WeightRecord>>
    setUpdateAt: QRL<(date: string) => void>
}

export const useWeights = (data: ReturnTypeUseLoaderUserWeights) => {
    const refWeightInput = useSignal<HTMLInputElement>();
    const store = useStore<WeightStoreHook>({
      weight: 0,
      type: "kg" as WeightUnit,
      date: sDate.parse(data.currentDate),
      setWeight: $(function(this: WeightStoreHook, value) {
        const weight = parseFloat(value);
        this.weight = weight;
      }),
      hydrateRecord: $(function(this: WeightStoreHook) {
        return {
            value: this.weight,
            type: this.type,
            updateAt: sDate.parse(this.date)
        };
      }),
      setUpdateAt: $(function(this: WeightStoreHook, value) {
          const date = sDate.safeParse(value);
          if (!date.success) return;
          this.date = date.data;
          })
          });
    const send = $(async function(this: WeightStoreHook) {
        const record = await store.hydrateRecord();
        const parsed = schemaWeightRecord.partial().array().safeParse([record]);
        console.log(parsed);
        if (!parsed.success ) {
            refWeightInput.value?.focus();
            return console.error(parsed.error)
        };
        // await serverInsertWeight(parsed.data);
    })
          
    const weightValue = useComputed$(() => {
        return store.weight ? store.weight.toString() : "";
    });

    const updateAtValue = useComputed$(() => {
        return getCurrentDateForInput(store.date);
    });

    return {
      ...data,
      store,
      weightValue,
      updateAtValue,
      send,
        refWeightInput
    };
};

export type WeightsContext = ReturnType<typeof useWeights>;

export const contextWeightsStore = createContextId<WeightsContext>("contextWeightsStore");

export const WeightsWarper = component$<ReturnTypeUseLoaderUserWeights>((props) => {
    const sc = useWeights(props);
    useContextProvider(contextWeightsStore, sc);
    return (
        <Slot />
    );
});