import { $, Resource, type ResourceReturn, component$, createContextId, useContext, useResource$, useStore, useContextProvider } from "@builder.io/qwik";
import { Link, useLocation } from "@builder.io/qwik-city";
import { Button } from "~/components/ui/button/button";
import { Textarea } from "~/components/ui/textarea/textarea";
import { fetchDelete, fetchPost, fetchPut } from "~/routes/dashboard/notes";
import { contextDashboard } from "../dashboard_layout_components/dashboard";
import { marked } from "marked";
import DOMPurify from "isomorphic-dompurify";
import { serverNotes } from "~/routes/api/service";

export interface NoteProps {
    title: string;
    text: string;
    id: string;
}


export const useNote = (note: NoteProps) => {
    const dataNotes = useResource$<{notes: NoteProps[]}>(async () => await serverNotes());

    const store = useStore({
        content: note.text, 
        edit: true, 
        selectedNote: note.id,
        textEdit: $(function (this: {edit: boolean}) {
          return this.edit ? "Preview" : "Edit";
        }),
        toggleEdit: $(function (this: {edit: boolean}) {
          this.edit = !this.edit;
        }),
        updateContext: $(function (this: {content: string}, newContent: string) {
            this.content = newContent;
        }),
      });
      
      const dashboardContext = useContext(contextDashboard);
    
      const parsedMarkdown = () => {
        const parsedMarkdown = marked.parse(store.content) as string;
        const sanitisedMarkdown = DOMPurify.sanitize(parsedMarkdown);
        return sanitisedMarkdown;
      }

    return {
        dataNotes,
        store,
        parsedMarkdown: parsedMarkdown(),
        dashboardContext
    }
}

export type NotesLayoutContextType = ReturnType<typeof useNote>;

export const NotesLayoutContext = createContextId<NotesLayoutContextType>("NotesLayoutContext");



export const NotesLayout = component$<{note: NoteProps}>((props) => {
    const location = useLocation();

    const dataNotes = useResource$<{notes: NoteProps[]}>(async () => await serverNotes());

    const notesState = useNote(props.note);

    useContextProvider(NotesLayoutContext, notesState);

    return (
        <div class="flex gap-2  ">
            <NotesLayoutAside notes={dataNotes} selectedNoteId={location.params.id} />
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

export const NotesLayoutAside = component$<{
    notes: ResourceReturn<{notes: NoteProps[]}>,
    selectedNoteId: string | undefined
}>((props) => {
    return <aside class="w-[200px] border-r p-4 gap-6 flex flex-col">
            <h1 class="font-bold text-3xl">Notes</h1>
            <ul class="grid gap-1">

            <Resource 
                value={props.notes}
                onResolved={(notes) => {
                    return notes.notes.map((note) => {
                        return (
                            <li class="rounded-md text-sky-900 overflow-hidden" key={note.id}>
                                <Link class={["grid p-4 hover:bg-sky-100 transition-all duration-200 border border-sky-200", note.id === props.selectedNoteId && "bg-sky-100"]} href={`/dashboard/notes/${note.id}`}>{note.text}</Link>
                            </li>
                        )
                    });
                }}
            />

        </ul>
</aside>
})