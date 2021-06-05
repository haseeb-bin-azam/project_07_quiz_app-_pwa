import React, { useEffect, useState } from 'react';
import './App.css';

import {Quiz, QuestionType} from './types/quiz_types';
import {QuestionCard} from './Components/QuestionCard';

// import {configureNotification} from './Services/firebase-services';

function App() {

  let [quiz, setQuiz] = useState<QuestionType[]>([]);
  // let [collection, setCollection] = useState<QuestionType[]>([]);
  let [current, setCurrent] = useState(0);
  let [score, setScore] = useState(0);
  let [showResult, setShowResult] = useState(false);
  let [flag, setFlag] = useState(0);

  window.addEventListener('load', (event) => {
  //  configureNotification();
  });

  const shuffleArray = (array: any[]) =>
    [...array].sort( () => Math.random() - 0.5 );

  useEffect( () => {
    async function getQuizQuestion() {
      // const question = await getQuestion(5, 'easy');
      // console.log(question);

      let totalQuest = 5;
      let level = 'easy';
      // console.log(totalQuest);

      let url = `https://opentdb.com/api.php?amount=${totalQuest}&difficulty=${level}&type=multiple`;
      
      //getting data from local storage for offline availability
      await fetch(url).then((response) => {
         response.json().then((result) => {
          console.log(result.results);
          const quiz: QuestionType[] = result.results.map((quesObj: Quiz) => {
            return {
                question: quesObj.question,
                option: shuffleArray(quesObj.incorrect_answers.concat(quesObj.correct_answer)),
                answer: quesObj.correct_answer,
            }
          });
          // console.log(JSON.stringify(quiz));
          setQuiz(quiz);
          localStorage.setItem('users', JSON.stringify(quiz));
        })
      }).catch(err => {
          console.log('in catch block');
          // console.log(JSON.parse(localStorage.getItem('currentUser') || '{}'));
          let itemFromLocalStorage: QuestionType[] =  JSON.parse(localStorage.getItem('users') || '{}');
          console.log(itemFromLocalStorage);
          setQuiz(itemFromLocalStorage);
      })
      // setQuiz(question);
    }
    // console.log('dobara chal gya');
    getQuizQuestion();
  }, [flag]);


  const handleSubmit = (e:React.FormEvent<EventTarget>, userSelection:string) => {
    // console.log(e);
    e.preventDefault();

    // console.log(userSelection);
    // console.log(quiz[current].answer);
    let ans: QuestionType = quiz[current];
    if( userSelection === ans.answer ){
      setScore(++score);
    }

    if(current !== quiz.length - 1)
      setCurrent(++current)
    else
    {
      // alert('your score: ' + score + "out of: " + quiz.length);
      setShowResult(true);
      setCurrent(0);
      setScore(0);
    }
  };

  const RestartQuiz = () => {
    setShowResult(false);
    setFlag(++flag)
    console.log(flag);
  }

  // console.log(quiz);

  if(!quiz.length){
    return <h1>Loading</h1>
  }

  if(showResult){
    return (
      <div className='question-container result-container'>
          <h2>Result</h2>
          <p className='result-text'>
                Your final score is <b> {score} </b> out of <b> {quiz.length} </b>
          </p>
          <input type='button' value='Reattempt Quiz' onClick={RestartQuiz}/>
      </div>
    )
  }

  return (
    <div className="App">
      <QuestionCard
        option={quiz[current].option}
        question={quiz[current].question}
        callBack={handleSubmit}
      />
    </div>
  );
}

export default App;
