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
      const result2 = await db.query<[null, Step[]]>(`
      LET $step = SELECT * FROM step WHERE unit = $unit AND section = $section ORDER BY section, unit, index;
      IF (array::len($step) > 0) THEN 
        $step
      ELSE
        INSERT INTO step $steps
      END;
      `, { unit: data.unit, section: data.section, steps });

      console.log(result2);
      // const result = await db.insert("step", steps);
      // console.log(result);
      await db.close();
  
      return {
        success: true,
        value: "Step added."
      };
    } catch (error) {
      if (error instanceof Error)
      return { success: false, error: error.message } 
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