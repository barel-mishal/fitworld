import { component$, useContext, $ } from "@builder.io/qwik";
import { cn } from "@qwik-ui/utils";
import { WeightUnit } from "~/routes/client/layout";
import { convertWeightUnits } from "~/util/convertUnits";
import { formatedNumber } from "~/util/formatNumber";
import { contextWeightsStore } from "./Context";
import { Popover } from "~/components/ui/popover/popover";

interface WeightsUnitPopoverProps {
  inputId: string;
}

export const WeightsUnitPopover = component$<WeightsUnitPopoverProps>((props) => {
    const sc = useContext(contextWeightsStore);
  
    const getWeightUnit = () => {
      switch (sc.store.type) {
        case "kg":
        case "g":
          return "Metric";
        default:
          return "Imperial";
      }
    };
  
    const handleChnage = $((type: WeightUnit) => {
      sc.store.type = type;
      if (!sc.store.weight) return;
      const currentWeight = sc.store.weight;
      const converedWeight = convertWeightUnits(currentWeight, sc.store.type, type);
      const formatedWeight = formatedNumber(converedWeight);
      sc.store.setWeight(formatedWeight);
    });
  
    return (
      <Popover.Root flip={true} gutter={8}>
        <Popover.Trigger class={cn("btn w-20 text-gray-50")} id={props.inputId}>
          {sc.store.type?.toUpperCase()}
        </Popover.Trigger>
        <Popover.Panel class="w-32 -translate-x-[23px] border border-gray-800 bg-gray-950 text-gray-50">
          <div class="grid w-auto gap-4">
            <button
              data-active={`${sc.store.type === "kg"}`}
              class="btn btn-data-active"
              onClick$={async (e,el) => await handleChnage("kg" as WeightUnit)}>
              <span>KG</span>
            </button>
  
            <button
              data-active={`${sc.store.type === "g"}`}
              class="btn btn-data-active"
              onClick$={async (e,el) => await handleChnage("g" as WeightUnit)}>
              <span>G</span>
            </button>
            <button
              data-active={`${sc.store.type === "lb"}`}
              class="btn btn-data-active"
              onClick$={async (e,el) => await handleChnage("lb" as WeightUnit)}>
              <span>lb</span>
            </button>
            <p class="h-5 text-sm text-gray-200/70">{getWeightUnit()}</p>
          </div>
        </Popover.Panel>
      </Popover.Root>
    );
  });
  