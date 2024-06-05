import { server$ } from "@builder.io/qwik-city";
import { type ExtendSession } from "~/routes/plugin@auth";
import { serverInitDatabase } from "~/routes/seedDatabase";
import { type Step } from "./types";
import {OpenAI} from "openai";


export const serverGPTCreateSteps = server$(async function(data: {unit: number, section: number, index: number}): Promise<{steps: Step[]}> {
    const session: ExtendSession | null = this.sharedMap.get('session');
    const token = session?.database.token
    if (!token) throw new Error('No token');

    const openai = new OpenAI();
    
    async function main() {
      const completion = await openai.chat.completions.create({
        messages: [{ role: "system", content: "You are a helpful assistant." }],
        model: "gpt-4o-2024-05-13",
      });
    
      console.log(completion.choices[0]);
    }
    
    main();
    const clientInput = `
    [
      {
        "id": "step:vn6hft42sjkmnuqmih9x",
        "index": 0,
        "metadata": {
          "text": "Understanding the basics of good nutrition can significantly boost your energy levels, improve your mental clarity, and promote long-term health. Scientific studies support these claims, providing a solid foundation for these benefits.",
          "title": "Introduction",
          "type": "step_text"
        },
        "section": 1,
        "unit": 1,
        "userId": "user:ge99ixouvnid5kl2pquo"
      },
      {
        "id": "step:wfv8qlc6x9r5r926owqz",
        "index": 1,
        "metadata": {
          "text": "Good nutrition is the foundation of a healthy life. It provides your body with the essential nutrients it needs to function correctly. By eating a balanced diet rich in fruits, vegetables, whole grains, and lean proteins, you can maintain a healthy weight, reduce the risk of chronic diseases, and feel more energetic throughout the day. According to a study published in the Journal of Nutrition, individuals who followed a balanced diet reported higher energy levels and overall well-being (Smith et al., 2020).\n    \n      Proper nutrition also impacts your mental health. Studies have shown that a diet high in processed foods can lead to feelings of fatigue and depression, whereas a diet rich in vitamins and minerals can enhance your mood and cognitive function. A study from the American Journal of Psychiatry found that participants who consumed a diet high in fruits, vegetables, and whole grains had a lower risk of depression compared to those with a diet high in processed foods (Jacka et al., 2017).\n      \n      Moreover, adopting healthy eating habits can have long-term benefits. Consuming a variety of nutrient-dense foods can strengthen your immune system, support healthy aging, and improve your overall quality of life. The New England Journal of Medicine published research showing that individuals who adhered to a Mediterranean diet had lower incidences of cardiovascular disease and improved longevity (Estruch et al., 2018).",
          "title": "Content",
          "type": "step_text"
        },
        "section": 1,
        "unit": 1,
        "userId": "user:ge99ixouvnid5kl2pquo"
      },
      {
        "id": "step:sn3jrbp1gtna2rk0p1ph",
        "index": 2,
        "metadata": {
          "text": "By focusing on nutrition, you’re investing in a healthier, happier future. Let’s dive into a few questions to help solidify your understanding of these benefits.",
          "title": "Conclusion",
          "type": "step_text"
        },
        "section": 1,
        "unit": 1,
        "userId": "user:ge99ixouvnid5kl2pquo"
      },
      {
        "id": "step:30o0aarapt45088k8oe0",
        "index": 3,
        "metadata": {
          "answer": 3,
          "correctAnswer": 3,
          "options": [
            "Improved mental clarity",
            "Boosted energy levels",
            "Promoted long-term health",
            "All of the above"
          ],
          "question": "What are the immediate benefits of understanding good nutrition?",
          "title": "Question 1",
          "type": "step_multiple_choice"
        },
        "section": 1,
        "unit": 1,
        "userId": "user:ge99ixouvnid5kl2pquo"
      },
      {
        "id": "step:36c83owtp51mw19toc9h",
        "index": 3,
        "metadata": {
          "correctAnswer": 3,
          "options": [
            "Improved mental clarity",
            "Boosted energy levels",
            "Promoted long-term health",
            "All of the above"
          ],
          "question": "What are the immediate benefits of understanding good nutrition?",
          "title": "Question 1",
          "type": "step_multiple_choice"
        },
        "section": 1,
        "unit": 1,
        "userId": "user:ge99ixouvnid5kl2pquo"
      },
      {
        "id": "step:np1191owtedvf886vk91",
        "index": 3,
        "metadata": {
          "correctAnswer": 3,
          "options": [
            "Improved mental clarity",
            "Boosted energy levels",
            "Promoted long-term health",
            "All of the above"
          ],
          "question": "What are the immediate benefits of understanding good nutrition?",
          "title": "Question 1",
          "type": "step_multiple_choice"
        },
        "section": 1,
        "unit": 1,
        "userId": "user:ge99ixouvnid5kl2pquo"
      },
      {
        "id": "step:mxbdo9pv5fdhyn8iya3a",
        "index": 4,
        "metadata": {
          "correctAnswer": 0,
          "options": [],
          "question": "",
          "title": "Question 2",
          "type": "step_multiple_choice"
        },
        "section": 1,
        "unit": 1,
        "userId": "user:ge99ixouvnid5kl2pquo"
      },
      {
        "id": "step:ny5eqb0733nkie20raaa",
        "index": 5,
        "metadata": {
          "type": "step_finish"
        },
        "section": 1,
        "unit": 1,
        "userId": "user:ge99ixouvnid5kl2pquo"
      }
    ]
    `

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



    // await db.insert("step", steps);

    return {
      steps: steps
    }
  }
);
