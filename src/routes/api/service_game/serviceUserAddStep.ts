import { server$ } from "@builder.io/qwik-city";
import { type ExtendSession } from "~/routes/plugin@auth";
import { serverInitDatabase } from "~/routes/seedDatabase";
import { type Step } from "./types";


export const serverGPTCreateSteps = server$(async function(data: {unit: number, section: number, index: number}): Promise<{steps: Step[]}> {
    const session: ExtendSession | null = this.sharedMap.get('session');
    const token = session?.database.token
    if (!token) throw new Error('No token');

    const clientInput = `Hi`

    return {
      steps: [
        {
          userId: token,
          unit: data.unit,
          section: data.section,
          index: data.index,
          metadata: {
            type: 'step_text',
            title: 'step_text',
            text: clientInput,
          }
        }
      ]
    }
  });

export const serverUserAddStep = server$(async function(data: {unit: number, section: number, index: number}) {
    const session: ExtendSession | null = this.sharedMap.get('session');
    const token = session?.database.token
    if (!token) throw new Error('No token');
    // nutrition unit, section, index
    const steps = await serverGPTCreateSteps(data);
    const db = await serverInitDatabase();
    await db.authenticate(token);

    await db.insert("step", steps);

    return {
      steps: steps
    }
  }
);
