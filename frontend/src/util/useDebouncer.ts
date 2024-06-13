import { $, useSignal, type QRL } from "@builder.io/qwik";

const useDebouncer = (fn: QRL<(args: any) => void>, delay: number) => {
  const timeoutId = useSignal<number>();
  return $((args: any) => {
    clearTimeout(timeoutId.value);
    timeoutId.value = Number(setTimeout(() => fn(args), delay));
  });
};

export default useDebouncer;
