import React, { useState, useEffect } from 'react';
import './App.css'
import Dropdown from './Dropdown';

const App = () => {
  const [questions, setQuestions] = useState([]);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState([]);
  const [showResult, setShowResult] = useState(false);
  const [score, setScore] = useState(0);
  const [wrongAnsers,setWrongAnswers] = React.useState(0);
  const [randomActive,setRandomActive] = React.useState(false);
  const [questionsAsked,setQuestionsAsked]  = React.useState([])
  const [showAnswers,setShowAnswers] = React.useState(false);
  const [activeDB,setActiveDB] = React.useState('all.json')

  useEffect(() => {
    const data = require(`./${activeDB}`);
    setQuestions(data.questions)
  }, [activeDB]);


  const handleAnswerSelect = (answer) => {
    if(selectedAnswer.includes(answer)){
      setSelectedAnswer(selectedAnswer.filter((item) => item !== answer))
    }else{
      setSelectedAnswer([...selectedAnswer, answer]);
    }
  };

  const handleNextQuestion = () => {

    const correctAnswer = questions[currentQuestion].answer;
    if (JSON.stringify(selectedAnswer.sort()) === JSON.stringify(correctAnswer)) {
      setScore(score + 1);
      toNext()
    }else{
      setWrongAnswers(wrongAnsers + 1);
      setShowAnswers(true)
    }
  };

  const toNext = () => {
    setQuestionsAsked([...questionsAsked, currentQuestion])
    setSelectedAnswer([]);
    setShowResult(false);
    setShowAnswers(false)
    if (questionsAsked.length + 1 < questions.length) {
      setCurrentQuestion(randomActive ? getRandomNumber(0,questions.length - 1,questionsAsked ) : currentQuestion + 1);
    } else {
      setShowResult(true);
    }
  }

  const handleRestartQuiz = () => {
    setCurrentQuestion(0);
    setSelectedAnswer([]);
    setShowResult(false);
    setScore(0);
    setWrongAnswers(0)
  };

  const getRandomNumber = (min, max, excludeValues) => {
    let randomNum;
    do {
      randomNum = Math.floor(Math.random() * (max - min + 1)) + min;
    } while (excludeValues.includes(randomNum));
    return randomNum;
  }

  if (questions.length === 0) {
    return <div>Loading...</div>;
  }

  const question = questions[currentQuestion].question;
  const options = questions[currentQuestion].options;

  const handleSelect = (option) => {
    handleRestartQuiz()
    setActiveDB(option);
  };

  return (
    <div className='app__hero'>
     
      {showResult ? (
        <div>
          <h2>Quiz Finished!</h2>
          <p>Your Score: {score} / {questions.length}</p>
          <button onClick={handleRestartQuiz}>Restart Quiz</button>
        </div>
      ) : (
        <div className='container__2'>
           <button onClick={() => {setRandomActive(!randomActive); handleRestartQuiz() }}>{randomActive ? 'Dezactivate' : 'Activate'} random</button>
           <Dropdown options={['db.json','db1.json', 'db2.json','db3.json','db4.json','db5.json','db6.json','db7.json','db8.json','db9.json','db10.json','all.json',]} onSelect={handleSelect} />
          <h2>Question {currentQuestion + 1}</h2>
          <h3>Wrong answers: {wrongAnsers} | Correct answers: {score}</h3>
          <p>{question}</p>
          <ul>
            {options.map((option, index) => (
              <li key={`${index}__${option}`}>
                <label style={{padding: '10px'}}>
                  <input
                    type="checkbox"
                    name="answer"
                    value={option}
                    checked={selectedAnswer.includes(index)}
                    onChange={() => handleAnswerSelect(index)}
                  />
                  {option}
                </label>
              </li>
            ))}
          </ul>
          {showAnswers && <strong style={{color: 'green'}}>Correct Answers: {questions[currentQuestion].options.map((item,i) => {
            if(questions[currentQuestion].answer.includes(i)){
              return <p key={`${i}__${item}`} style={{color: 'green'}}>{item},</p>
            }else{
              return <p key={`${i}__${item}`} style={{color: 'red'}}>{item},</p>
            }
          })}</strong>}
          <button disabled={showAnswers} onClick={() => handleNextQuestion()}>Next Question</button>
          {showAnswers && <button style={{marginLeft: '10px'}} onClick={() => toNext()}>I GOT IT</button> }
        </div>
      )}
    </div>
  );
};

export default App;
