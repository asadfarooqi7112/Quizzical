import './App.css';
import { useEffect, useState } from 'react';
import Quizpage from './components/Quizpage';
import {nanoid} from 'nanoid'
import data from "./components/data.js"

function App() {

  const shuffle = (array) => { 
    return array.sort(() => Math.random() - 0.5); 
  }; 

  const [quizData, setQuizData] = useState(data.results)
  const choicesArray = quizData.map(quiz=>({
    id: nanoid(), 
    question: quiz.question, 
    correct_answer: quiz.correct_answer, 
    choices: shuffle((quiz.incorrect_answers.concat(quiz.correct_answer))),
    chosenAnswer: "",
  })) 

  const [filteredData, setFilteredData] = useState(choicesArray)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [howManyCorrect, setHowManyCorrect] = useState(0)
  const [quizStarted, setQuizStarted] = useState(false)

  /*useEffect(()=>{ 
    fetch("https://opentdb.com/api.php?amount=5&type=multiple")
    .then(res=>res.json())
    .then(data=>setQuizData(data.results.map(quiz=>({id: nanoid(), question: quiz.question, correct_answer: quiz.correct_answer, incorrect_answers: quiz.incorrect_answers, choices: shuffle((quiz.incorrect_answers + ','+quiz.correct_answer).split(","))}))))
  }
  ,[])*/

const quizElements = filteredData.map(quiz=><Quizpage 
  isSubmitted = {isSubmitted}
  id = {quiz.id}
  question = {quiz.question}
  choices = {quiz.choices}
  chosenAnswer = {quiz.chosenAnswer}
  handleChoice = {handleChoice}
  correct_answer = {quiz.correct_answer}
  />)

  function handleChoice(idd,answer){
    setFilteredData(prevData=>prevData.map(question=>question.id===idd?{...question, chosenAnswer: answer}:question))
  }

  function handleResult(){
    setIsSubmitted(true)
    let countCorrect = 0;
    filteredData.forEach(question=>question.correct_answer===question.chosenAnswer&& countCorrect++)
    setHowManyCorrect(countCorrect)
  }
  function playAgain(){
    setIsSubmitted(false)
    setFilteredData(choicesArray)
  }
  function startQuiz(){
    setQuizStarted(true)
  }

  return (
    <div className='app'>
   {   !quizStarted?<div className='front-page'>
        <h1 className='title'>Quizzical</h1>
        <button onClick={startQuiz} className='start-quiz-button'>Start Quiz</button>
      </div>:
      <div className="quizzical-main">
        {quizElements}
        {!isSubmitted && <button onClick={handleResult} className='check-button'>Check Answers</button>}
        <div className='result-div'>
          {isSubmitted &&<h2 className='result-text'>You scored {howManyCorrect}/{filteredData.length} correct answers </h2>}
          {isSubmitted && <button className='play-button' onClick={playAgain}>Play Again</button>}
      </div>
    </div>}
    </div>

  );
}

export default App;
