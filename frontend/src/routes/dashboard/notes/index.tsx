import { component$ } from "@builder.io/qwik";
import { type RequestHandler } from "@builder.io/qwik-city";
import { NotesLayout } from "~/components/layout_blocks/notes_layout_components/notes";

export default component$(() => {
  return (
    <>
      <NotesLayout note={undefined} />
    </>
  );
});

// todo: update a notes
export const onPut: RequestHandler = async (requestEvent) => {
  console.log("edit", await requestEvent.parseBody());
};

export const factoryFetch = async (
  method: "DELETE" | "PUT" | "POST",
  id: string | undefined,
) => {
  const response = await fetch(`/dashboard/notes/`, {
    method: method,
    headers: {
      "Content-Type": "application/json",
    },
    redirect: "follow", // manual, *follow, error
    body: JSON.stringify({ id: id }),
  });
  return response;
};

export const fetchPut = async (id: string) => {
  return factoryFetch("PUT", id);
};
