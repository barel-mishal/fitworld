import { Resource, component$, useResource$} from '@builder.io/qwik';
import { useLocation, } from "@builder.io/qwik-city";
import { type NoteProps, NotesLayout } from '~/components/layout_blocks/notes_layout_components/notes';
import { serverGetNote } from '~/routes/api/service';

export default component$(() => {
  const location = useLocation();
  const note = useResource$<NoteProps | undefined>(async () => {
    return await serverGetNote(location.params.id);
  });

  return (
    <Resource 
      value={note} 
      onResolved={(note) => {
      return <NotesLayout note={note} />}} 
      onPending={() => <div>Loading...</div>} 
    />
  );
});