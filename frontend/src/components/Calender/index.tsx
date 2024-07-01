import CurrentDate from "./CurrentDate/CurrentDate";
import PeriodSelectedDays from "./PeriodSelectedDays/PeriodSelectedDays";
import { TriggerSkipMonths } from "./TriggerSkipMonths";
import TableCalender from "./UITableCalnder/TableCalender";
import { RootCalender as LibRootCalender } from "./WarperContext";

export const Calender = {
    Root: LibRootCalender,
    TableCalender,
    TriggerSkipMonths,
    PeriodSelectedDays,
    CurrentDate,
}; 
