import { server$ } from "@builder.io/qwik-city";

export const serverGPTSTexts = server$(async function() {


    return {
        "section 1 unit 1": [
            {
                userId: 'default-user-id',
                unit: 1,
                index: 1,
                section: 1,
                metadata: {
                    type: 'step_text',
                    title: 'Understanding Basic Nutritional Needs',
                    text: 'Nutrition plays a vital role in our overall health and well-being. To maintain a healthy lifestyle, it is essential to understand the basic nutritional needs of our body. This article explores the fundamentals of macronutrients, the importance of micronutrients, and the recommended daily nutritional requirements.'
                }
            },
            {
                userId: 'default-user-id',
                unit: 1,
                index: 2,
                section: 1,
                metadata: {
                    type: 'step_text',
                    title: 'Overview of Macronutrients (Carbohydrates, Proteins, Fats)',
                    text: 'Macronutrients are nutrients that our bodies require in large amounts to provide energy and support various bodily functions. The three primary macronutrients are carbohydrates, proteins, and fats.'
                }
            },
            {
                userId: 'default-user-id',
                unit: 1,
                index: 3,
                section: 1,
                metadata: {
                    type: 'step_text',
                    title: 'Carbohydrates',
                    text: 'Carbohydrates are the body\'s main source of energy. They are classified into two types: simple and complex. Simple carbohydrates, or sugars, are found in foods like fruits and candies, providing quick energy. Complex carbohydrates, such as those found in bread, pasta, and vegetables, offer sustained energy. Examples of carbohydrate-rich foods include bread, pasta, fruits, and vegetables.'
                }
            },
            {
                userId: 'default-user-id',
                unit: 1,
                index: 4,
                section: 1,
                metadata: {
                    type: 'step_text',
                    title: 'Proteins',
                    text: 'Proteins are essential for the growth, repair, and maintenance of body tissues. They are composed of amino acids, which are the building blocks of proteins. Foods high in protein include meat, fish, eggs, beans, and nuts. Proteins play a crucial role in muscle development, immune function, and the production of enzymes and hormones.'
                }
            },
            {
                userId: 'default-user-id',
                unit: 1,
                index: 5,
                section: 1,
                metadata: {
                    type: 'step_text',
                    title: 'Fats',
                    text: 'Fats provide a concentrated source of energy, support cell growth, protect organs, and help keep the body warm. There are different types of fats: saturated, unsaturated, and trans fats. Saturated fats are typically found in animal products, while unsaturated fats are present in plant-based oils, nuts, and seeds. Trans fats are often found in processed foods. Examples of healthy fat sources include butter, oils, nuts, seeds, and avocados.'
                }
            },
            {
                userId: 'default-user-id',
                unit: 1,
                index: 6,
                section: 2,
                metadata: {
                    type: 'step_text',
                    title: 'Importance of Micronutrients (Vitamins and Minerals)',
                    text: 'Micronutrients are nutrients required in smaller amounts compared to macronutrients, but they are crucial for proper body functioning. They include vitamins and minerals, each playing specific roles in maintaining health.'
                }
            },
            {
                userId: 'default-user-id',
                unit: 1,
                index: 7,
                section: 2,
                metadata: {
                    type: 'step_text',
                    title: 'Vitamins',
                    text: 'Vitamins are organic compounds that support various bodily functions, including immune function, energy production, and blood clotting. They are categorized into two types: water-soluble and fat-soluble. Water-soluble vitamins, such as Vitamin C and B-complex vitamins, dissolve in water and are not stored in the body. Fat-soluble vitamins, including Vitamins A, D, E, and K, are stored in the body\'s fatty tissues. Fruits, vegetables, and dairy products are excellent sources of vitamins.'
                }
            },
            {
                userId: 'default-user-id',
                unit: 1,
                index: 8,
                section: 2,
                metadata: {
                    type: 'step_text',
                    title: 'Minerals',
                    text: 'Minerals are inorganic elements that are vital for bone health, fluid balance, and muscle function. Major minerals, like calcium and potassium, are needed in larger amounts, while trace minerals, such as iron and zinc, are required in smaller quantities. Dairy products, meat, nuts, and grains are rich sources of minerals.'
                }
            },
            {
                userId: 'default-user-id',
                unit: 1,
                index: 9,
                section: 3,
                metadata: {
                    type: 'step_text',
                    title: 'Daily Nutritional Requirements',
                    text: 'To meet the body\'s nutritional needs, it is important to consume the right amounts of macronutrients and micronutrients daily. The recommended daily intake varies based on age, sex, and activity level.'
                }
            },
            {
                userId: 'default-user-id',
                unit: 1,
                index: 10,
                section: 3,
                metadata: {
                    type: 'step_text',
                    title: 'Dietary Reference Intakes (DRIs)',
                    text: 'DRIs are a set of values used to plan and assess nutrient intakes. They include the Recommended Dietary Allowance (RDA), which indicates the average daily intake level sufficient to meet the nutrient requirements of nearly all healthy individuals, and the Adequate Intake (AI), used when RDA cannot be determined.'
                }
            },
            {
                userId: 'default-user-id',
                unit: 1,
                index: 11,
                section: 3,
                metadata: {
                    type: 'step_text',
                    title: 'Balanced Diet',
                    text: 'A balanced diet incorporates a variety of foods to ensure the body receives all necessary nutrients. Emphasis should be placed on portion control and consuming nutrient-dense foods. A balanced diet includes a mix of carbohydrates, proteins, fats, vitamins, and minerals to maintain optimal health.'
                }
            },
            {
                userId: 'default-user-id',
                unit: 1,
                index: 12,
                section: 4,
                metadata: {
                    type: 'step_multiple_choice',
                    title: 'Question 1',
                    question: 'Which macronutrient is the primary source of energy for the body?',
                    options: ['Proteins', 'Fats', 'Carbohydrates', 'Vitamins'],
                    correctAnswer: 2,
                    answer: undefined
                }
            },
            {
                userId: 'default-user-id',
                unit: 1,
                index: 13,
                section: 4,
                metadata: {
                    type: 'step_multiple_choice',
                    title: 'Question 2',
                    question: 'Which of the following is a fat-soluble vitamin?',
                    options: ['Vitamin C', 'Vitamin B12', 'Vitamin D', 'Vitamin B6'],
                    correctAnswer: 2,
                    answer: undefined
                }
            },
            {
                userId: 'default-user-id',
                unit: 1,
                index: 14,
                section: 4,
                metadata: {
                    type: 'step_multiple_choice',
                    title: 'Question 3',
                    question: 'What is the main role of proteins in the body?',
                    options: ['Providing energy', 'Supporting cell growth and repair', 'Maintaining fluid balance', 'Enhancing blood clotting'],
                    correctAnswer: 1,
                    answer: undefined
                }
            },
            {
                userId: 'default-user-id',
                unit: 1,
                index: 15,
                section: 4,
                metadata: {
                    type: 'step_multiple_choice',
                    title: 'Question 4',
                    question: 'Which type of nutrient is required in smaller amounts but is crucial for body functions like immune support and bone health?',
                    options: ['Macronutrients', 'Carbohydrates', 'Micronutrients', 'Proteins'],
                    correctAnswer: 2,
                    answer: undefined
                }
            },
            {
                userId: 'default-user-id',
                unit: 1,
                index: 16,
                section: 5,
                metadata: {
                    type: 'step_finish',
                }
            },
        ],
        "section 1 unit 2": [
            {
                userId: 'default-user-id',
                unit: 2,
                index: 1,
                section: 1,
                metadata: {
                    type: 'step_text',
                    title: 'The Role of Balanced Diets in Health',
                    text: 'A balanced diet is essential for maintaining overall health and well-being. It provides the body with the necessary nutrients to function optimally and helps prevent various health issues. This article explores the benefits of a balanced diet, the impact of diet on energy levels and mental clarity, and the relationship between diet and chronic diseases.'
                }
            },
            {
                userId: 'default-user-id',
                unit: 2,
                index: 2,
                section: 1,
                metadata: {
                    type: 'step_text',
                    title: 'Benefits of a Balanced Diet',
                    text: 'A balanced diet offers numerous benefits, including: Improved physical health, Enhanced mental clarity and focus, Reduced risk of chronic diseases, Better weight management.'
                }
            },
            {
                userId: 'default-user-id',
                unit: 2,
                index: 3,
                section: 1,
                metadata: {
                    type: 'step_text',
                    title: 'Impact of Diet on Energy Levels and Mental Clarity',
                    text: 'Your diet significantly influences your energy levels and mental clarity. Here\'s how: Macronutrients and Energy Production: Carbohydrates, proteins, and fats are the primary sources of energy for the body. Carbohydrates are the body\'s preferred energy source, while proteins and fats provide sustained energy and support various bodily functions. Vitamins and Minerals in Cognitive Function: Micronutrients like B vitamins, iron, and magnesium play crucial roles in brain function. They help produce neurotransmitters, support nerve health, and maintain cognitive performance. Hydration for Energy and Mental Performance: Staying hydrated is essential for maintaining energy levels and cognitive function. Dehydration can lead to fatigue, difficulty concentrating, and impaired mental performance.'
                }
            },
            {
                userId: 'default-user-id',
                unit: 2,
                index: 4,
                section: 1,
                metadata: {
                    type: 'step_text',
                    title: 'Relationship Between Diet and Chronic Diseases',
                    text: 'A balanced diet is a key factor in preventing and managing chronic diseases. Here\'s how diet affects some common conditions: Heart Disease: Diets high in saturated fats, trans fats, and cholesterol can increase the risk of heart disease. Conversely, diets rich in fruits, vegetables, whole grains, and healthy fats can lower this risk by improving cholesterol levels and reducing inflammation. Type 2 Diabetes: High intake of processed sugars and refined carbohydrates can lead to insulin resistance and type 2 diabetes. A balanced diet that includes complex carbohydrates, fiber, and healthy fats can help regulate blood sugar levels and reduce the risk of diabetes. Cancer Prevention: Certain dietary patterns, such as high consumption of red and processed meats, have been linked to an increased risk of cancer. Diets rich in antioxidants, fiber, and phytonutrients from fruits, vegetables, and whole grains can help protect against cancer. Hypertension: High sodium intake is a major contributor to hypertension (high blood pressure). A balanced diet that emphasizes potassium-rich foods, such as fruits and vegetables, and limits sodium can help manage and prevent hypertension.'
                }
            },
            {
                userId: 'default-user-id',
                unit: 2,
                index: 5,
                section: 1,
                metadata: {
                    type: 'step_multiple_choice',
                    title: 'Quiz Question 1',
                    question: 'What is one of the benefits of a balanced diet?',
                    options: ['Improved physical health', 'Increased stress levels', 'Decreased energy levels', 'Higher risk of chronic diseases'],
                    correctAnswer: 0
                }
            },
            {
                userId: 'default-user-id',
                unit: 2,
                index: 6,
                section: 1,
                metadata: {
                    type: 'step_multiple_choice',
                    title: 'Quiz Question 2',
                    question: 'How do macronutrients influence energy production?',
                    options: ['They reduce the body\'s need for energy', 'They play a crucial role in providing energy', 'They have no impact on energy levels', 'They only affect mental clarity'],
                    correctAnswer: 1
                }
            },
            {
                userId: 'default-user-id',
                unit: 2,
                index: 7,
                section: 1,
                metadata: {
                    type: 'step_multiple_choice',
                    title: 'Quiz Question 3',
                    question: 'Which of the following is a dietary factor in the development of type 2 diabetes?',
                    options: ['High intake of processed sugars', 'High intake of vitamins', 'Low protein consumption', 'Balanced diet'],
                    correctAnswer: 0
                }
            },
            {
                userId: 'default-user-id',
                unit: 2,
                index: 8,
                section: 1,
                metadata: {
                    type: 'step_multiple_choice',
                    title: 'Quiz Question 4',
                    question: 'Why is hydration important for energy and mental performance?',
                    options: ['It decreases mental clarity', 'It has no effect on energy levels', 'It is essential for maintaining cognitive function and energy', 'It only affects physical health'],
                    correctAnswer: 2
                }
            },
            {
                userId: 'default-user-id',
                unit: 2,
                index: 9,
                section: 1,
                metadata: {
                    type: 'step_finish'
                }
            }
        ],
        "section 1 unit 3": []
    }
});