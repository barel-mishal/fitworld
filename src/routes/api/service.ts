import { server$ } from "@builder.io/qwik-city";

export const serverNotes = server$(async function() {
  return {
    notes: [
      { id: 1, text: "Note 1" },
      { id: 2, text: "Note 2" },
      { id: 3, text: "Note 3" },
    ],
  };
});