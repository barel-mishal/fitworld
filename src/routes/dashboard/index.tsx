import { component$ } from '@builder.io/qwik';
import { useAuthSession } from '../plugin@auth';
import { server$ } from '@builder.io/qwik-city';
import { Button } from '~/components/ui/button/button';
import Surreal from "surrealdb.js";

export const serverLoader = server$(async function() {
  const sc = this.sharedMap.get("session");
  if (!sc) {
    throw new Error("Session not found");
  }
  try {
    const db = new Surreal();
    await db.connect("http://0.0.0.0:8000/rpc");
    await db.signin({
      username: "root",
      password: "root",
      database: "database",
      namespace: "namespace",
    });
    await db.use({ namespace: "namespace", database: "database" });
    await db.create("account", { name: "something" })
    const data = await db.query_raw<[{name: string, id: string}]>(`select * from account;`);
    await db.close();
    if (data[0].status === "OK") 
    return data[0].result

  
  } catch (error: any) {
    console.error({error});
  }

  return {
    data: "server data"
  };
});

export default component$(() => {
  const sc = useAuthSession();
  
  return (
    <div class="">
      {sc.value?.user?.name}
      <Button onClick$={async () => {
        // const data = await serverLoader();
        // console.log(data);        
      }}>home</Button>
    </div>
  );
});
