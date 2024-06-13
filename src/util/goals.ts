
export const fitnessWellnessNutritionGoals: string[] = [
    // Fitness Goals
    "Run a 5K: Train to complete a 5-kilometer run within 30 minutes.",
    "Strength Training: Perform strength training exercises at least 3 times a week.",
    "Flexibility: Improve flexibility by incorporating daily stretching routines.",
    "Increase Muscle Mass: Gain 5 pounds of muscle over the next 3 months.",
    "Cardiovascular Health: Engage in 150 minutes of moderate aerobic activity per week.",
    "Yoga Practice: Attend a yoga class twice a week for mental and physical benefits.",
    "Core Strength: Perform core strengthening exercises every other day.",
    "HIIT Workouts: Incorporate high-intensity interval training (HIIT) twice a week.",
    "Daily Steps: Aim for 10,000 steps per day.",
    "Rest and Recovery: Ensure at least one rest day per week to prevent injury and promote recovery.",
  
    // Wellness Goals
    "Mental Health: Practice mindfulness or meditation for 10 minutes daily.",
    "Sleep Quality: Improve sleep hygiene to achieve 7-8 hours of quality sleep each night.",
    "Hydration: Drink at least 8 glasses (64 ounces) of water daily.",
    "Stress Management: Identify stressors and practice stress management techniques such as deep breathing or journaling.",
    "Work-Life Balance: Set boundaries to achieve a better work-life balance, such as not checking work emails after 7 PM.",
    "Self-Care: Schedule one self-care activity each week, such as a massage or a relaxing bath.",
    "Social Connections: Spend quality time with friends or family at least once a week.",
    "Digital Detox: Have a no-screen time for one hour before bed.",
    "Personal Development: Read one self-improvement book each month.",
    "Positive Affirmations: Start each day with three positive affirmations.",
  
    // Nutrition Goals
    "Balanced Diet: Eat a balanced diet that includes all food groups daily.",
    "Portion Control: Practice portion control by using smaller plates and mindful eating techniques.",
    "Vegetable Intake: Include at least 5 servings of vegetables in your daily diet.",
    "Fruit Intake: Consume at least 2 servings of fruit each day.",
    "Reduce Sugar: Limit added sugars to less than 10% of your daily caloric intake.",
    "Whole Grains: Replace refined grains with whole grains in meals.",
    "Protein Sources: Incorporate a variety of protein sources such as lean meats, beans, and legumes.",
    "Healthy Fats: Include healthy fats like avocados, nuts, and olive oil in your diet.",
    "Meal Planning: Plan and prep your meals weekly to ensure healthy eating.",
    "Mindful Eating: Practice mindful eating by paying attention to hunger and fullness cues and eating without distractions."
  ];
  
  // Strongly typed function to get 3 random goals
  export function getRandomGoals(goals: string[], count: number): string[] {
    if (count > goals.length) {
      throw new Error("Count exceeds the number of available goals.");
    }
  
    const shuffled = [...goals].sort(() => 0.5 - Math.random());
    return shuffled.slice(0, count);
  }
  