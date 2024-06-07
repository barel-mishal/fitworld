import { server$ } from "@builder.io/qwik-city";

export const serverGPTSTexts = server$(async function() {


    return {
        "section 1 unit 1": [
            {
                id: '1',
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
                id: '2',
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
                id: '3',
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
                id: '4',
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
                id: '5',
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
                id: '6',
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
                id: '7',
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
                id: '8',
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
                id: '9',
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
                id: '10',
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
                id: '11',
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
                id: '12',
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
                id: '13',
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
                id: '14',
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
                id: '15',
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
                id: '16',
                userId: 'default-user-id',
                unit: 1,
                index: 16,
                section: 5,
                metadata: {
                    type: 'step_finish',
                }
            },
        ]
    }
});