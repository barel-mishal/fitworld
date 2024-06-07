import { server$ } from "@builder.io/qwik-city";
import { type ExtendSession } from "~/routes/plugin@auth";
import { serverInitDatabase } from "~/routes/seedDatabase";
import { validateAndProcessJson } from "./types";
import {OpenAI} from "openai";
import { type StepText, serverPrompts } from "./serviceGPTPrompts";
import { sanitizeString } from "~/util/isTextOfUserName";


export const serverGPTCreateSteps = server$(
  async function(data: StepText) {
    const session: ExtendSession | null = this.sharedMap.get('session');
    const token = session?.database.token
    if (!token) throw new Error('No token');

    const openai = new OpenAI();

    const gpt = await serverPrompts(sanitizeString(session.user?.name || "User"), data)
    
    async function main() {
      const completion = await openai.chat.completions.create({
        messages: gpt.prompt,
        model: "gpt-4o-2024-05-13",
        max_tokens: 1100,
      });
      
      return completion;
    }


    
    try {
      const gptResponse = await main();
      
      const parsed = validateAndProcessJson(gptResponse.choices[0].message.content || "");

      return {
        steps: parsed?.steps,
        success: true,
      }
    } catch (error) {
      return {
        steps: [],
        success: false,
      }
    }
  });

export const serverUserAddStep = server$(async function(data: StepText) {
    const session: ExtendSession | null = this.sharedMap.get('session');
    const token = session?.database.token
    if (!token) throw new Error('No token');
    // nutrition unit, section, index
    const steps = await serverGPTCreateSteps(data);
    const db = await serverInitDatabase();
    await db.authenticate(token);

    return {
      steps: steps.steps
    }
  }
);