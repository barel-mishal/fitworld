import { type RequestHandler } from "@builder.io/qwik-city";
import { serverNewNote } from "~/routes/api/service";

export const onRequest: RequestHandler = async ({ redirect }) => {
  const note = await serverNewNote();
  throw redirect(302, `/dashboard/notes/${note.note?.id}`);
};
