import { component$, useSignal } from '@builder.io/qwik';
import { Combobox, type ResolvedOption } from '@qwik-ui/headless';
import { LuCheck } from '@qwikest/icons/lucide';

export default component$(() => {
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
    <Combobox.Root
      options={objectExample}
      optionValueKey="testValue"
      optionLabelKey="testLabel"
      optionDisabledKey="disabled"
      bind:selectedIndex={selectedOptionIndexSig}
    >
      <Combobox.Label>Personal Trainers ⚡</Combobox.Label>
      <Combobox.Control>
        <Combobox.Input placeholder="Jim" />
        <Combobox.Trigger />
      </Combobox.Control>
      <Combobox.Popover gutter={8}>
        <Combobox.Listbox
          optionRenderer$={(option: ResolvedOption, index: number) => {
            const myData = option.option as MyData;
            return (
              <Combobox.Option key={option.key} resolved={option} index={index}>
                <span>{myData.testLabel}</span>
                {selectedOptionIndexSig.value === index && <LuCheck />}
              </Combobox.Option>
            );
          }}
        />
      </Combobox.Popover>
    </Combobox.Root>
  );
});
