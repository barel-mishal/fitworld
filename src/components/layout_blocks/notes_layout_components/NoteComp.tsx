import { component$, useContext } from "@builder.io/qwik";
import { NotesLayoutContext } from "./NotesContext";
import { NotesLayoutAside } from "./SideBarNotes";
import { Button } from "~/components/ui/button/button";
import { Textarea } from "~/components/ui/textarea/textarea";
import { PublishModal } from "./PublishModal";
import { serverDeleteNote } from "~/routes/api/service";
import { useNavigate } from "@builder.io/qwik-city";

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
        <div class="flex gap-2 flex-grow  ">
            <NotesLayoutAside notes={notesState.dataNotes} selectedNoteId={notesState.location.params.id} />
        <section class={"flex overflow-y-auto flex-grow "} style={{height: `${notesState.dashboardContext.value.height}px`}}>
          <div class="grid grid-cols-6 p-4 gap-4 grid-rows-[auto,1fr]">
            <div class="grid lg:grid-cols-6 col-span-full gap-2">
                  <Button 
                  class="sticky top-4 bg-sky-800"
                  onClick$={() => notesState.store.toggleEdit()}>
                    {notesState.store.textEdit()}
                  </Button>
                  <Button 
                  class=""
                  onClick$={async () => {
                    const deleted = await serverDeleteNote(notesState.store.selectedNote);
                    console.log(deleted);
                    navigate("/dashboard/notes", {forceReload: true});
                  }}>Delete</Button>
                  
                  <PublishModal name={notesState.store.title} id={notesState.store.selectedNote} />

                  <p class="col-span-3 text-slate-500">Status draft</p>
            </div>
                
            <div class="col-span-6 ">
              {
              notesState.store.edit 
              ? 
              <Textarea 
              class="h-full" 
              onInput$={(e, el) => notesState.store.updateContext(el.value)} 
              value={notesState.store.content}></Textarea> 
              : 
              <div class="px-4 py-4 border mb-4 rounded-md ">
                <div 
                contentEditable='inherit' 
                class="prose " 
                dangerouslySetInnerHTML={notesState.store.parsedContent}>
                </div>
                </div>
              }</div>
              
  
          
          </div>
        </section>
      </div>
    )
});

