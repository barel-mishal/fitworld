import { server$ } from "@builder.io/qwik-city";
import { type ExtendSession } from "~/routes/plugin@auth";
import { serverInitDatabase } from "~/routes/seedDatabase";
import { type StepText } from "./serviceGPTPrompts";
import { serverGPTSTexts } from "./serviceGPTResult";
import { type Step } from "./types";

export const serverUserAddStep = server$(async function(data: Partial<StepText>) {
    const session: ExtendSession | null = this.sharedMap.get('session');
    const token = session?.database.token
    if (!token) throw new Error('No token');
    try {
      const steps = await serverGPTCreateSteps(data as StepText);
      const db = await serverInitDatabase();
      await db.authenticate(token);
      const result = await db.query<[null, Step[]]>(`
      LET $step = SELECT * FROM step WHERE unit = $unit AND section = $section ORDER BY section, unit, index;
      IF (array::len($step) > 0) THEN 
        $step
      ELSE
        INSERT INTO step $steps
      END;
      `, { unit: data.unit, section: data.section, steps });

      await db.close();
  
      return {
        success: true,
        value: result[1],
        error: null
      };
    } catch (error) {
      if (error instanceof Error)
      return { success: false, error: error.message, value: null } 
    }
  }
);

export const serverGPTCreateSteps = server$(
  async function(data: StepText) {
    const session: ExtendSession | null = this.sharedMap.get('session');
    const token = session?.database.token
    if (!token) throw new Error('No token');
    const gptResult = await serverGPTSTexts();
    return gptResult[data.unit === 1 ? "section 1 unit 1" : data.unit === 2 ? "section 1 unit 2" : "section 1 unit 3"]
});




export const serverGetUserStepsByIndex = server$(async function(data: {unit: number, section: number, index: number}) {
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

    return {
        step: updated
    }
  });
