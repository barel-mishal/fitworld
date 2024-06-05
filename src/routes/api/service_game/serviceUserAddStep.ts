import { server$ } from "@builder.io/qwik-city";
import { type ExtendSession } from "~/routes/plugin@auth";
import { serverInitDatabase } from "~/routes/seedDatabase";

export const serverUserAddStep = server$(async function(data: {step: number, userId: string}) {
    const session: ExtendSession | null = this.sharedMap.get('session');
    const token = session?.database.token
    if (!token) throw new Error('No token');
    const db = await serverInitDatabase();
    await db.authenticate(token);

    console.log(data);

    return {
      
    }
  }
);

