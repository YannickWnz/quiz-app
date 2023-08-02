import * as React from 'react';

interface QuestionsProps {
    questions: {
        question: string,
        answers: string[],
        correctAnswer: string
    }
}

interface UserAnswer {
    answer: string
}

export const Question = ({questions}: QuestionsProps ) => {

    const [userAnswer, setUserAnswer] = React.useState<UserAnswer>()

    // const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    //     // const {name, value} = e.target

    // }

    // function resetAnswer() {

    // }

    React.useEffect(() => {
        setUserAnswer({answer: ''})
    }, [questions])

    const handleChange = (e: React.MouseEvent<HTMLInputElement, MouseEvent>) => {
        // console.log('smth', e.target)
        const {name, value} = e.target
        setUserAnswer(value)

        // console.log(value, questions.correctAnswer)
        if(value === questions.correctAnswer) {
            console.log('eyuh')
        } else {
            console.log('nope')
        }

    }

    // console.log(questions)

    return (
        <div className="questions">
            <h1>{questions.question}</h1>

            <ul>
                {questions.answers && questions.answers.map((answer, index) => {
                    return (
                        <li key={index}>
                            <label>
                                <input type="radio" name="answer_option" value={answer} id="" onClick={(e) => {
                                    setUserAnswer(answer)
                                    console.log(userAnswer)
                                    }} />
                                {answer}
                            </label>
                        </li>
                    )
                })}
            </ul>

            {/* {questions.answers && questions.answers.map((answer, index) => {
                return  <form key={index} action="">
                <input 
                type="radio"
                name='quiz_option'
                value={answer}
                onClick={handleChange}
                id={answer}
                />
                <div></div>
            </form>
            })} */}
            {/* <form action="">
                {questions.answers && questions.answers.map((answer, index) => {
                    return  (
                        <div key={index}>
                            <label htmlFor={answer}>
                                <input type="radio" name='quiz_options' value={answer} id={answer} onClick={(e) => {
                                    // console.log('hey yooo', e)
                                    handleChange(e)
                                }} />
                                {answer}
                            </label>
                        </div>
                    )
                })}
            </form> */}

        </div>
    )
}