import { $, QRL, Signal, Slot, component$, createContextId, useComputed$, useContextProvider, useSignal, useStore } from "@builder.io/qwik";
import { WeightUnit } from "~/routes/client/layout";
import { ReturnTypeUseLoaderUserWeights, serverInsertWeight } from ".";
import { z } from "@builder.io/qwik-city";
import { sDate } from "~/util/types";
import { schemaWeightRecord } from "./types";
import { getCurrentDateForInput } from "~/util/formatDate";


  
export type WeightRecord = z.infer<typeof schemaWeightRecord>;
  
type WeightStoreHook = {
    weight: number;
    type: WeightUnit;
    date: Date;
    setWeight: QRL<(weight: string) => void>;
    hydrateRecord: QRL<() => Partial<WeightRecord>>
    setUpdateAt: QRL<(date: string) => void>;
    messageErrorSubmit?: string;
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
        if (!parsed.success ) {
            refWeightInput.value?.focus();
            store.messageErrorSubmit = "Invalid weight";
            return { success: false, error: "Invalid weight", message: "Weight field is empty or nor a number" };
        };
        const result = await serverInsertWeight(parsed.data);
        if (!result.success) {
            store.messageErrorSubmit = "Failed to insert weight";
            return { success: false, error: "Failed to insert weight", message: "Server error. Try again or check connection." };
        }
        store.messageErrorSubmit = "";
        return { success: true, error: "" };
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