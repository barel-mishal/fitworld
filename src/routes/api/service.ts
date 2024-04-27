import { server$ } from "@builder.io/qwik-city";
import { serverInitDatabase } from "../seedDatabase";
import { type ExtendSession } from "../plugin@auth";

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



// ********* Tracking API *********


// DEFINE TABLE Eat TYPE ANY SCHEMAFULL
// 	PERMISSIONS
// 		FOR select, update
// 			WHERE userId = $auth.id
// 		FOR create NONE
// 		FOR delete
// 			WHERE userId = $auth.id OR $auth.role = 'admin'
// ;
// DEFINE FIELD userId ON Eat TYPE record<user> VALUE $auth;
// DEFINE FIELD food ON Eat TYPE record<Ingredient>;
// DEFINE FIELD amount ON Eat TYPE float DEFAULT 0.0;
// DEFINE FIELD measurement ON Eat TYPE record<Measurements>;
// DEFINE FIELD createdAt ON Eat TYPE datetime DEFAULT time::now();
// DEFINE FIELD updatedAt ON Eat TYPE datetime VALUE $value DEFAULT time::now();
// DEFINE FIELD eatedAt ON Eat TYPE datetime VALUE $value DEFAULT time::now();
export const serverAddEat = server$(async function() {
    try {
      const db = await serverInitDatabase();
      const session = await this.sharedMap.get("session") as unknown as ExtendSession;
      await db.use({ namespace: "namespace", database: "database" });
      await db.authenticate(session.database.token);
  
      const eat = await db.create("Eat", {
        food: "Ingredient:07akpos8zlxuq5gsq4ls",
        amount: 1,
        measurement: "ingredient_measurements:3shv85a3649fbhjogmn8",
        eatedAt: new Date()
      });
      return {
        eat
      }
    } catch (error) {
      console.error(error);
    }
});

export const serverGetIngredients = server$(async function() {
    try {
      const db = await serverInitDatabase();
      await db.use({ namespace: "namespace", database: "database" });
      const ingredients = await db.select("Ingredient");
      return {ingredients} as {ingredients: {name: string, id: string}[]}
    } catch (error) {
      console.error(error);
      return {ingredients: []}
    }
});