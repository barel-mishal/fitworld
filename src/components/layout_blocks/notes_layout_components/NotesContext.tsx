import { $, createContextId, useContext, useResource$, useStore } from "@builder.io/qwik";

import { contextDashboard } from "../dashboard_layout_components/dashboard";
import { marked } from "marked";
import DOMPurify from "isomorphic-dompurify";
import { serverNotes } from "~/routes/api/service";
import { useLocation } from "@builder.io/qwik-city";

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
          
      const parsedMarkdown = () => {
        const parsedMarkdown = marked.parse(store.content) as string;
        const sanitisedMarkdown = DOMPurify.sanitize(parsedMarkdown);
        return sanitisedMarkdown;
      }

    return {
        dataNotes,
        store,
        parsedMarkdown: parsedMarkdown(),
        dashboardContext,
        location
    } as const;
}

export type NotesLayoutContextType = ReturnType<typeof useNote> ;

export const NotesLayoutContext = createContextId<NotesLayoutContextType>("NotesLayoutContext");

