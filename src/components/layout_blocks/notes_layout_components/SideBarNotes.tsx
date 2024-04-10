import { Resource, type ResourceReturn, component$ } from "@builder.io/qwik";
import { type NoteProps } from "./NotesContext";
import { Link } from "@builder.io/qwik-city";

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
                                <Link class={["grid p-4 hover:bg-sky-100 transition-all duration-200 border border-sky-200", note.id === props.selectedNoteId && "bg-sky-100"]} href={`/dashboard/notes/${note.id}`}>{note.title}</Link>
                            </li>
                        )
                    });
                }}
            />

        </ul>
</aside>
})