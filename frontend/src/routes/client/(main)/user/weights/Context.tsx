import { $, QRL, Slot, component$, createContextId, useComputed$, useContextProvider, useSignal, useStore } from "@builder.io/qwik";
import { WeightUnit } from "~/routes/client/layout";
import { type ReturnTypeUseLoaderUserWeights, serverInsertWeight } from ".";
import { RoutesLiteral, sDate } from "~/util/types";
import { schemaWeightRecord } from "./types";
import { getCurrentDateForInput } from "~/util/formatDate";
import { z } from "@builder.io/qwik-city";


  
export type WeightRecord = z.infer<typeof schemaWeightRecord>;
  
type WeightStoreHook = {
    weight: number;
    type: WeightUnit;
    date: Date;
    setWeight: QRL<(weight: string) => void>;
    hydrateRecord: QRL<() => Partial<WeightRecord>>
    setUpdateAt: QRL<(date: string) => void>;
    messageErrorSubmit?: string;
    btnSubmit: "loading" | "idle";
}

export const useWeights = (data: ReturnTypeUseLoaderUserWeights) => {
    const refWeightInput = useSignal<HTMLInputElement>();
    const weights = useSignal(data.weights);
    const store = useStore<WeightStoreHook>({
      btnSubmit: "idle",
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
        const send = $(async function() {
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
    const handleSubmitOnFinish = $(async function(this: WeightStoreHook) {
        store.btnSubmit = "loading";
        await send();
        store.btnSubmit = "idle";
        const route: RoutesLiteral = "/client/user/heights/finish/" as RoutesLiteral;
        return route;
    });

    return {
      store,
      weights,
      weightValue,
      updateAtValue,
      send,
      refWeightInput,
        handleSubmitOnFinish,
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