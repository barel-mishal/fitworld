import { component$, useComputed$, useContext, useSignal } from '@builder.io/qwik';
import { cn } from '@qwik-ui/utils';
import { contextAssessmentStore } from '../../../layout';

export default component$(() => {
  // https://claude.ai/chat/d86dbc49-6a60-44b8-bee9-2f6acf1155d9
  const sc = useContext(contextAssessmentStore);
  const refDay = useSignal<HTMLInputElement>();
  const refYear = useSignal<HTMLInputElement>();
  const refMonth = useSignal<HTMLInputElement>();

  
  const isEmpty = useComputed$(() => {
    return sc.data.personalInformation.dateOfBirth?.day.length === 0 && sc.data.personalInformation.dateOfBirth.month.length === 0 && sc.data.personalInformation.dateOfBirth.year.length === 0;
  });
  
  const isValid = useComputed$(() => {
    const dayString = sc.data.personalInformation.dateOfBirth?.day || "";
    const monthString = sc.data.personalInformation.dateOfBirth?.month || "";
    const yearString = sc.data.personalInformation.dateOfBirth?.year || "";
    const day = parseInt(dayString, 10);
    const month = parseInt(monthString, 10);
    const year = parseInt(yearString, 10);
  
    const isValidDay = day >= 1 && day <= 31;
    const isValidMonth = month >= 1 && month <= 12;
    const isValidYear = !isNaN(year) && sc.data.personalInformation.dateOfBirth?.year.length === 4;
  
    return isValidDay && isValidMonth && isValidYear;
  });
  
  const ERROR_MESSAGE = "Please enter a valid date of birth.";
  const ERROR_EMPTY_MESSAGE = "Please enter your date of birth.";
  
  const age = useComputed$(() => {
    if (isEmpty.value) return ERROR_EMPTY_MESSAGE;
    if (!isValid.value) return ERROR_MESSAGE;
    const date = new Date(`${sc.data.personalInformation.dateOfBirth?.year}-${sc.data.personalInformation.dateOfBirth?.month}-${sc.data.personalInformation.dateOfBirth?.day}`);
    const age = Math.floor((Date.now() - date.getTime()) / (1000 * 60 * 60 * 24 * 365));
    return `Your age is: ${age}, let's move on!`;
  });

  return (
    <div class="grid h-full grid-rows-[auto,1fr] ">
      <h1 class="[text-wrap:balance] title">What is your date of birth?</h1>
      <fieldset class="grid grid-cols-[1fr,1fr,2.5fr] gap-3 place-self-start pt-8" title='birth-date' >
        <legend class="sr-only">Date of Birth</legend>
        <div>
          <label class="info-title" for="day">Day</label>
          <input 
            
            ref={refDay}
            inputMode='numeric'
            value={sc.data.personalInformation.dateOfBirth?.day}
            class={cn(
              "inp w-full text-2xl"
            )}
            placeholder='00' name="day"
            onInput$={(e,el) => {
              const { value } = el;
              const day = parseInt(value, 10);
              if (sc.data.personalInformation.dateOfBirth === undefined) sc.data.personalInformation.dateOfBirth = { day: "", month: "", year: "" };
              sc.data.personalInformation.dateOfBirth = { ...sc.data.personalInformation.dateOfBirth, day: isNaN(day) ? "" : day.toString() } ;
            }}
          />
        </div>
        <div>
          <label class="info-title" for="month">Month</label>
          <input 
            ref={refMonth}
            inputMode='numeric'
            value={sc.data.personalInformation.dateOfBirth?.month}
            class={cn(
              // "flex h-12 w-full rounded-base border border-input bg-background px-3 py-1 text-sm text-foreground shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50",
              // "text-center text-xl"
              "inp w-full text-2xl"
            )}
            placeholder='00' name='month'
            onInput$={(e,el) => {
              const { value } = el;
              const month = parseInt(value, 10);
              if (sc.data.personalInformation.dateOfBirth === undefined) sc.data.personalInformation.dateOfBirth = { day: "", month: "", year: "" };
              sc.data.personalInformation.dateOfBirth = { ...sc.data.personalInformation.dateOfBirth, month: isNaN(month) ? "" : month.toString() };
            }}
            onKeyDown$={(e,el) => e.key === 'Backspace' && el.value.length === 0 && refDay.value?.focus()}
          />
        </div>
        <div>
          <label class="info-title" for="year">Year</label>
          <input 
            ref={refYear}
            inputMode='numeric'
            value={sc.data.personalInformation.dateOfBirth?.year}
            class={cn(
              // "flex h-12 w-full rounded-base border border-input bg-background px-3 py-1 text-sm text-foreground shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50",
              // "text-center text-xl",
              "inp w-full text-2xl"
            )}
            placeholder='0000' name='year'
            onInput$={(e,el) => {
              const { value } = el;
              const year = parseInt(value, 10);
              if (sc.data.personalInformation.dateOfBirth === undefined) sc.data.personalInformation.dateOfBirth = { day: "", month: "", year: "" };
              sc.data.personalInformation.dateOfBirth = { ...sc.data.personalInformation.dateOfBirth, year: isNaN(year) ? "" : year.toString() };
            }}
            onKeyDown$={(e,el) => e.key === 'Backspace' && el.value.length === 0 && refMonth.value?.focus()}
          />
        </div>
      </fieldset>
      <div class="grid place-self-start">
        <p class={[ERROR_MESSAGE === age.value ? "text-rose-300" : "text-emerald-200"]}>
          {age.value}
        </p>
      </div>
    </div>
  );
});