import { $, createContextId, useContext, useResource$, useStore, useVisibleTask$ } from "@builder.io/qwik";

import { contextDashboard } from "../dashboard_layout_components/dashboard";
import { serverNotes } from "~/routes/api/service";
import { useLocation } from "@builder.io/qwik-city";
import { parseMarkdown } from "~/util/parseMarkdown";

export interface NoteProps {
    title: string;
    text: string;
    id: string;
}


export const useNote = <T extends NoteProps | undefined,>(note: T) => {
  const dashboardContext = useContext(contextDashboard);
  const location = useLocation();


    const dataNotes = useResource$<{notes: NoteProps[]}>(async () => await serverNotes());
    if (!note) {
        return {
            dataNotes,
            store: undefined,
            parsedMarkdown: "",
            dashboardContext,
            location
        } as const;
    }

    const store = useStore({
        content: note.text, 
        parsedContent: "",
        title: note.title,
        edit: false, 
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
        parseMarkdown: $(function (this: {content: string, parsedContent: string}) {
          const parsedMarkdown = parseMarkdown(this.content);
          this.parsedContent = parsedMarkdown;
        })
      });

      // eslint-disable-next-line qwik/no-use-visible-task
      useVisibleTask$(async ({track}) => {
        track(() => store.content);
        await store.parseMarkdown();
      })

    return {
        dataNotes,
        store,
        dashboardContext,
        location
    } as const;
}

export type NotesLayoutContextType = ReturnType<typeof useNote> ;

export const NotesLayoutContext = createContextId<NotesLayoutContextType>("NotesLayoutContext");


