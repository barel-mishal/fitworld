import { Resource, component$, useResource$ } from '@builder.io/qwik';
import { serverGetPublishNotes } from '../api/service';

export default component$(() => {
  const publicNotes = useResource$(async () => await serverGetPublishNotes()); 
  return (
    <div>
      <Resource value={publicNotes} onResolved={(val) => {
        return <div>{val.map(v => {
          return <div key={v.id}>{v.title}</div>;
        })}</div>;
      }} />
    </div>
  );
});
