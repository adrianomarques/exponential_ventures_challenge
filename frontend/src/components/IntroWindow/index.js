import React, {useEffect, useState} from 'react'
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Grid from '@material-ui/core/Grid';
import { useSelector, useDispatch } from 'react-redux'
import "./styles.scss";
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { useHistory } from 'react-router-dom';
import axios from 'axios';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';


export default function IntroWindow() {
    const dispatch = useDispatch()
    const history = useHistory()

    // const time = useSelector(state => state.time)

    const [username, setUsername] = useState()
    const [password, setPassword] = useState() 
    const [snackbarSignin, setSnackbarSignin] = React.useState(false)
    const [snackbarSignup, setSnackbarSignup] = React.useState(false)

    function Alert(props) {
        return <MuiAlert elevation={6} variant="filled" {...props} />;
      }

    const handleClose = (event, reason) => {
        setSnackbarSignin(false)
        setSnackbarSignup(false)
      }

    const SignIn = () => {
        axios.post(`http://${process.env.REACT_APP_BACKEND_HOST}:5003/auth/signin`,{
            'username': username,
            'password': password
        })
        .then(response => {
            history.push('/game')
        })
        .catch(error => {
            setSnackbarSignin(true)
            console.error(error.message)
        })
    }

    const SignUp = () => {
        axios.post(`http://${process.env.REACT_APP_BACKEND_HOST}:5003/auth/signup`,{
            'username': username,
            'password': password
        })
        .then(response => {
            history.push('/game')
        })
        .catch(error => {
            setSnackbarSignup(true)
            console.error(error.message)
        })
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
                        <Grid item  style={{marginTop: '15%'}}>
                            Login
                        </Grid>
                        <Grid item>
                            <TextField
                              style={{marginTop: '10px'}}
                              label="Username"
                              variant="outlined" 
                              value={username}
                              onChange={event => {
                                setUsername(event.target.value)
                              }}
                            />
                        </Grid>
                        <Grid item>
                            <TextField
                              style={{marginTop: '10px'}}
                              label="Password"
                              type='password'
                              variant="outlined"
                              value={password}
                              onChange={event => {
                                setPassword(event.target.value)
                            }}
                            />
                        </Grid>
                        <Grid item>
                            <Button 
                            variant="contained" 
                            color="primary" 
                            className='button' 
                            onClick={SignIn}
                            style={{marginTop: '10px'}}>
                                Sign in
                            </Button>
                            
                            <Snackbar open={snackbarSignin} autoHideDuration={6000} onClose={handleClose}>
                            <Alert onClose={handleClose} severity="error">
                                Incorrect user or password!
                            </Alert>
                            </Snackbar>
                        </Grid>
                        <Grid item>
                        <Button 
                            variant="contained" 
                            color="secondary" 
                            className='button' 
                            onClick={SignUp}
                            style={{marginTop: '10px'}}>
                                Sign up
                        </Button>

                        <Snackbar open={snackbarSignup} autoHideDuration={6000} onClose={handleClose}>
                            <Alert onClose={handleClose} severity="error">
                                Error on signup!
                            </Alert>
                        </Snackbar>
                        </Grid>
                    </Grid>
                </CardContent>
            </Card>
        </>
    )
}