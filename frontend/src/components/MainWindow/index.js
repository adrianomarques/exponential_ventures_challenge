import React, {useEffect, useState} from 'react'
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Grid from '@material-ui/core/Grid';
import axios from 'axios';
import Clock from './../Clock'
import TextBox from './../TextBox'
import CardAction from './../CardAction'
import { useSelector } from 'react-redux'
import ReactHtmlParser from 'react-html-parser';
import "./styles.scss";

export default function MainWindow() {
    const time = useSelector(state => state.time)

    const [answers, setAnswers] = useState([])
    const [question, setQuestion] = useState()
    const [indexQuestion, setIndexQuestion] = useState(0)

    const parseAnswers = data => {
        setAnswers(
            data[indexQuestion]['incorrect_answers'].concat(
                data[indexQuestion]['correct_answer']
            )
        )
    }

    const parseQuestion = data => {
        var parsed_text = ReactHtmlParser(data[indexQuestion]['question'])
        setQuestion(parsed_text[0])
    }

    const getAllStages = () => {
        axios.get(`http://${process.env.REACT_APP_BACKEND_API}/game/question`)
        .then(response => {
            console.log(response.data[indexQuestion])
            parseAnswers(response.data)
            parseQuestion(response.data)
        })
        .catch(error => {
            console.error(error.message)
        })
    }

    useEffect( () => { getAllStages("introduction_0") }, [] )

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
                            actions={[{'type': 'actions', 'text': 'actions', 'size': 1}]}
                            />
                        </Grid>
                    </Grid>
                </CardContent>
            </Card>
        </>
    )
}