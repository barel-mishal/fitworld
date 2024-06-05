import { server$ } from "@builder.io/qwik-city";
import { type ExtendSession } from "~/routes/plugin@auth";
import { serverInitDatabase } from "~/routes/seedDatabase";
import { serverUserSteps } from "./serviceUserSteps";

export const serverUserAddStep = server$(async function(data: {unit: number, section: number, index: number}) {
    const session: ExtendSession | null = this.sharedMap.get('session');
    const token = session?.database.token
    if (!token) throw new Error('No token');
    // nutrition unit, section, index
    const steps = serverUserSteps(data);
    const db = await serverInitDatabase();
    await db.authenticate(token);

    const step = (await steps).steps.at(3)!;
    const go = await db.create(step.metadata.type, step);
    console.log("GOOGLE", go);

    return {
      steps: (await steps).steps
    }
  }
);
