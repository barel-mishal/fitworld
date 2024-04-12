import { component$, useComputed$, useContext, useSignal } from '@builder.io/qwik';
import { cn } from '@qwik-ui/utils';
import { contextAssessmentStore } from '../../layout';

export default component$(() => {
  // https://claude.ai/chat/d86dbc49-6a60-44b8-bee9-2f6acf1155d9
  const sc = useContext(contextAssessmentStore);
  sc.settings.buttonDisabled = true;
  const refDay = useSignal<HTMLInputElement>();
  const refYear = useSignal<HTMLInputElement>();
  const refMonth = useSignal<HTMLInputElement>();
  const birthDate = useSignal({ day: '', month: '', year: '' });
  const isEmpty = useComputed$(() => {
    return birthDate.value.day.length === 0 && birthDate.value.month.length === 0 && birthDate.value.year.length === 0;
  });
  const isValid = useComputed$(() => {
    const day = parseInt(birthDate.value.day, 10);
    const month = parseInt(birthDate.value.month, 10);
    const year = parseInt(birthDate.value.year, 10);
  
    const isValidDay = day >= 1 && day <= 31;
    const isValidMonth = month >= 1 && month <= 12;
    const isValidYear = !isNaN(year) && birthDate.value.year.length === 4;
  
    return isValidDay && isValidMonth && isValidYear;
  });
  const ERROR_MESSAGE = "Please enter a valid date of birth.";
  const ERROR_EMPTY_MESSAGE = "Please enter your date of birth.";
  const age = useComputed$(() => {
    if (isEmpty.value) return ERROR_EMPTY_MESSAGE;
    if (!isValid.value) return ERROR_MESSAGE;
    const date = new Date(`${birthDate.value.year}-${birthDate.value.month}-${birthDate.value.day}`);
    const age = Math.floor((Date.now() - date.getTime()) / (1000 * 60 * 60 * 24 * 365));
    return `Your age is: ${age}, let's move on!`;
  });

  
  return (
    <div class="grid h-full grid-rows-[auto,1fr]">
      <h1 class="my-3 text-2xl font-bold [text-wrap:balance] ">What is your date of birth?</h1>
      <fieldset class="grid grid-cols-[1fr,1fr,2.5fr] gap-3 place-self-center" title='birth-date' >
        <legend class="sr-only">Date of Birth</legend>
        <div>
          <label class="" for="day">Day</label>
          <input 
            ref={refDay}
            inputMode='numeric'
            value={birthDate.value.day}
            class={cn(
              "flex h-12 w-full rounded-base border border-input bg-background px-3 py-1 text-sm text-foreground shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50",
              "text-center text-xl"
            )}
            placeholder='00' name="day"
            onInput$={(e,el) => {
              const { value } = el;
              const day = parseInt(value, 10);
              birthDate.value = { ...birthDate.value, day: isNaN(day) ? "" : day.toString() };
            }}
          />
        </div>
        <div>
          <label class="" for="month">Month</label>
          <input 
            ref={refMonth}
            inputMode='numeric'
            value={birthDate.value.month}
            class={cn(
              "flex h-12 w-full rounded-base border border-input bg-background px-3 py-1 text-sm text-foreground shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50",
              "text-center text-xl"
            )}
            placeholder='00' name='month'
            onInput$={(e,el) => {
              const { value } = el;
              const month = parseInt(value, 10);
              birthDate.value = { ...birthDate.value, month: isNaN(month) ? "" : month.toString() };
            }}
          />
        </div>
        <div>
          <label class="" for="year">Year</label>
          <input 
            ref={refYear}
            inputMode='numeric'
            value={birthDate.value.year}
            class={cn(
              "flex h-12 w-full rounded-base border border-input bg-background px-3 py-1 text-sm text-foreground shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50",
              "text-center text-xl"
            )}
            placeholder='0000' name='year'
            onInput$={(e,el) => {
              const { value } = el;
              const year = parseInt(value, 10);
              birthDate.value = { ...birthDate.value, year: isNaN(year) ? "" : year.toString() };
            }}
          />
        </div>
      </fieldset>
      <div class="grid place-self-start">
        <p class={[ERROR_MESSAGE === age.value ? "text-rose-700" : "text-emerald-200"]}>
          {age.value}
        </p>
      </div>
    </div>
  );
});
// export default component$(() => {
//   // https://claude.ai/chat/d86dbc49-6a60-44b8-bee9-2f6acf1155d9
//   const sc = useContext(contextAssessmentStore);
//   sc.settings.buttonDisabled = true;
//   const refDay = useSignal<HTMLInputElement>();
//   const refYear = useSignal<HTMLInputElement>();
//   const refMonth = useSignal<HTMLInputElement>();
//   const birthDate = useSignal({ day: '', month: '', year: '' });
//   const isEmpty = useComputed$(() => {
//     return birthDate.value.day.length === 0 && birthDate.value.month.length === 0 && birthDate.value.year.length === 0;
//   });
//   const isValid = useComputed$(() => {
//     const day = parseInt(birthDate.value.day, 10);
//     const month = parseInt(birthDate.value.month, 10);
//     const year = parseInt(birthDate.value.year, 10);
  
