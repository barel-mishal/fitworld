import { component$, useResource$ } from '@builder.io/qwik';
import { type RequestHandler, } from "@builder.io/qwik-city";
import { type NoteProps } from '~/components/layout_blocks/notes_layout_components/NotesContext';
import { NotesLayoutAside } from '~/components/layout_blocks/notes_layout_components/SideBarNotes';
import { Button } from '~/components/ui/button/button';
import { serverNotes } from '~/routes/api/service';


export default component$(() => {
  const dataNotes = useResource$<{notes: NoteProps[]}>(async () => await serverNotes());

  return (<>
  <div class="flex gap-2  ">
    <NotesLayoutAside notes={dataNotes} selectedNoteId={undefined} />
    <Button onClick$={async () => {
        await fetchPost("1")
    }}>new note</Button>
  </div>
  </>
  );
});

// todo: delete a notes
export const onDelete: RequestHandler = async (requestEvent) => {
  console.log("delete", await requestEvent.parseBody())

}

// todo: edit a notes
export const onPut: RequestHandler = async (requestEvent) => { 
  console.log("edit", await requestEvent.parseBody())

}

 // todo: update a notes
 export const onPost: RequestHandler = async (requestEvent) => { 
  console.log("update", await requestEvent.parseBody())
   
}

export const fetchDelete = async (id: string) => {
  const response = await fetch(`/dashboard/notes/`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({id})
  });
  return response.text();
};

export const fetchPut = async (id: string) => {
  const response = await fetch(`/dashboard/notes/`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({id})
  });
  return response.text()
};

export const fetchPost = async (id: string) => {
  const response = await fetch(`/dashboard/notes/`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({id})
  });
  return response.text()
};
  
  // todo: view a note
// todo: create a new note



