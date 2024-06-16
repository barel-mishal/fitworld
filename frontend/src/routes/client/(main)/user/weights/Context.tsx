import { $, QRL, Slot, component$, createContextId, useComputed$, useContextProvider, useSignal, useStore } from "@builder.io/qwik";
import { WeightUnit } from "~/routes/client/layout";
import { type ReturnTypeUseLoaderUserWeights, serverInsertWeight } from ".";
import { type z } from "@builder.io/qwik-city";
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
    const weights = useSignal(data.weights);
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
        try {
            // Hydrate the weight record from the store
            const record = await store.hydrateRecord();
            
            // Validate the record against the schema
            const parsed = schemaWeightRecord.partial().safeParse(record);
            if (!parsed.success) {
                refWeightInput.value?.focus();
                store.messageErrorSubmit = "Invalid weight";
                return;
            }
    
            // Insert the weight record to the server
            const result = await serverInsertWeight(parsed.data);
            if (!result.success || !result.value) {
                store.messageErrorSubmit = result.error;
                return;
            }
    
            store.messageErrorSubmit = "";
    
            // Validate the server response
            const parsedResult = schemaWeightRecord.partial().array().safeParse(result.value);
            if (!parsedResult.success) { 
                store.messageErrorSubmit = parsedResult.error.message;
                return;
            }
    
            // Update the weights in the store
            weights.value = parsedResult.data.concat(data.weights) as WeightRecord[];
    
        } catch (error) {
            // Catch and handle any unexpected errors
            store.messageErrorSubmit = "An unexpected error occurred. Please try again.";
            console.error("Error in send function:", error);
        }
    });
    const weightValue = useComputed$(() => {
        return store.weight ? store.weight.toString() : "";
    });
    const updateAtValue = useComputed$(() => {
        return getCurrentDateForInput(store.date);
    });

    return {
      store,
      weights,
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