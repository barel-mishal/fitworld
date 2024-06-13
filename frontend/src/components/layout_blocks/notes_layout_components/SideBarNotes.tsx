import { Resource, type ResourceReturn, component$ } from "@builder.io/qwik";
import { type NoteProps } from "./NotesContext";
import { Link } from "@builder.io/qwik-city";
import { BsPlusLg } from "@qwikest/icons/bootstrap";

export const NotesLayoutAside = component$<{
  notes: ResourceReturn<{ notes: NoteProps[] }>;
  selectedNoteId: string | undefined;
}>((props) => {
  return (
    <aside class="flex w-[200px] flex-col gap-6 border-r p-4">
      <h1 class="flex items-center justify-between gap-2 text-3xl font-bold">
        <p>Notes</p>
        <Link href="/dashboard/notes/new" class="rounded-full bg-sky-800 p-2">
          <BsPlusLg
            class="h-4 w-4 fill-sky-50"
            style={{ fill: "#f0f9ff", height: "1rem", width: "1rem" }}
          />
        </Link>
      </h1>
      <ul class="grid gap-1">
        <Resource
          value={props.notes}
          onResolved={(notes) => {
            return notes.notes.map((note) => {
              return (
                <li
                  class="overflow-hidden rounded-md text-sky-900"
                  key={note.id}
                >
                  <Link
                    class={[
                      "grid border border-sky-200 p-4 transition-all duration-200 hover:bg-sky-100",
                      note.id === props.selectedNoteId && "bg-sky-100",
                    ]}
                    href={`/dashboard/notes/${note.id}`}
                  >
                    {note.title}
                  </Link>
                </li>
              );
            });
          }}
        />
      </ul>
    </aside>
  );
});
