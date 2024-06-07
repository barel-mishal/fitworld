import { server$ } from "@builder.io/qwik-city"
import type OpenAI from "openai"

export interface StepText {unit: number, section: number, index: number, step: number, titleSection: string}

export const serverPrompts = server$(async function(userName: string, data: StepText) {

    const prompt:  OpenAI.Chat.Completions.ChatCompletionMessageParam[] = [
        {role: "system", content: `
You are helpfull Edecational AI about nutrition and fitness. 
Your task is to create structured educational materailes called steps. 
Each step is part of a section, unit and step repsent also the difficulty 
level so each step will be harder then last and its jump from 1 to 6 where 6 is 
hardest level. In Each Section, You will have a title provided from 
whitch you will need to create a educational matirail to create the unit or step.

The return value should be an json format with the following schema:
StepText: {
type: 'step_text';
title: string;
text: string;
};

StepMultipleChoice: {
type: 'step_multiple_choice';
title: string;
question: string;
options: string[];
correctAnswer: number;
answer?: number;
};

StepFinish: {
type: 'step_finish';
};

Metadata: StepText | StepMultipleChoice | StepFinish;

Step: {
unit: number;
index: number;
section: number;
metadata: Metadata;
};

Example:
Input: Section 1, Unit 1, step 1 - The importance of nutrition:
Output as JSON format: {
{
    steps: [
  {
  "index": 0,
  "metadata": {
    "text": "Understanding the basics of good nutrition can significantly boost your energy levels, improve your mental clarity, and promote long-term health. Scientific studies support these claims, providing a solid foundation for these benefits.",
    "title": "Introduction",
    "type": "step_text"
  },
  "section": 1,
  "unit": 1,
},
{
  "index": 1,
  "metadata": {
    "text": "Good nutrition is the foundation of a healthy life. It provides your body with the essential nutrients it needs to function correctly. By eating a balanced diet rich in fruits, vegetables, whole grains, and lean proteins, you can maintain a healthy weight, reduce the risk of chronic diseases, and feel more energetic throughout the day. According to a study published in the Journal of Nutrition, individuals who followed a balanced diet reported higher energy levels and overall well-being (Smith et al., 2020).\n    \n      Proper nutrition also impacts your mental health. Studies have shown that a diet high in processed foods can lead to feelings of fatigue and depression, whereas a diet rich in vitamins and minerals can enhance your mood and cognitive function. A study from the American Journal of Psychiatry found that participants who consumed a diet high in fruits, vegetables, and whole grains had a lower risk of depression compared to those with a diet high in processed foods (Jacka et al., 2017).\n      \n      Moreover, adopting healthy eating habits can have long-term benefits. Consuming a variety of nutrient-dense foods can strengthen your immune system, support healthy aging, and improve your overall quality of life. The New England Journal of Medicine published research showing that individuals who adhered to a Mediterranean diet had lower incidences of cardiovascular disease and improved longevity (Estruch et al., 2018).",
    "title": "Content",
    "type": "step_text"
  },
  "section": 1,
  "unit": 1,
},
{
  "index": 2,
  "metadata": {
    "text": "By focusing on nutrition, you’re investing in a healthier, happier future. Let’s dive into a few questions to help solidify your understanding of these benefits.",
    "title": "Conclusion",
    "type": "step_text"
  },
  "section": 1,
  "unit": 1,
},
{
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
},
{
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
},
{
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
},
{
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
},
{
  "index": 5,
  "metadata": {
    "type": "step_finish"
  },
  "section": 1,
  "unit": 1,
}
]
}
`}, 
{role: "user", content: `
Input: Section ${data.section}, Unit ${data.unit} step ${data.step} - The importance of nutrition:: 
Output as JSON format:`, name: userName}]

    return {
        prompt
    }
})