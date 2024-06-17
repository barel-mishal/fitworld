import { $, type QRL, Slot, component$, createContextId, useComputed$, useContextProvider, useSignal, useStore } from "@builder.io/qwik";
import { HeightUnit } from "~/routes/client/layout";
import { type ReturnTypeUseLoaderUserHeights, serverInsertHeight as serverInsertHeight } from ".";
import { useNavigate, type z } from "@builder.io/qwik-city";
import { RoutesLiteral, sDate } from "~/util/types";
import { schemaHeightRecord as schemaHeightRecord } from "./types";
import { getCurrentDateForInput } from "~/util/formatDate";


  
export type HeightRecord = z.infer<typeof schemaHeightRecord>;
  
type HeightStoreHook = {
    height: number;
    type: HeightUnit;
    date: Date;
    setHeight: QRL<(height: string) => void>;
    hydrateRecord: QRL<() => Partial<HeightRecord>>
    setUpdateAt: QRL<(date: string) => void>;
    messageErrorSubmit?: string;
    btnSubmit: "loading" | "idle";
}

export const useHeights = (data: ReturnTypeUseLoaderUserHeights) => {
    const refHeightInput = useSignal<HTMLInputElement>();
    const heights = useSignal(data.heights);
    const store = useStore<HeightStoreHook>({
      height: 0,
      type: "cm" as HeightUnit,
      date: sDate.parse(data.currentDate),
      setHeight: $(function(this: HeightStoreHook, value) {
        const height = parseFloat(value);
        this.height = height;
      }),
      hydrateRecord: $(function(this: HeightStoreHook) {
        return {
            value: this.height,
            type: this.type,
            updateAt: sDate.parse(this.date)
        };
      }),
      btnSubmit: "idle",
      setUpdateAt: $(function(this: HeightStoreHook, value) {
          const date = sDate.safeParse(value);
                if (!date.success) return;
                this.date = date.data;
            })
          });
        const send = $(async function(this: HeightStoreHook) {
        try {
            this.btnSubmit = "loading";

            // Hydrate the height record from the store
            const record = await store.hydrateRecord();
            console.log(record);
            
            // Validate the record against the schema
            const parsed = schemaHeightRecord.partial().safeParse(record);
            console.log(parsed);
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

        this.btnSubmit = "idle";
    });
    const heightValue = useComputed$(() => {
        return store.height ? store.height.toString() : "";
    });
    const updateAtValue = useComputed$(() => {
        return getCurrentDateForInput(store.date);
    });
    const nav = useNavigate();
    const handleSubmitOnFinish = $(async function() {
        await send();
        const route: RoutesLiteral = "/client/(main)/user/heights/";
        
        nav(route);
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