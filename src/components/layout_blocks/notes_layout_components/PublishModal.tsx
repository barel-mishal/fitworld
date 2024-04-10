import { type Signal, component$, useSignal } from "@builder.io/qwik";
import { Modal, ModalContent, ModalFooter, ModalHeader, ModalTrigger, ModalWrapper } from "../../ui/modal/modal";
import { Button } from "../../ui/button/button";

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

interface PublishProps {
    id: string;
    name: string;
}

export const PublishModal = component$<PublishProps>((props) => {
    const selectedOptionIndexSig = useSignal<number>(-1);
    const objectExample = [
        { testValue: 'pubilsh', testLabel: 'Pubilsh', disabled: false },
        { testValue: 'draft', testLabel: 'Draft', disabled: false },
    ];
    return (
        <ModalWrapper>
            <ModalTrigger>
                <Button class={""}>
                    <p>Publish</p>
                </Button>
            </ModalTrigger>
            <Modal >
                <ModalHeader class={"min-w-[300px]"}>
                    <p class="text-sm font-light">
                        Change Visibility
                    </p>
                    <h2 class="text-lg font-bold">{props.name}</h2>
                </ModalHeader>
                    
                <ModalContent>
                    <div class="grid gap-4 py-4">
                        <div class="grid grid-cols-4 items-center gap-4">
                        <ComboboxPublish objectExample={objectExample} selectedOptionIndexSig={selectedOptionIndexSig} />
                        </div>
                    </div>
                </ModalContent>
                <ModalFooter>
                        <Button>Submit</Button>
                </ModalFooter>
                    
            </Modal>
        </ModalWrapper>
    );
});

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
