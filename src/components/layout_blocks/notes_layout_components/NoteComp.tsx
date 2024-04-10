import { component$, useContext } from "@builder.io/qwik";
import { NotesLayoutContext } from "./NotesContext";
import { NotesLayoutAside } from "./SideBarNotes";
import { Button } from "~/components/ui/button/button";
import { fetchDelete, fetchPut } from "~/routes/dashboard/notes";
import { Textarea } from "~/components/ui/textarea/textarea";

export const NotesContainer = component$(() => {
    const notesState = useContext(NotesLayoutContext);
    if (!notesState.store) {
        return <div>Not found</div>;
    }
    return (
        <div class="flex gap-2 flex-grow  ">
            <NotesLayoutAside notes={notesState.dataNotes} selectedNoteId={notesState.location.params.id} />
        <section class={"flex overflow-y-auto flex-grow justify-center"} style={{height: `${notesState.dashboardContext.value.height}px`}}>
          <div class="grid grid-cols-6 p-4 gap-4 grid-rows-[auto,1fr]">
                <Button 
                class=""
                onClick$={() => notesState.store.toggleEdit()}>
                  {notesState.store.textEdit()}
                </Button>
                <Button onClick$={async () => {
                  await fetchDelete("1")
                }}>Delete</Button>
                
                <Button onClick$={async () => {
                  await fetchPut("1")
                }}>Edit</Button>
                
            <div class="col-span-6">
              {notesState.store.edit ? <Textarea class="h-full" onInput$={(e, el) => notesState.store.updateContext(el.value)} value={notesState.store.content}></Textarea> : 
              <div 
              contentEditable='inherit' class="prose max-w-[600px] px-14 py-12 border" dangerouslySetInnerHTML={notesState.parsedMarkdown} ></div>}
            </div>
  
          
          </div>
        </section>
      </div>
    )
});