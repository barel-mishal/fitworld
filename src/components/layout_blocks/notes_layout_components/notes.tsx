import { component$, useContextProvider } from "@builder.io/qwik";
import { Button } from "~/components/ui/button/button";
import { fetchPost } from "~/routes/dashboard/notes";
import { NotesLayoutContext, useNote } from "./NotesContext";
import { NotesLayoutAside } from "./SideBarNotes";
import { NotesContainer } from "./NoteComp";


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


