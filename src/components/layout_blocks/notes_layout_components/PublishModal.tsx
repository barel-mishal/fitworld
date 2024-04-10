import { component$, useSignal } from "@builder.io/qwik";
import { Modal, ModalContent, ModalFooter, ModalHeader, ModalTrigger, ModalWrapper } from "../../ui/modal/modal";
import { Button } from "../../ui/button/button";
import { Form } from "@builder.io/qwik-city";

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
                        </div>
                    </div>
                </ModalContent>
                <ModalFooter>
                    <Form >
                        <ComboboxPublish/>
                        <Button>Submit</Button>
                    </Form>
                </ModalFooter>
            </Modal>
        </ModalWrapper>
    );
});



export const ComboboxPublish = component$(() => {
  const selectedOptionIndexSig = useSignal<number>(-1);

  const objectExample = [
    { testValue: 'alice', testLabel: 'Alice', disabled: true },
    { testValue: 'joana', testLabel: 'Joana', disabled: true },
    { testValue: 'malcolm', testLabel: 'Malcolm', disabled: false },
    { testValue: 'zack', testLabel: 'Zack', disabled: true },
    { testValue: 'brian', testLabel: 'Brian', disabled: false },
    { testValue: 'ryan', testLabel: 'Ryan', disabled: false },
    { testValue: 'joe', testLabel: 'Joe', disabled: false },
    { testValue: 'randy', testLabel: 'Randy', disabled: false },
    { testValue: 'david', testLabel: 'David', disabled: true },
    { testValue: 'joseph', testLabel: 'Joseph', disabled: false },
  ];

  type MyData = {
    testValue: string;
    testLabel: string;
    disabled: boolean;
  };

  return (
    <Combobox
      options={objectExample}
      optionValueKey="testValue"
      optionLabelKey="testLabel"
      optionDisabledKey="disabled"
      bind:selectedIndex={selectedOptionIndexSig}
    >
      <ComboboxLabel>Personal Trainers ⚡</ComboboxLabel>
      <ComboboxControl>
        <ComboboxInput placeholder="Jim" />
        <ComboboxTrigger />
      </ComboboxControl>
      <ComboboxPopover gutter={8}>
        <ComboboxListbox
          optionRenderer$={(option: ResolvedOption, index: number) => {
            const myData = option.option as MyData;
            return (
              <ComboboxOption key={option.key} resolved={option} index={index}>
                <span>{myData.testLabel}</span>
                {selectedOptionIndexSig.value === index && <LuCheck />}
              </ComboboxOption>
            );
          }}
        />
      </ComboboxPopover>
    </Combobox>
  );
});
