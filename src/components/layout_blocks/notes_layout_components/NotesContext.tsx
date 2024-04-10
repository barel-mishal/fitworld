import { $, createContextId, useContext, useResource$, useStore } from "@builder.io/qwik";

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


