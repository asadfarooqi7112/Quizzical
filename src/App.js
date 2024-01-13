import './App.css';
import { useEffect, useState } from 'react';
import Quizpage from './components/Quizpage';
import {nanoid} from 'nanoid'

function App() {

  const [quizData, setQuizData] = useState([])
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [howManyCorrect, setHowManyCorrect] = useState(0)
  const [quizStarted, setQuizStarted] = useState(false)
  const [refreshFetch, setRefreshFetch] = useState(false)

  const shuffle = (array) => { 
    return array.sort(() => Math.random() - 0.5); 
  }; 

  useEffect(()=>{ 
    fetch("https://opentdb.com/api.php?amount=5&type=multiple")
    .then(res=>res.json())
    .then(data=>setQuizData(data.results?.map(quiz=>({id: nanoid(), question: quiz.question, correct_answer: quiz.correct_answer, incorrect_answers: quiz.incorrect_answers, choices: shuffle((quiz.incorrect_answers.concat(quiz.correct_answer)))}))))
  }
  ,[refreshFetch])

const quizElements = quizData?.map(quiz=><Quizpage 
  id = {quiz.id}
  question = {quiz.question}
  correct_answer = {quiz.correct_answer}
  choices = {quiz.choices}
  chosenAnswer = {quiz.chosenAnswer}
  handleChoice = {handleChoice}
  isSubmitted = {isSubmitted}
  />)

  function handleChoice(idd,answer){
    setQuizData(prevData=>prevData.map(question=>question.id===idd?{...question, chosenAnswer: answer}:question))
  }
  function handleResult(){
    setIsSubmitted(true)
    let countCorrect = 0;
    quizData.forEach(question=>question.correct_answer===question.chosenAnswer&& countCorrect++)
    setHowManyCorrect(countCorrect)
  }
  function playAgain(){
    setIsSubmitted(false)
    setRefreshFetch(prev=>!prev)
  }
  function startQuiz(){
    setQuizStarted(true)
  }

  return (
    <div className='app'>
   {   !quizStarted?
      <div className='front-page'>
        <h1 className='title'>Quizzical</h1>
        <button onClick={startQuiz} className='start-quiz-button'>Start Quiz</button>
      </div>:
      <div className="quizzical-main">
        {quizElements}
        {!isSubmitted && <button onClick={handleResult} className='check-button'>Check Answers</button>}
        <div className='result-div'>
          {isSubmitted &&<h2 className='result-text'>You scored {howManyCorrect}/{quizData.length} correct answers </h2>}
          {isSubmitted && <button className='play-button' onClick={playAgain}>Play Again</button>}
         </div>
       </div>}
    </div>
  );
}

export default App;
