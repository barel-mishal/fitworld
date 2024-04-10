import { type RequestHandler } from '@builder.io/qwik-city';
import { serverNotes } from '~/routes/api/service';

export const onRequest: RequestHandler = async ({redirect}) => {
  const data = await serverNotes();
  data.notes = [...data.notes, { id: (data.notes.length + 1).toString(), title: "", text: "" }];
  throw redirect(302, `/dashboard/`);
}