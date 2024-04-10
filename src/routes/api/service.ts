import { server$ } from "@builder.io/qwik-city";

export const serverNotes = server$(async function() {
  return {
    notes: [
      { id: 1, text: "Note 1", title: "Title 1" },
      { id: 2, text: "Note 2", title: "Title 1" },
      { id: 3, text: "Note 3", title: "Title 1" },
    ],
  };
});

export const serverGetNote = server$(async function(id: string) {
    return await serverNotes().then((data) => {
        const note = data.notes.find((note) => note.id === Number(id));
      return note
    });
});