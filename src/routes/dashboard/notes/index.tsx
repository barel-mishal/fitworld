import { component$ } from '@builder.io/qwik';
import { type RequestHandler, } from "@builder.io/qwik-city";
import { NotesLayout } from '~/components/layout_blocks/notes_layout_components/notes';
import { serverNotes } from '~/routes/api/service';



export default component$(() => {

  return (<>
    <NotesLayout note={undefined} />
  </>
  );
});

// todo: delete a notes
export const onDelete: RequestHandler = async (requestEvent) => {
  console.log("delete", await requestEvent.parseBody())

}

// todo: update a notes
export const onPut: RequestHandler = async (requestEvent) => { 
  console.log("edit", await requestEvent.parseBody())
}

 // todo: new a note
 export const onPost: RequestHandler = async ({redirect}) => { 
  const data = await serverNotes();
  data.notes = [...data.notes, { id: (data.notes.length + 1).toString(), title: "", text: "" }];
  throw redirect(302, "/dashboard");
}

export const factoryFetch = async (method: "DELETE" | "PUT" | "POST", id: string | undefined) => {
  const response = await fetch(`/dashboard/notes/`, {
    method: method,
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ id: id }),
  });
  return response.text();
}

export const fetchDelete = async (id: string) => {
  return factoryFetch("DELETE", id)
}

export const fetchPut = async (id: string) => {
  return factoryFetch("PUT", id)
}

export const fetchPost = async () => {
  return factoryFetch("POST", undefined)
}
  
  // todo: view a note
// todo: create a new note



