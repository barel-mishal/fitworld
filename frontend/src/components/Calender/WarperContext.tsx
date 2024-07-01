import { $, type QRL, Slot, component$, createContextId, useComputed$, useContextProvider, useStore } from "@builder.io/qwik";
import { type DatesView, getDateRange, getPreviousMonth, getNextMonth, getViewRange, reduceToWeeks } from "~/util/getDates";

interface UseCalenderProps {
    test: string;
    selected?: Date[];
    currentView?: Date;
    now?: Date;
    selectDatesTimesViews?: QRL<(now: Date, currentView: Date, selected: Date[]) => Date[]>
}

export const useCalendar = (props: UseCalenderProps) => {
    const store = useStore({
        view: "days" as DatesView, 
        now: props.now || new Date(),
        selected: props.selected,
        currentView: props.currentView || new Date(),
    });

    const moveBackward = $(() => {
        store.currentView = getPreviousMonth(store.currentView);
    });

    const moveForward = $(() => {
        store.currentView = getNextMonth(store.currentView);
    });

    const genrateCalender = $(() => {
        const range = getViewRange(store.currentView);
        return getDateRange(range.min, range.max, store.view);
    });

    const selectedMonth = useComputed$(async () => {
        if (props.selectDatesTimesViews && store.selected)
        return await props.selectDatesTimesViews(store.now, store.currentView, store.selected);
    });

    const computedCalender = useComputed$(
        async () => reduceToWeeks(await genrateCalender())
    );

    return {
        props,
        store,
        genrateCalender,    
        computedCalender,
        moveBackward,
        moveForward,
        selectedMonth
    }
};

export type CalenderHook = ReturnType<typeof useCalendar>;

export const contextCalender = createContextId<CalenderHook>("Calender");



interface CalenderProps {
    selected?: Date[];
    selectDatesTimesViews?: UseCalenderProps["selectDatesTimesViews"]

}
export const RootCalender = component$<CalenderProps>((props) => {

    // Example usage:
    const currentDate = new Date();

    const calendar = useCalendar({
        test: "test",
        currentView: currentDate,
        selected: props.selected,
        selectDatesTimesViews: props.selectDatesTimesViews
    });

    useContextProvider(contextCalender, calendar);
    return <Slot />;
});

