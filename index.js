const questions = [
    {
        question:"What does HTML stands for?",
        answers:["HyperTextMarkupLanguage", 
                "HomeToolMarkupLanguage", 
                "HyperlinksandTextMarkupLanguage"]
    },
    {
        question:"Who is making the Web standards?",
        answers:[
            "WorldWideweb",
            "Google",
            "Mozilla",
        ]
    },
    {
        question:"Choose the correct HTML tag for the largest heading",
        answers:[
            "h1",
            "head",
            "h6"
        ]
    },
    {
        question:"what is the correct HTML element for inserting a line breaking",
        answers:[
            "br",
            "lb",
            "break"
        ]
    },
    
];
let answers = [];
const quizContentBox = document.getElementById('quiz-content');
const results = document.getElementById('results');
let timer = setTimeout(()=>{},5000);

function outputHandler(createEl){
    results.style.display = "block";
    results.innerHTML = "";
    answers.map((answer,index)=>{
        let userAnswer = answer;

        if(answer === null){
            userAnswer = "Not selected";
        }
        else if(answer === questions[index].answers[0]){
            userAnswer = "Corect";
        }
        else{
            userAnswer = "Incorrect";
        }
        const answerEl = document.createElement('section');
        answerEl.innerHTML = `
        <h2>${index+1}. ${questions[index].question}</h2>
        <h2>Ans : ${answer}</h2>
        <h3>${userAnswer}</h2>
        `
        createEl.append(answerEl);
    })
    createEl.innerHTML += `<button id="restart_btn">Restart Quiz</button>`
    quizContentBox.style.display = "none";
    results.append(createEl);

    const restartbtn = document.querySelector('button');
    restartbtn.addEventListener('click',restartHandler);
}

function questionsHandler(){
    clearTimeout(timer);
    quizContentBox.innerHTML =  "";

    if(answers.length === questions.length){
        const createEl = document.createElement('div');
        createEl.className = "answers-box";
        createEl.innerHTML = `
            <h2>Quiz Completed</h2>
            <h3>Your Selected Answers</h3>
        `
        console.log(answers);
        
        outputHandler(createEl);
        return;
        
    }

    let activeQuestionIndex = answers.length;

    const createEl = document.createElement('ul');

    createEl.innerHTML = `
        <h2>${activeQuestionIndex+1}. ${questions[activeQuestionIndex].question}</h2>
        <li>
           <input type="radio" name="choices" value=${questions[activeQuestionIndex].answers[0]}>${questions[activeQuestionIndex].answers[0]}</input>
        </li>
        <li>
            <input type="radio" name="choices" value=${questions[activeQuestionIndex].answers[1]}>${questions[activeQuestionIndex].answers[1]}</input>
        </li>
        <li>
            <input type="radio" name="choices" value=${questions[activeQuestionIndex].answers[2]}>${questions[activeQuestionIndex].answers[2]}</input>
        </li>
        <button>Next</button>
    `

    quizContentBox.append(createEl);

    const btn = document.querySelector('button');
    btn.addEventListener('click',answersHandler);
    timer = setTimeout(answersHandler,5000);


}

function answersHandler(){
    const prevAnswers = answers.length;
    const inputs = document.querySelectorAll('input');
    inputs.forEach(input=>{
        if(input.checked){
            answers.push(input.value);
        }
        
    })
    if(answers.length === prevAnswers){
        answers.push(null);
    }
    questionsHandler();

}

function restartHandler(){
    answers = [];
    quizContentBox.style.display = "block";
    results.style.display = "none";
    questionsHandler();
}

questionsHandler();

// function start(){
//     setTimeout(questionsHandler,5000);
// }
// start();