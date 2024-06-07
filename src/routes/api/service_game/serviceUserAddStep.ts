import { server$ } from "@builder.io/qwik-city";
import { type ExtendSession } from "~/routes/plugin@auth";
import { serverInitDatabase } from "~/routes/seedDatabase";
import { type StepText } from "./serviceGPTPrompts";
import { serverGPTSTexts } from "./serviceGPTResult";

export const serverUserAddStep = server$(async function(data: StepText) {
    const session: ExtendSession | null = this.sharedMap.get('session');
    const token = session?.database.token
    if (!token) throw new Error('No token');
    const steps = await serverGPTCreateSteps(data);
    const db = await serverInitDatabase();
    await db.authenticate(token);

    await db.insert("steps", steps)

    return {};
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