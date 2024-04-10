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
        return   <div class="flex gap-2 ">
        <NotesLayoutAside notes={notesState.dataNotes} selectedNoteId={undefined} />
        <div class="p-4 m-auto">
          <div class="
            p-8 bg-white
          border-8 border-dashed border-gray-600/25 rounded-lg
           ">
            <div class="space-y-4">
                <p class="text-4xl font-semibold text-sky-950/70 [text-wrap:balance] w-fit">Your Next Great Idea Starts Here</p>
                <Button onClick$={async () => {
                    await fetchPost()
                }}>
                    New note
                </Button>
            </div>

        </div>
        </div>
      </div>
    }

    return (
        <NotesContainer />
    )
});


