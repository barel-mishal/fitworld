import { server$ } from "@builder.io/qwik-city";

export const notes = {
  notes: [
    { id: "1", text: `Note 1 # Heading one

    ___
    
    # heading two
    
    ___
    
    # Heading one
    
    ___
    
    # heading two
    
    ___
    
    # Heading one
    
    ___
    
    # heading two
    
    ___
    
    # Heading one
    
    ___
    
    # heading two
    
    ___
    
    # Heading one
    
    ___
    
    # heading two
    
    ___`, title: "Title 1" },
    { id: "2", text: "Note 2", title: "Title 2" },
    { id: "3", text: "Note 3", title: "Title 3" },
  ],
};

export const serverNotes = server$(async function() {
  return notes
});
export const serverGetNote = server$(async function(id: string) {
    return await serverNotes().then((data) => {
        const note = data.notes.find((note) => note.id === id);
      return note
    });
});
export const serverNewNote = server$(async function() {
    notes.notes = [...notes.notes, { id: (notes.notes.length + 2).toString(), title: "Note " + notes.notes.length, text: "" }]
    return {note: notes.notes.at(-1)}
});