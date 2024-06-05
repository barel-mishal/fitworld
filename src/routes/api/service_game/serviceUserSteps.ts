
import { server$ } from "@builder.io/qwik-city";
import { type ExtendSession } from "~/routes/plugin@auth";
import { type Step } from "./types";

export const serverUserSteps = server$(async function(data: {unit: number, section: number, index: number}) {
    const session: ExtendSession | null = this.sharedMap.get('session');
    const token = session?.database.token
    if (!token) throw new Error('No token');
    // nutrition unit, section, index
    const questions = {
      q1: {
        type: "step_multiple_choice",
        question: "What are the immediate benefits of understanding good nutrition?",
        options: ["Improved mental clarity", "Boosted energy levels", "Promoted long-term health", "All of the above"],
        correctAnswer: 3,
        answer: undefined as number | undefined
      }
    };
    
    const stepsData = {
      intro: "Understanding the basics of good nutrition can significantly boost your energy levels, improve your mental clarity, and promote long-term health. Scientific studies support these claims, providing a solid foundation for these benefits.",
      content: `Good nutrition is the foundation of a healthy life. It provides your body with the essential nutrients it needs to function correctly. By eating a balanced diet rich in fruits, vegetables, whole grains, and lean proteins, you can maintain a healthy weight, reduce the risk of chronic diseases, and feel more energetic throughout the day. According to a study published in the Journal of Nutrition, individuals who followed a balanced diet reported higher energy levels and overall well-being (Smith et al., 2020).
    
      Proper nutrition also impacts your mental health. Studies have shown that a diet high in processed foods can lead to feelings of fatigue and depression, whereas a diet rich in vitamins and minerals can enhance your mood and cognitive function. A study from the American Journal of Psychiatry found that participants who consumed a diet high in fruits, vegetables, and whole grains had a lower risk of depression compared to those with a diet high in processed foods (Jacka et al., 2017).
      
      Moreover, adopting healthy eating habits can have long-term benefits. Consuming a variety of nutrient-dense foods can strengthen your immune system, support healthy aging, and improve your overall quality of life. The New England Journal of Medicine published research showing that individuals who adhered to a Mediterranean diet had lower incidences of cardiovascular disease and improved longevity (Estruch et al., 2018).`,
      conclusion: "By focusing on nutrition, you’re investing in a healthier, happier future. Let’s dive into a few questions to help solidify your understanding of these benefits."
    };
  
    const steps: Step[] = [
      {
        index: 0,
        section: data.section,
        unit: data.unit,
        userId: "default-user-id",
        metadata: {
            title: "Introduction",
            text: stepsData.intro,
            type: "step_text"
        }
      },
      {
        index: 1,
        section: data.section,
        unit: data.unit,
        metadata: {
            title: "Content",
            type: "step_text",
            text: stepsData.content,
        },
        userId: "default-user-id",
      },
      {
        index: 2,
        section: data.section,
        unit: data.unit,
        userId: "default-user-id",
        metadata: {
            title: "Conclusion",
            type: "step_text",
            text: stepsData.conclusion,
        }
      },
      {
        index: 3,
        section: data.section,
        unit: data.unit,
        userId: "default-user-id",
        metadata: {
            title: "Question 1",
            type: "step_multiple_choice",
            question: questions.q1.question,
            options: questions.q1.options,
            correctAnswer: questions.q1.correctAnswer,
            answer: questions.q1.answer,
        }
      },
      {
        index: 4,
        section: data.section,
        unit: data.unit,
        userId: "default-user-id",
        metadata: {
            title: "Question 2",
            type: "step_multiple_choice",
            question: "", // Placeholder for another question if needed
            options: [],
            correctAnswer: 0,
            answer: undefined,
        }
      },
      {
        index: 5,
        section: data.section,
        unit: data.unit,
        userId: "default-user-id",
        metadata:  {
            type: "step_finish"
        }
      }
    ];

    console.log("data", data);

    return {
      steps
    }
  }
);
