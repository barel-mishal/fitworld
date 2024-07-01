import { $, useOnDocument, useSignal } from "@builder.io/qwik";

export const useScrollPass = (pass: number) => {
    const fadeIn = useSignal(false);
    useOnDocument('scroll', $((event) => {
      const doc = event.target as Document;
      const scrollTop = doc.documentElement.scrollTop || doc.body.scrollTop;
      if (scrollTop > pass) {
        fadeIn.value = true;
      } else {
        fadeIn.value = false;
      }
    }));
    return fadeIn;
  }