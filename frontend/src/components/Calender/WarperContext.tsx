import { $, Slot, component$, createContextId, useComputed$, useContextProvider, useStore } from "@builder.io/qwik";
import { type DatesView, getDateRange, getViewRange } from "~/util/getDates";




interface UseCalenderProps {
    test: string;
    selected?: Date;
    viewRange?: {
        min: Date;
        max: Date;
    };
    now?: Date;
}

export const useCalendar = (props: UseCalenderProps) => {
    const store = useStore({
        viewRange: props.viewRange || {
            min: new Date(),
            max: new Date(),
        },
        view: "days" as DatesView, 
        now: props.now || new Date(),
        selected: props.selected,
    });

    const genrateCalender = $(() => {
        return getDateRange(store.viewRange.min, store.viewRange.max, store.view);
    });

    const computedCalender = useComputed$(async () => await genrateCalender());

  return {
    props,
    store,
    genrateCalender,    
    computedCalender,
  }
};


export type CalenderHook = ReturnType<typeof useCalendar>;

export const contextCalender = createContextId<CalenderHook>("Calender");


export const RootCalender = component$(() => {

    // Example usage:
    const currentDate = new Date();
    const viewRange = getViewRange(currentDate);

    const calendar = useCalendar({
    test: "test",
    viewRange: viewRange
    });

    useContextProvider(contextCalender, calendar);
    return <Slot />;
});

