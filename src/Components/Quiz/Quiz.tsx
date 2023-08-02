import * as React from "react"
import { Question } from "../Questions/Questions"
import { QuizQuestion } from "../../QuizQuestion/QuizQuestion"
import Countdown from "react-countdown";
import './Quiz.scss'

export const Quiz = () => {

    const [currentQuestion, setCurrentQuestion] = React.useState(0)
    const [userAnswer, setUserAnswer ] = React.useState('')
    const [score, setScore ] = React.useState(0)
    const [result, showResult] = React.useState(false)
    const [timer, setTimer] = React.useState(5)
    const formRef = React.useRef(null);
    



    const { question, answers, correctAnswer } = QuizQuestion[currentQuestion]

    // console.log(question)

    function checkCorrectAnswer(answer: string, correctAnswer: string) {
        if (answer === correctAnswer) {
            setScore(prev => prev + 1)
        }
        console.log(score)
    }

    // let timer = 5

    // const countdownInterval = setInterval(countdown, 1000)
    React.useEffect(() => {
        const interval = setInterval(() => {
            if(!result) {
                setTimer(prevTimer => prevTimer - 1);
            }
        }, 1000);
        // console.log(timer)
    
        // Clear the interval when the component is unmounted
        return () => clearInterval(interval);
    }, [timer !== 0]);

    React.useEffect(() => {
        if (timer === 0) {
            console.log("Countdown completed!");
            
            setTimer(3)
            handleNextQuestion()
        }

    }, [timer]);


    const handleNextQuestion = () => {
        if(currentQuestion < QuizQuestion.length - 1 ) {
            setCurrentQuestion(prev => prev + 1)
            formRef.current.reset();
            checkCorrectAnswer(userAnswer, correctAnswer)
        } else {
            showResult(true)
            checkCorrectAnswer(userAnswer, correctAnswer)
            console.log('is it running')
        }
    }

     // Calculate the percentage of time remaining
     const totalTime = 5; // Total time in seconds
  const percentageRemaining = (timer / totalTime) * 100;


    return (
        <div className="quizzes">
            {/* <Question questions={QuizQuestion[currentQuestion]} /> */}

            {!result ? ( <div className="questions">
                {/* <div className="progress-bar">
                    <div
                        className="progress"
                        style={{ width: `${percentageRemaining}%` }}
                    ></div>
                </div> */}
                <p>time remaining : {timer}</p>
                <h1>{question}</h1>

                <ul>
                <form ref={formRef} action="">
                    {answers && answers.map((answer, index) => {
                        return (
                            <li key={index}>
                                <label>
                                    <input
                                    type="radio"
                                    name="answer_option"
                                    value={answer}
                                    id=""
                                    onClick={(e) => {
                                        console.log(answer, correctAnswer);
                                        setUserAnswer(answer)
                                    }} />
                                    {answer}
                                </label>
                            </li>
                        )
                    })}
                </form>
            </ul>

            </div>) : ( <div className="result"> <h1>your result here: {score} / {QuizQuestion.length}  </h1> </div> ) }

            {currentQuestion < QuizQuestion.length - 1 ? <button style={{ marginTop: '50px' }} onClick={() => {
                handleNextQuestion()
                setTimer(5)
            }} >next</button> : <button style={{ marginTop: '50px' }} onClick={() => {
                handleNextQuestion()
                // showResult(true)
                }} >Finish</button>}
        </div>
    )
}