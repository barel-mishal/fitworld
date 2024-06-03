import { component$, useContext, useSignal, useComputed$ } from '@builder.io/qwik';
import { cn } from '@qwik-ui/utils';
import { Label } from '~/components/ui/label/label';
import { contextAssessmentStore } from '../../../layout';
import { convertHeightUnits } from '~/util/convertUnits';
import { formatedNumber } from '~/util/formatNumber';



export default component$(() => {
  const sc = useContext(contextAssessmentStore);
  const refHeight = useSignal<HTMLButtonElement>();
  const isAvtive = useSignal<boolean>(false);

  const computeHeight = useComputed$(async () => `${formatedNumber(convertHeightUnits(170, "cm", sc.data.personalInformation.height.type))}`);
  const inputHeightValue = useComputed$(() => {
    const isActiveAndEmpty = isAvtive.value && !sc.data.personalInformation.height.value;
    if (isActiveAndEmpty) {
      return "";
    }
    const isActiveAndNotEmpty = isAvtive.value && sc.data.personalInformation.height.value;
    if (isActiveAndNotEmpty) {
      return sc.data.personalInformation.height.value;
    }
    const isNotActiveAndNotEmpty = !isAvtive.value && sc.data.personalInformation.height.value;
    if (isNotActiveAndNotEmpty) {
      return `${formatedNumber(sc.data.personalInformation.height.value)}`;
    }
    return "";
  });

  return (
    <div class="grid gap-4 w-full info-title tracking-wide">
      <h3 class="text-gray-100 text-lg">Personal Goals</h3>

      <div class="grid max-w-sm items-center gap-1.5 ">
        <Label for="email-2" class="text-gray-100 [text-wrap:balance]">Goal 1</Label>
        <input 
        ref={refHeight}
        
        type="number"
        id="goal-1" 
        placeholder={computeHeight.value.toString()} 
        
        onInput$={async (e,el) => {
          const height = parseFloat(el.value);
          sc.data.personalInformation.height.value = height;
          }} class={cn(
            "inp",
          )} 
          onFocus$={() => {
            isAvtive.value = true;
          }}
          onBlur$={() => {
            isAvtive.value = false;
          }}
          value={inputHeightValue.value}
        />

        <p class="text-sm text-gray-200/70 h-5"></p>
      </div>
      <div class="grid max-w-sm items-center gap-1.5 ">
        <Label for="email-2" class="text-gray-100 [text-wrap:balance]">Goal 2</Label>
        <input 
        ref={refHeight}
        
        type="number"
        id="goal-1" 
        placeholder={computeHeight.value.toString()} 
        
        onInput$={async (e,el) => {
          const height = parseFloat(el.value);
          sc.data.personalInformation.height.value = height;
          }} class={cn(
            "inp",
          )} 
          onFocus$={() => {
            isAvtive.value = true;
          }}
          onBlur$={() => {
            isAvtive.value = false;
          }}
          value={inputHeightValue.value}
        />

        <p class="text-sm text-gray-200/70 h-5"></p>
      </div>
      <div class="grid max-w-sm items-center gap-1.5 ">
        <Label for="email-2" class="text-gray-100 [text-wrap:balance]">Goal 3</Label>
        <input 
        ref={refHeight}
        
        type="number"
        id="goal-1" 
        placeholder={computeHeight.value.toString()} 
        
        onInput$={async (e,el) => {
          const height = parseFloat(el.value);
          sc.data.personalInformation.height.value = height;
          }} class={cn(
            "inp",
          )} 
          onFocus$={() => {
            isAvtive.value = true;
          }}
          onBlur$={() => {
            isAvtive.value = false;
          }}
          value={inputHeightValue.value}
        />

        <p class="text-sm text-gray-200/70 h-5"></p>
      </div>

    </div>
  );
});