import { type Signal, component$ } from "@builder.io/qwik";

import { type ResolvedOption } from '@qwik-ui/headless';
import {
  Combobox,
  ComboboxControl,
  ComboboxInput,
  ComboboxLabel,
  ComboboxListbox,
  ComboboxOption,
  ComboboxPopover,
  ComboboxTrigger,
} from "~/components/ui/combobox/combobox"
import { LuCheck } from '@qwikest/icons/lucide';




type MyData = {
    testValue: string;
    testLabel: string;
    disabled: boolean;
};

interface ComboboxPublishProps {
    objectExample: MyData[];
    selectedOptionIndexSig: Signal<number>;
}

export const ComboboxPublish = component$<ComboboxPublishProps>((props) => {


  return (
    <Combobox
      options={props.objectExample}
      optionValueKey="testValue"
      optionLabelKey="testLabel"
      optionDisabledKey="disabled"
      bind:selectedIndex={props.selectedOptionIndexSig}
    >
      <ComboboxLabel>Show your great to... </ComboboxLabel>
      <ComboboxControl>
        <ComboboxInput placeholder="Publish" />
        <ComboboxTrigger />
      </ComboboxControl>
      <ComboboxPopover gutter={8}>
        <ComboboxListbox
          optionRenderer$={(option: ResolvedOption, index: number) => {
            const myData = option.option as MyData;
            return (
              <ComboboxOption key={option.key} resolved={option} index={index}>
                <span>{myData.testLabel}</span>
                {props.selectedOptionIndexSig.value === index && <LuCheck />}
              </ComboboxOption>
            );
          }}
        />
      </ComboboxPopover>
    </Combobox>
  );
});
