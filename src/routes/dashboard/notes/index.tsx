import { $, component$, useContext, useStore } from '@builder.io/qwik';
import { Link, type RequestHandler, } from "@builder.io/qwik-city";
import DOMPurify from "isomorphic-dompurify";
import { marked } from "marked";
import { contextDashboard } from '~/components/layout_blocks/dashboard_layout_components/dashboard';
import { Button } from '~/components/ui/button/button';
import { Textarea } from '~/components/ui/textarea/textarea';

export default component$(() => {
  const store = useStore({
    content: "", 
    edit: true, 
    textEdit: $(function (this: {edit: boolean}) {
      return this.edit ? "Preview" : "Edit";
    }),
    toggleEdit: $(function (this: {edit: boolean}) {
      this.edit = !this.edit;
    })
  });
  
  const dashboardContext = useContext(contextDashboard);

  const parsedMarkdown = () => {
    const parsedMarkdown = marked.parse(store.content) as string;
    const sanitisedMarkdown = DOMPurify.sanitize(parsedMarkdown);
    return sanitisedMarkdown;
  }
  return (
    <div class="flex gap-2  ">
      <aside class="w-[200px] border-r p-4 gap-6 flex flex-col">
        <h1 class="font-bold text-3xl">Notes</h1>
        <ul class="grid gap-1">
          <li><Link class={[
            "grid p-2 hover:bg-sky-100 bg-sky-100 transition-all duration-200 rounded-md border border-sky-100"
          ]} href="/dashboard">Dashboard</Link></li>
          <li><Link class={[
            "grid p-2 hover:bg-sky-100 transition-all duration-200 rounded-md border border-sky-100"
          ]} href="/dashboard">Dashboard</Link></li>
          <li><Link class={[
            "grid p-2 hover:bg-sky-100 transition-all duration-200 rounded-md border border-sky-100"
          ]} href="/dashboard">Dashboard</Link></li>
          <li><Link class={[
            "grid p-2 hover:bg-sky-100 transition-all duration-200 rounded-md border border-sky-100"
          ]} href="/dashboard">Dashboard</Link></li>
        </ul>
      </aside>
      <section class={"flex overflow-y-auto flex-grow justify-center"} style={{height: `${dashboardContext.value.height}px`}}>
        <div class="">
          {store.edit ? <Textarea onInput$={(e, el) => store.content = el.value}></Textarea> : 
          <div 
          contentEditable='inherit' class="prose max-w-[600px] px-14 py-12 border" 
          dangerouslySetInnerHTML={parsedMarkdown()} ></div>}

          <Button onClick$={() => store.toggleEdit()}>{store.textEdit()}</Button>
          <Button onClick$={async () => {
            await fetchDelete("1")
          }}>Delete</Button>
          <Button onClick$={async () => {
            await fetchPut("1")
          }}>Edit</Button>
          <Button onClick$={async () => {
            await fetchPost("1")
          }}>Save</Button>
        </div>
      </section>
    </div>
  );
});

// todo: delete a notes
export const onDelete: RequestHandler = async (requestEvent) => {
  console.log("delete", await requestEvent.parseBody())

}

// todo: edit a notes
export const onPut: RequestHandler = async (requestEvent) => { 
  console.log("edit", await requestEvent.parseBody())

  
}

 // todo: update a notes
 export const onPost: RequestHandler = async (requestEvent) => { 
  console.log("update", await requestEvent.parseBody())
   
}

export const fetchDelete = async (id: string) => {
  const response = await fetch(`/dashboard/notes/`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({id})
  });
  return response.text();
};

export const fetchPut = async (id: string) => {
  const response = await fetch(`/dashboard/notes/`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({id})
  });
  return response.json()
};

export const fetchPost = async (id: string) => {
  const response = await fetch(`/dashboard/notes/`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({id})
  });
  return response.json()
};
  
  // todo: view a note
// todo: create a new note



