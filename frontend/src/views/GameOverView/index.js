import React, {useEffect, useState} from 'react'
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import { useSelector, useDispatch } from 'react-redux'
import { useHistory } from 'react-router-dom';
import "./styles.scss";


export default function GameOverView() {
    const dispatch = useDispatch()
    const history = useHistory()
    const score = useSelector(state => state.score)

    let game_over_text = ''
    if (score < 3) {
        game_over_text = 'Clueless. Don’t be discouraged! Learn some more about this topic, and come back to try again!'
    } else if (score < 6) {
        game_over_text = 'Beginner. This is the level most players end up with after answering this quiz for the first time. Learn some more about this topic and come back to try again!'
    } else if (score < 9 ) {
        game_over_text = 'Confident: This is the level players are getting pro! Continue your progress and rock it!'
    } else {
        game_over_text = 'Expert: This is the highest level achievable! Thanks for being awesome as you are!'
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
                        <Grid item style={{marginTop: '15%', fontSize:"40px"}}>
                            Game Over
                        </Grid>
                        <Grid item style={{fontSize:"40px"}}>
                         Score: { score }
                        </Grid>
                        <Grid item>
                         { game_over_text }
                        </Grid>
                        <Grid item>
               
                        </Grid>
                        <Grid item>
                            <Button 
                            variant="contained" 
                            color="primary" 
                            className='button' 
                            onClick={() => history.push('/game')}
                            style={{marginTop: '10px'}}>
                                Try Again?
                            </Button>
                        </Grid>
                    </Grid>
                </CardContent>
            </Card>
        </>
    )
}