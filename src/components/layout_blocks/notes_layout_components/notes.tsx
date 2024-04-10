import { component$, useContextProvider } from "@builder.io/qwik";
import { useLocation } from "@builder.io/qwik-city";
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


export const NotesLayout = component$<{note: NoteProps}>((props) => {
    const location = useLocation();


    const notesState = useNote(props.note);

    useContextProvider(NotesLayoutContext, notesState);

    return (
        <div class="flex gap-2  ">
            <NotesLayoutAside notes={notesState.dataNotes} selectedNoteId={location.params.id} />
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