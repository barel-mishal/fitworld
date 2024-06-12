import {
  component$,
  useContext,
  useSignal,
  useComputed$,
} from "@builder.io/qwik";
import { cn } from "@qwik-ui/utils";
import { Label } from "~/components/ui/label/label";
import { contextAssessmentStore } from "../../../layout";
import { convertHeightUnits } from "~/util/convertUnits";
import { formatedNumber } from "~/util/formatNumber";

export default component$(() => {
  const sc = useContext(contextAssessmentStore);
  const refHeight = useSignal<HTMLButtonElement>();
  const isAvtive = useSignal<boolean>(false);

  const computeHeight = useComputed$(
    async () =>
      `${formatedNumber(convertHeightUnits(170, "cm", sc.data.personalInformation.height.type))}`,
  );
  const inputHeightValue = useComputed$(() => {
    const isActiveAndEmpty =
      isAvtive.value && !sc.data.personalInformation.height.value;
    if (isActiveAndEmpty) {
      return "";
    }
    const isActiveAndNotEmpty =
      isAvtive.value && sc.data.personalInformation.height.value;
    if (isActiveAndNotEmpty) {
      return sc.data.personalInformation.height.value;
    }
    const isNotActiveAndNotEmpty =
      !isAvtive.value && sc.data.personalInformation.height.value;
    if (isNotActiveAndNotEmpty) {
      return `${formatedNumber(sc.data.personalInformation.height.value)}`;
    }
    return "";
  });

  return (
    <div class="info-title grid w-full grid-cols-[1fr,auto] gap-4 tracking-wide">
      <div class="grid max-w-sm items-center gap-1.5">
        <Label for="email-2" class="text-gray-100 [text-wrap:balance]">
          Height
        </Label>
        <input
          ref={refHeight}
          type="Height"
          id="Height"
          placeholder={computeHeight.value.toString()}
          onInput$={async (e, el) => {
            const height = parseFloat(el.value);
            sc.data.personalInformation.height.value = height;
          }}
          class={cn("inp")}
          onFocus$={() => {
            isAvtive.value = true;
          }}
          onBlur$={() => {
            isAvtive.value = false;
          }}
          value={inputHeightValue.value}
        />

        <p class="h-5 text-sm text-gray-200/70">
          The name shown by others in the application{" "}
        </p>
      </div>
      <div class="grid max-w-sm items-center gap-1.5">
        <Label for="email-2" class="text-gray-100">
          Unit
        </Label>
        <MyPopover height={sc.data.personalInformation.height} />
      </div>
    </div>
  );
});

interface HeightGetter {
  height?: {
    type: string;
    value: number;
  };
}

export const MyPopover = component$<HeightGetter>(() => {
  const sc = useContext(contextAssessmentStore);
  const triggerRef = useSignal<HTMLButtonElement>();
  const popoverRef = useSignal<HTMLElement>();
  const getHeightUnit = () => {
    switch (sc.data.personalInformation.height.type) {
      case "cm":
      case "m":
        return "Metric";
      default:
        return "Imperial";
    }
  };

  return (
    <>
      <div
        ref={triggerRef}
        class={"btn"}
        data-popovertarget="unit-height-id"
      >
        <span>{sc.data.personalInformation.height.type.toUpperCase()}</span>
      </div>
      <div
        class="w-32 -translate-x-[24px] rounded-base border border-gray-800 bg-gray-950 p-2 text-gray-50 shadow-sm"
        ref={popoverRef}
        id="unit-height-id"
      >
        <div class="grid w-auto gap-4">
          <button
            data-active={`${sc.data.personalInformation.height.type === "cm"}`}
            class="btn btn-data-active"
            onClick$={() => {
              sc.data.personalInformation.height = {
                ...sc.data.personalInformation.height,
                type: "cm",
                value: parseFloat(
                  formatedNumber(
                    convertHeightUnits(
                      sc.data.personalInformation.height.value,
                      sc.data.personalInformation.height.type,
                      "cm",
                    ),
                  ),
                ),
              };
            }}
          >
            <span>CM</span>
          </button>

          <button
            data-active={`${sc.data.personalInformation.height.type === "m"}`}
            class="btn btn-data-active"
            onClick$={() => {
              sc.data.personalInformation.height = {
                ...sc.data.personalInformation.height,
                type: "m",
                value: parseFloat(
                  formatedNumber(
                    convertHeightUnits(
                      sc.data.personalInformation.height.value,
                      sc.data.personalInformation.height.type,
                      "m",
                    ),
                  ),
                ),
              };
            }}
          >
            <span>M</span>
          </button>

          <button
            data-active={`${sc.data.personalInformation.height.type === "FT"}`}
            class="btn btn-data-active"
            onClick$={() => {
              sc.data.personalInformation.height = {
                ...sc.data.personalInformation.height,
                type: "FT",
                value: parseFloat(
                  formatedNumber(
                    convertHeightUnits(
                      sc.data.personalInformation.height.value,
                      sc.data.personalInformation.height.type,
                      "FT",
                    ),
                  ),
                ),
              };
            }}
          >
            <span>FT</span>
          </button>
        </div>
      </div>
      <p class="h-5 text-sm text-gray-200/70">{getHeightUnit()}</p>
    </>
  );
});
