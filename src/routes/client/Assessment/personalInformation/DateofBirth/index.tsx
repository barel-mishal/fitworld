import { component$, useSignal } from '@builder.io/qwik';
import { cn } from '@qwik-ui/utils';

export default component$(() => {
  const refDay = useSignal<HTMLInputElement>();
  const refYear = useSignal<HTMLInputElement>();
  const refMonth = useSignal<HTMLInputElement>();
  const birthDate = useSignal({ day: '', month: '', year: '' });
  return (
    <div class="bg-sky-200/35 grid h-full grid-rows-[auto,1fr]">
      <h1 class="my-3 text-2xl font-bold [text-wrap:balance] ">What is your date of birth?</h1>
      <fieldset class="grid grid-cols-[1fr,1fr,2.5fr] gap-3 place-self-center" title='birth-date' >
        <legend class="sr-only">Date of Birth</legend>
        <div>
          <label class="" for="day">Day</label>
          <input 
            ref={refDay}
            class={cn(
              "flex h-12 w-full rounded-base border border-input bg-background px-3 py-1 text-sm text-foreground shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50",
              "text-center text-xl"
            )}
            placeholder='00' name="day" 
            onInput$={(e,el) => {
              const { value } = el;
              birthDate.value = { ...birthDate.value, day: value };
              if (value.length === 2) {
                refMonth.value?.focus();
              }
            }} />
        </div>
        <div>
          <label class="" for="month">Month</label>
          <input 
            ref={refMonth}
            onFocus$={(e,el) => {
              el.select();
              const isDay = birthDate.value.day.length === 2;
              if (isDay) {
                refMonth.value?.focus();
              } else {
                refDay.value?.focus();
              }
            }}
            class={cn(
              "flex h-12 w-full rounded-base border border-input bg-background px-3 py-1 text-sm text-foreground shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50",
              "text-center text-xl"
            )}
            onKeyDown$={(e,el) => {
              console.log(e.key);
              if (e.key === 'Backspace' && el.value.length === 0) {
                refDay.value?.focus();
              }
            }}
            placeholder='00' name='month'
            onInput$={(e,el) => {
              const { value } = el;
              birthDate.value = { ...birthDate.value, month: value };
              if (value.length === 2) {
                refYear.value?.focus();
              }
            }}
          />
        </div>
        <div>
          <label class="" for="year">Year</label>
          <input 
            ref={refYear}
            onFocus$={(e,el) => {
              el.select();
              const isDayMonth = birthDate.value.day.length === 2 && birthDate.value.month.length === 2;
              if (isDayMonth) {
                refYear.value?.focus();
              } else if (birthDate.value.day.length < 2) {
                refDay.value?.focus();
              } else {
                refMonth.value?.focus();
              }
            }}
            class={cn(
              "flex h-12 w-full rounded-base border border-input bg-background px-3 py-1 text-sm text-foreground shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50",
              "text-center text-xl"
            )}
            placeholder='0000' name='year'
            onInput$={(e,el) => {
              const { value } = el;
              birthDate.value = { ...birthDate.value, year: value };
            }}
            onKeyDown$={(e,el) => {
              if (e.key === 'Backspace' && el.value.length === 0) {
                refMonth.value?.focus();
              }
            }}
          />
        </div>
      </fieldset>
    </div>
  );
});


// onBeforeinput$={(e,el) => {
//   const isInput = e.target instanceof HTMLInputElement;
//   if (!isInput) return;
//   const { name, value } = e.target;
//   switch (name) {
//     case 'day':
//       if (value.length === 2) {
//         refMonth.value?.focus();
//       }
//       break;
//     case 'month':
//       if (value.length === 2) {
//         refYear.value?.focus();
//       }
//       break;
//     case 'year':
//       if (value.length === 4) {
//         refYear.value?.blur();
//       }
//       break;
//   }
// }}