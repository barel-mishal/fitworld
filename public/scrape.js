const out = {
    subject: document.querySelector("h2").textContent,
    questions: [/*{
        questionTitle: "",
        answers: [
            {
                id: "",
                text: "",
                isCorrect: false
            }
        ]
    
    }*/]
}

const answers = document.querySelector(".wpProQuiz_list");
const qlis = answers.querySelectorAll('.wpProQuiz_listItem');
for (const qli of qlis) {
    const question = {
        questionTitle: qli.querySelector(".wpProQuiz_question_text").textContent.trim(),
        answers: Array.from(qli.querySelectorAll(".wpProQuiz_questionListItem label")).map(a => a.textContent.trim())
    }

    out.questions.push(question);
}
console.log({out});
