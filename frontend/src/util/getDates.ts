export type DatesView = 'days' | 'months' | 'years';

export function* dateRangeGenerator(startDate: Date, endDate: Date, view: DatesView): Generator<Date> {
  let currentDate = new Date(startDate);

  while (currentDate <= endDate) {
    yield new Date(currentDate);

    switch (view) {
      case 'days':
        currentDate.setDate(currentDate.getDate() + 1);
        break;
      case 'months':
        currentDate.setMonth(currentDate.getMonth() + 1);
        break;
      case 'years':
        currentDate.setFullYear(currentDate.getFullYear() + 1);
        break;
      default:
        throw new Error('Invalid view');
    }
  }
}

export function getDateRange(startDate: Date, endDate: Date, view: DatesView): Date[] {
    const dateGenerator = dateRangeGenerator(startDate, endDate, view);
    return Array.from(dateGenerator);
}

export type ViewRange = {
    min: Date;
    max: Date;
  };
  
export function getViewRange(currentDate: Date): ViewRange {
    // Calculate the start of the month
    const startOfMonth = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1);
  
    // Calculate the end of the month
    const endOfMonth = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0);
  
    // Calculate the start of the week for the start date
    const startOfWeek = new Date(startOfMonth);
    startOfWeek.setDate(startOfWeek.getDate() - startOfWeek.getDay());
  
    // Calculate the end date for the full five weeks
    const endOfFiveWeeks = new Date(startOfWeek);
    endOfFiveWeeks.setDate(endOfFiveWeeks.getDate() + (5 * 7) - 1);
  
    // Ensure max date does not exceed the actual end of the month
    const max = endOfFiveWeeks > endOfMonth ? endOfMonth : endOfFiveWeeks;
    const min = startOfWeek;
  
    return { min, max };
};

export function getNextMonth(date: Date): Date {
    return new Date(date.getFullYear(), date.getMonth() + 1, 1); 
  }
export function getPreviousMonth(date: Date): Date {
    return new Date(date.getFullYear(), date.getMonth() - 1, 1); 
  }

export function reduceToWeeks(dates: Date[]): Date[][] {
    return dates.reduce((prev, curr, index) => {
      if (index % 7 === 0) {
        // Start a new week
        return prev.concat([[curr]]);
      } else {
        // Add to the current week
        prev[prev.length - 1] = prev[prev.length - 1].concat(curr);
        return prev;
      }
    }, [] as Date[][]);
  }