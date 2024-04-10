import { server$ } from "@builder.io/qwik-city";

export const serverData = {
  notes: [
    { 
        id: "1", 
        text: `Note 1 # Heading one

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
      
      ___`, 
      title: "Title 1",
      createdAt: new Date(),
      updatedAt: new Date()
    },
    { id: "2", text: "Note 2", title: "Title 2" },
    { id: "3", text: "Note 3", title: "Title 3" },
  ],
};

export const serverNotes = server$(async function() {
  return serverData
});
export const serverGetNote = server$(async function(id: string) {
    return await serverNotes().then((data) => {
        const note = data.notes.find((note) => note.id === id);
      return note
    });
});
export const serverNewNote = server$(async function() {
    serverData.notes = [...serverData.notes, { id: (serverData.notes.length + 2).toString(), title: "Note " + serverData.notes.length, text: "" }]
    return {note: serverData.notes.at(-1)}
});