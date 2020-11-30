import React, {useEffect, useState} from 'react'
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Grid from '@material-ui/core/Grid';
import axios from 'axios';
import Clock from './../Clock'
import TextBox from './../TextBox'
import Score from './../Score'
import CardAction from './../CardAction'
import { useSelector, useDispatch } from 'react-redux'
import ReactHtmlParser from 'react-html-parser'
import { useHistory } from 'react-router-dom';
import "./styles.scss";

export default function MainWindow() {
    const dispatch = useDispatch()
    const history = useHistory()

    const time = useSelector(state => state.time)
    const [answers, setAnswers] = useState([])
    const [question, setQuestion] = useState() 
    const [questionsAsked, setQuestionsAsked] = useState(0) 


    const checkGameOver = (questions_asked) => {
        if (questions_asked >= 10) {
            history.push("/gameover")
        } 
    }
    const shuffle = array => {
        var currentIndex = array.length, temporaryValue, randomIndex;
        while (0 !== currentIndex) {
          randomIndex = Math.floor(Math.random() * currentIndex);
          currentIndex -= 1;
      
          temporaryValue = array[currentIndex];
          array[currentIndex] = array[randomIndex];
          array[randomIndex] = temporaryValue;
        }
        return array;
      }

    const parseAnswers = data => {
        var parsed_answers = []
        data['incorrect_answers'].concat(data['correct_answer']).map(answer => {
            parsed_answers.push(ReactHtmlParser(answer)[0])
        })
        setAnswers(shuffle(parsed_answers))
    }

    const parseQuestion = data => {
        var parsed_text = ReactHtmlParser(data['question'])
        setQuestion(parsed_text[0])
    }

    const getQuestion = () => {
        axios.get(`http://${process.env.REACT_APP_BACKEND_HOST}:5003/game/question`)
        .then(response => {
            parseAnswers(response.data)
            parseQuestion(response.data)
            dispatch({type: 'SET_ANSWER', correct_answer: response.data.correct_answer})
        })
        .catch(error => {
            console.error(error.message)
        })
    }

    useEffect( () => { dispatch({type: 'START_GAME'}) }, [] )
    useEffect( () => { getQuestion() }, [] )
    useEffect( () => { checkGameOver(questionsAsked) }, [questionsAsked] )

    let textbox = <></>
    if (question) {
        textbox =  <TextBox question={question}/>
    }
    return (
        <>
            <Card
            className="outer_card"
            >
                <CardContent>
                    <Grid
                    container
                    direction="column"
                    justify="center"
                    alignItems="center"
                    >
                        {/* STATS (TOP) */}
                        <Grid
                        container
                        direction="row"
                        justify="space-between"
                        alignItems="center"
                        >
                            <Grid
                            item
                            >
                                <Score/>
                            </Grid>
                            <Grid
                            item
                            >
                                <Clock/>
                            </Grid>
                        </Grid>

                        {/* TEXTBOX (MIDDLE) */}
                        <Grid
                        item
                        >
                            <div className="middle_card">
                                {
                                    textbox
                                }
                            </div>
                        </Grid>

                        {/* ACTIONS (BOTTOM) */}
                        <Grid
                        container
                        direction="column"
                        justify="center"
                        alignItems="stretch"
                        >   
                            <CardAction
                            answers={answers}
                            getQuestion={getQuestion}
                            setQuestion={setQuestion}
                            setAnswers={setAnswers}
                            setQuestionsAsked={setQuestionsAsked}
                            questionsAsked={questionsAsked}
                            />
                        </Grid>
                    </Grid>
                </CardContent>
            </Card>
        </>
    )
}