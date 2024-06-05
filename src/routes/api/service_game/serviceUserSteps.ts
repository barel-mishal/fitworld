
import { server$ } from "@builder.io/qwik-city";
import { type ExtendSession } from "~/routes/plugin@auth";
import { type Step } from "./types";
import { serverInitDatabase } from "~/routes/seedDatabase";

export const serverUserSteps = server$(async function(data: {unit: number, section: number, index: number}) {
    const session: ExtendSession | null = this.sharedMap.get('session');
    const token = session?.database.token
    if (!token) throw new Error('No token');
    // nutrition unit, section, index
    const db = await serverInitDatabase();
    await db.authenticate(token);

    const steps = await db.query<Step[][]>("SELECT * FROM step WHERE (unit = $unit AND section = $section) ORDER BY index ASC;", {
        unit: data.unit,
        section: data.section
    });
    
    return {
      steps: steps[0]
    }
  }
);

export const serverUpdateUserStep = server$(async function(data: Step) {
    const session: ExtendSession | null = this.sharedMap.get('session');
    const token = session?.database.token
    if (!token) throw new Error('No token');
    // nutrition unit, section, index
    const db = await serverInitDatabase();
    await db.authenticate(token);

    const recordId = data.id;
    if (!recordId) throw new Error('No record id');

    const updated = await db.update(recordId, data);
    console.log("UPDATED", updated);

    return {
        step: updated
    }
  });
