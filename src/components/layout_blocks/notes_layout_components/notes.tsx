import { component$, useContext, useContextProvider } from "@builder.io/qwik";
import { Button } from "~/components/ui/button/button";
import { Textarea } from "~/components/ui/textarea/textarea";
import { fetchDelete, fetchPost, fetchPut } from "~/routes/dashboard/notes";
import { NotesLayoutContext, useNote } from "./NotesContext";
import { NotesLayoutAside } from "./SideBarNotes";


export interface NoteProps {
    title: string;
    text: string;
    id: string;
}


export const NotesLayout = component$<{note: NoteProps | undefined}>((props) => {
    const notesState = useNote(props.note);
    useContextProvider(NotesLayoutContext, notesState);

    if (!notesState.store) {
        return   <div class="flex gap-2  ">
        <NotesLayoutAside notes={notesState.dataNotes} selectedNoteId={undefined} />
        <Button onClick$={async () => {
            await fetchPost("1")
        }}>new note</Button>
      </div>
    }

    return (
        <NotesContainer />
    )
});
export const NotesContainer = component$(() => {
    const notesState = useContext(NotesLayoutContext);
    if (!notesState.store) {
        return <div>Not found</div>;
    }
    return (
        <div class="flex gap-2  ">
            <NotesLayoutAside notes={notesState.dataNotes} selectedNoteId={notesState.location.params.id} />
        <section class={"flex overflow-y-auto flex-grow justify-center"} style={{height: `${notesState.dashboardContext.value.height}px`}}>
          <div class="">
            {notesState.store.edit ? <Textarea onInput$={(e, el) => notesState.store.updateContext(el.value)} value={notesState.store.content}></Textarea> : 
            <div 
            contentEditable='inherit' class="prose max-w-[600px] px-14 py-12 border" 
            dangerouslySetInnerHTML={notesState.parsedMarkdown} ></div>}
  
            <Button onClick$={() => notesState.store.toggleEdit()}>{notesState.store.textEdit()}</Button>
            <Button onClick$={async () => {
              await fetchDelete("1")
            }}>Delete</Button>
            <Button onClick$={async () => {
              await fetchPut("1")
            }}>Edit</Button>
            <Button onClick$={async () => {
              await fetchPost("1")
            }}>Save</Button>
          </div>
        </section>
      </div>
    )
});

