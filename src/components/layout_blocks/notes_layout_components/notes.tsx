import { component$, useContextProvider } from "@builder.io/qwik";
import { NotesLayoutContext, useNote } from "./NotesContext";
import { NotesLayoutAside } from "./SideBarNotes";
import { NotesContainer } from "./NoteComp";
import { Link } from "@builder.io/qwik-city";

export interface NoteProps {
  title: string;
  text: string;
  id: string;
}

export const NotesLayout = component$<{ note: NoteProps | undefined }>(
  (props) => {
    const notesState = useNote(props.note);
    useContextProvider(NotesLayoutContext, notesState);

    if (!notesState.store) {
      return (
        <div class="flex flex-grow gap-2">
          <NotesLayoutAside
            notes={notesState.dataNotes}
            selectedNoteId={undefined}
          />
          <div class="m-auto p-4">
            <div class="rounded-lg border-[6px] border-dashed border-gray-600/25 bg-white p-8">
              <div class="space-y-4">
                <p class="w-fit text-4xl font-semibold text-sky-950/70 [text-wrap:balance]">
                  Your Next Great Idea Starts Here
                </p>
                <Link href="/dashboard/notes/new">Save</Link>
              </div>
            </div>
          </div>
        </div>
      );
    }

    return <NotesContainer />;
  },
);
