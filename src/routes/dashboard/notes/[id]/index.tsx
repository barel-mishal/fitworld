import { Resource, component$, useResource$ } from '@builder.io/qwik';
import { useLocation, } from "@builder.io/qwik-city";
import { type NoteProps } from '~/components/layout_blocks/notes_layout_components/NotesContext';
import { NotesLayout } from '~/components/layout_blocks/notes_layout_components/notes';
import { serverGetNote } from '~/routes/api/service';

export default component$(() => {
  const location = useLocation();
  const note = useResource$<NoteProps | undefined>(async ({track}) => {
    const id = track(() => location.params.id);
    return await serverGetNote(id);
  });

  return (
    <Resource 
      value={note} 
      onResolved={(note) => {
      if (!note) return <NotesLayout note={{id: "", text: "Not Found", title: ""}} />;
      return <NotesLayout note={note} />}} 
      onPending={() => <NotesLayout note={{id: "", text: "", title: ""}} />} 
    />
  );
});