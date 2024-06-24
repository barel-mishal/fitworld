import { $, type QRL, Slot, component$, createContextId, useComputed$, useContextProvider, useSignal, useStore } from "@builder.io/qwik";
import { type HeightUnit } from "~/routes/client/layout";
import { type ReturnTypeUseLoaderUserHeights, serverInsertHeight as serverInsertHeight } from ".";
import { type z } from "@builder.io/qwik-city";
import { type RoutesLiteral, sDate } from "~/util/types";
import { schemaHeightRecord as schemaHeightRecord, schemaStringNumber } from "./types";
import { getCurrentDateForInput } from "~/util/formatDate";


export const schemaHeightRecordPartial = schemaHeightRecord.partial();
export type HeightRecord = z.infer<typeof schemaHeightRecordPartial>;
export type ReturnTypeUseLoaderUserHHeights = z.SafeParseReturnType<{value: string, type: string, updateAt: Date}, HeightRecord>;
 
export type HeightStoreHook = {
    height: string;
    type: "m" | "cm" | "FT";
    date: Date;
    setHeight: QRL<(height: string) => void>;
    hydrateRecord: QRL<() => ReturnTypeUseLoaderUserHHeights>;
    setUpdateAt: QRL<(date: string) => void>;
    messageErrorSubmit?: string;
    btnSubmit: "loading" | "idle";
  };  

export const useHeights = (data: ReturnTypeUseLoaderUserHeights) => {
    const refHeightInput = useSignal<HTMLInputElement>();
    const heights = useSignal<HeightRecord[]>(data.heights);
    const store = useStore<HeightStoreHook>({
      height: "",
      type: "cm" as HeightUnit,
      date: sDate.parse(data.currentDate),
      setHeight: $(function(this: HeightStoreHook, value) {
        const height = schemaStringNumber.safeParse(value);
        if (!height.success) return;
        else 
        this.height = height.data.toString();
      }),
      hydrateRecord: $(function(this: HeightStoreHook) {
        const record = schemaHeightRecordPartial.safeParse({
            value: this.height,
            type: this.type,
            updateAt: sDate.parse(this.date)
        });
        return record as ReturnTypeUseLoaderUserHHeights;
      }),
      btnSubmit: "idle",
      setUpdateAt: $(function(this: HeightStoreHook, value) {
          const date = sDate.safeParse(value);
                if (!date.success) return;
                this.date = date.data;
            })
          });
        const send = $(async function() {
        try {
            store.btnSubmit = "loading";

            // Hydrate the height record from the store
            const record = await store.hydrateRecord();
            
            // Validate the record against the schema
            const parsed = schemaHeightRecord.partial().safeParse(record);
            if (!parsed.success) {
                refHeightInput.value?.focus();
                store.messageErrorSubmit = "Invalid height";
                return;
            }
    
            // Insert the height record to the server
            const result = await serverInsertHeight(parsed.data);
            if (!result.success || !result.value) {
                store.messageErrorSubmit = result.error;
                return;
            }
    
            store.messageErrorSubmit = "";
    
            // Validate the server response
            const parsedResult = schemaHeightRecord.partial().array().safeParse(result.value);
            if (!parsedResult.success) { 
                store.messageErrorSubmit = parsedResult.error.message;
                return;
            }
    
            // Update the heights in the store
            heights.value = parsedResult.data.concat(data.heights) as HeightRecord[];
    
        } catch (error) {
            // Catch and handle any unexpected errors
            store.messageErrorSubmit = "An unexpected error occurred. Please try again.";
            console.error("Error in send function:", error);
        }

        store.btnSubmit = "idle";
    });
    const heightValue = useComputed$(() => {
        return store.height ? store.height.toString() : "";
    });
    const updateAtValue = useComputed$(() => {
        return getCurrentDateForInput(store.date);
    });
    const handleSubmitOnFinish = $(async function() {
        await send();
        const route: RoutesLiteral = "/client/user/heights/finish" as RoutesLiteral;
        return route;
    });


    return {
      store,
      heights,
      heightValue,
      updateAtValue,
      send,
      refHeightInput,
        handleSubmitOnFinish
    };
};

export type HeightsContext = ReturnType<typeof useHeights>;

export const contextHeightsStore = createContextId<HeightsContext>("contextHeightsStore");

export const HeightsWarper = component$<ReturnTypeUseLoaderUserHeights>((props) => {
    const sc = useHeights(props);
    useContextProvider(contextHeightsStore, sc);
    return (
        <Slot />
    );
});