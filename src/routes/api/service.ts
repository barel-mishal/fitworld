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
      updatedAt: new Date(),
      publishedAt: new Date(), 
    },
    { 
      id: "2", 
      text: "Note 2", 
      title: "Title 2",
      createdAt: new Date(),
      updatedAt: new Date(),
      publishedAt: undefined,
     },
    { 
      id: "3", 
      text: "Note 3", 
      title: "Title 3",
      createdAt: new Date(),
      updatedAt: new Date(),
      publishedAt: undefined,
    },
  ],
};

// ********* Notes API *********
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
    serverData.notes = serverData.notes.concat({id: (serverData.notes.length + 1).toString(), text: "", title: "", createdAt: new Date(), updatedAt: new Date(), publishedAt: undefined});
    return {note: serverData.notes.at(-1)}
});
export const serverDeleteNote = server$(async function(id: string) {
    serverData.notes = serverData.notes.filter((note) => note.id !== id);
    return {note: id}
});
export const serverGetPublishNotes = server$(async function() {
    return serverData.notes.filter((note) => note.publishedAt !== undefined);
});
export const serverGetUnPublishNotes = server$(async function() {
    return serverData.notes.filter((note) => note.publishedAt === undefined);
});
export const serverPublishNote = server$(async function(id: string) {
    const note = serverData.notes.findIndex((note) => note.id === id);
    serverData.notes[note].publishedAt = new Date();
    return {note: serverData.notes[note]}
});