import { $, Slot, component$, createContextId, useContextProvider, useStore } from "@builder.io/qwik";




interface UseCalenderProps {
    test: string;
}

export const useCalender = (props: UseCalenderProps) => {
    const store = useStore({
        count: 0,
    });

    const onClickIncrement = $(() => {
        store.count++;
    }),
    onClickDecrement = $(() => {
        store.count--;
    });

  return {
    props,
    store,
    onClickIncrement,
    onClickDecrement,
  }
};


export type CalenderHook = ReturnType<typeof useCalender>;

export const contextCalender = createContextId<CalenderHook>("Calender");


export const RootCalender = component$(() => {

    const calender = useCalender({test: "test"});

    useContextProvider(contextCalender, calender);
    return <Slot />;
});