import React ,{useEffect, useState} from 'react'
import "./styles.scss"
import Card from '@material-ui/core/Card'
import Button from '@material-ui/core/Button'
import { useSelector, useDispatch } from 'react-redux'

export default function CardAction(props) {
    const [buttonColor, setButtonColor] = useState('darkgray')
    const [disabled, setDisabled] = useState(false)
    const correct_answer = useSelector(state => state.correct_answer)
    const dispatch = useDispatch()

    const checkAnswer = answer => {
        if (answer === correct_answer) {
            setButtonColor('green')
            dispatch({type: 'INCREASE_SCORE'})
        } else {
            setButtonColor('red')
        }
        setDisabled(false)
    }

    return (
        <>
            {props.answers.map(answer => {
                return (
                    <Card style={{"marginTop": "5px"}}>
                        <Button
                        variant="contained"
                        className='button_action'
                        disabled={disabled}
                        onClick={() => {
                            setDisabled(true)
                            checkAnswer(answer)
                            props.setQuestion('')
                            props.getQuestion()
                            props.setQuestionsAsked(props.questionsAsked + 1)
                            setTimeout(() => {
                                setButtonColor('darkgray')
                            }, 1000);

                        }}
                        style={{
                            "backgroundColor": buttonColor,
                            "borderColor": "black",
                            "borderStyle": "double",
                            "borderWidth": "5px",
                            "fontSize": "20px"
                        }}
                        >
                            {answer}
                        </Button>
                    </Card>
                )
            })}
        </>
    )
}