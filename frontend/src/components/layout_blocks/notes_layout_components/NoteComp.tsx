import { component$, useContext } from "@builder.io/qwik";
import { NotesLayoutContext } from "./NotesContext";
import { NotesLayoutAside } from "./SideBarNotes";
import { Button } from "~/components/ui/button/button";
import { Textarea } from "~/components/ui/textarea/textarea";
import { serverDeleteNote } from "~/routes/api/service";
import { useNavigate } from "@builder.io/qwik-city";
import { BsTrash } from "@qwikest/icons/bootstrap";

export const NotesContainer = component$(() => {
  const notesState = useContext(NotesLayoutContext);
  const navigate = useNavigate();
  if (!notesState.store) {
    return <div>Not found</div>;
  }
  // TODO: Add a loading state
  // TODO: Add a not found state
  // TODO: Add a error state
  // TODO: Add a success delete state
  // TODO: Add a success update state
  // TODO: Add a message before delete
  return (
    <div class="flex flex-grow gap-2">
      <NotesLayoutAside
        notes={notesState.dataNotes}
        selectedNoteId={notesState.location.params.id}
      />
      <section
        class={"flex flex-grow overflow-y-auto"}
        style={{ height: `${notesState.dashboardContext.value.height}px` }}
      >
        <div class="grid grid-cols-6 grid-rows-[auto,1fr] gap-4 p-4">
          <div class="col-span-full grid gap-2 lg:grid-cols-6">
            <Button
              class="sticky top-4 bg-sky-800"
              onClick$={() => notesState.store.toggleEdit()}
            >
              {notesState.store.textEdit()}
            </Button>
            <Button
              class="flex gap-2 bg-transparent text-pink-800 outline outline-pink-800 transition-all duration-300 ease-in-out hover:bg-pink-100"
              onClick$={async () => {
                const deleted = await serverDeleteNote(
                  notesState.store.selectedNote,
                );
                console.log(deleted);
                navigate("/dashboard/notes", { forceReload: true });
              }}
            >
              <BsTrash />
              <p>Delete</p>
            </Button>
          </div>

          <div class="col-span-6">
            {notesState.store.edit ? (
              <Textarea
                class="h-full"
                onInput$={(e, el) => notesState.store.updateContext(el.value)}
                value={notesState.store.content}
              ></Textarea>
            ) : (
              <div class="mb-4 rounded-md border px-4 py-4">
                <div
                  contentEditable="inherit"
                  class="prose"
                  dangerouslySetInnerHTML={notesState.store.parsedContent}
                ></div>
              </div>
            )}
          </div>
        </div>
      </section>
    </div>
  );
});
