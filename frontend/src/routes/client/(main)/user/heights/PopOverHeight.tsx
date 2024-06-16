import { component$, useContext, $ } from "@builder.io/qwik";
import { cn } from "@qwik-ui/utils";
import { HeightUnit } from "~/routes/client/layout";
import { convertHeightUnits } from "~/util/convertUnits";
import { formatedNumber } from "~/util/formatNumber";
import { contextHeightsStore } from "./Context";
import { Popover } from "~/components/ui/popover/popover";

interface HeightsUnitPopoverProps {
  inputId: string;
}

export const HeightsUnitPopover = component$<HeightsUnitPopoverProps>((props) => {
    const sc = useContext(contextHeightsStore);
  
    const getHeightUnit = () => {
      switch (sc.store.type) {
        case "m":
        case "cm":
          return "Metric";
        default:
          return "Imperial";
      }
    };
  
    const handleChnage = $((type: HeightUnit) => {
      sc.store.type = type;
      if (!sc.store.height) return;
      const currentHeight = sc.store.height;
      const converedHeight = convertHeightUnits(currentHeight, sc.store.type, type);
      const formatedHeight = formatedNumber(converedHeight);
      sc.store.setHeight(formatedHeight);
    });
  
    return (
      <Popover.Root flip={true} gutter={8}>
        <Popover.Trigger class={cn("btn w-20 text-gray-50")} id={props.inputId}>
          {sc.store.type?.toUpperCase()}
        </Popover.Trigger>
        <Popover.Panel class="w-32 -translate-x-[23px] border border-gray-800 bg-gray-950 text-gray-50">
          <div class="grid w-auto gap-4">
            <button
              data-active={`${sc.store.type === "m"}`}
              class="btn btn-data-active"
              onClick$={async (e,el) => await handleChnage("m" as HeightUnit)}>
              <span>M</span>
            </button>
  
            <button
              data-active={`${sc.store.type === "cm"}`}
              class="btn btn-data-active"
              onClick$={async (e,el) => await handleChnage("cm" as HeightUnit)}>
              <span>CM</span>
            </button>
            <button
              data-active={`${sc.store.type === "FT"}`}
              class="btn btn-data-active"
              onClick$={async (e,el) => await handleChnage("FT" as HeightUnit)}>
              <span>FT</span>
            </button>
            <p class="h-5 text-sm text-gray-200/70">{getHeightUnit()}</p>
          </div>
        </Popover.Panel>
      </Popover.Root>
    );
  });
  