//     const isValidDay = day >= 1 && day <= 31;
//     const isValidMonth = month >= 1 && month <= 12;
//     const isValidYear = !isNaN(year) && birthDate.value.year.length === 4;
  
//     return isValidDay && isValidMonth && isValidYear;
//   });
//   const age = useComputed$(() => {
//     if (isEmpty.value) return "Please enter your date of birth.";
//     if (!isValid.value) return "Please enter a valid date of birth.";
//     const date = new Date(`${birthDate.value.year}-${birthDate.value.month}-${birthDate.value.day}`);
//     const age = Math.floor((Date.now() - date.getTime()) / (1000 * 60 * 60 * 24 * 365));
//     return `Your age is: ${age}, let's move on!`;
//   });
//   // eslint-disable-next-line qwik/no-use-visible-task
//   useVisibleTask$(({track}) => {
//     const v = track(() => isValid.value);
//     if (!v) {
//       sc.settings.buttonDisabled = true;
//       return;
//     } 
//     sc.settings.buttonDisabled = false;

//   }, {strategy: "intersection-observer"});
  
//   return (
//     <div class="grid h-full grid-rows-[auto,1fr]">
//       <h1 class="my-3 text-2xl font-bold [text-wrap:balance] ">What is your date of birth?</h1>
//       <fieldset class="grid grid-cols-[1fr,1fr,2.5fr] gap-3 place-self-center" title='birth-date' >
//         <legend class="sr-only">Date of Birth</legend>
//         <div>
//           <label class="" for="day">Day</label>
//           <input 
//             inputMode='numeric'
//             value={birthDate.value.day}
//             ref={refDay}
//             class={cn(
//               "flex h-12 w-full rounded-base border border-input bg-background px-3 py-1 text-sm text-foreground shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50",
//               "text-center text-xl"
//             )}
//             placeholder='00' name="day" 
//             onInput$={(e,el) => {
//               const { value } = el;
//               birthDate.value = { ...birthDate.value, day: value };
//               if (value.length === 2) {
//                 refMonth.value?.focus();
//               }
//             }} />
//         </div>
//         <div>
//           <label class="" for="month">Month</label>
//           <input 
//             inputMode='numeric'
//             value={birthDate.value.month}
//             ref={refMonth}
//             onFocus$={(e,el) => {
//               el.select();
//               const isDay = birthDate.value.day.length === 2;
//               if (isDay) {
//                 refMonth.value?.focus();
//               } else {
//                 refDay.value?.focus();
//               }
//             }}
//             onInput$={(e,el) => {
//               const { value } = el;
//               birthDate.value = { ...birthDate.value, month: value };
//               if (value.length === 2) {
//                 refYear.value?.focus();
//               }
//             }}
//             onKeyDown$={(e,el) => {
//               if (e.key === 'Backspace' && el.value.length === 0) {
//                 refDay.value?.focus();
//               }
//             }}
//             class={cn(
//               "flex h-12 w-full rounded-base border border-input bg-background px-3 py-1 text-sm text-foreground shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50",
//               "text-center text-xl"
//             )}
//             placeholder='00' name='month'
//           />
//         </div>
//         <div>
//           <label class="" for="year">Year</label>
//           <input 
//             inputMode='numeric'
//             value={birthDate.value.year}
//             ref={refYear}
//             onFocus$={(e,el) => {
//               el.select();
//               const isDayMonth = birthDate.value.day.length === 2 && birthDate.value.month.length === 2;
//               if (isDayMonth) {
//                 refYear.value?.focus();
//               } else if (birthDate.value.day.length === 2) {
//                 refDay.value?.focus();
//               } else {
//                 refMonth.value?.focus();
//               }
//             }}
//             class={cn(
//               "flex h-12 w-full rounded-base border border-input bg-background px-3 py-1 text-sm text-foreground shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50",
//               "text-center text-xl"
//             )}
//             placeholder='0000' name='year'
//             onInput$={(e,el) => {
//               const { value } = el;
//               birthDate.value = { ...birthDate.value, year: value };
//             }}
//             onKeyDown$={(e,el) => {
//               if (e.key === 'Backspace' && el.value.length === 0) {
//                 refMonth.value?.focus();
//               }
//             }}
//           />
//         </div>
//       </fieldset>
//       <div class="grid place-self-start">
//         <p>
//           {age.value}
//         </p>
//       </div>
//     </div>
//   );
// });


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