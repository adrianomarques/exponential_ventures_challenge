import React from 'react' 
import { Switch } from 'react-router-dom' 
import PublicRoute from './PublicRoute' 
import { IntroView, GameView, GameOverView } from './../views' 


const Routes = () => {
  
  return (
    <Switch>
      <PublicRoute
        exact
        path="/"
        component={IntroView}
      />
      <PublicRoute
        exact
        path="/game"
        component={GameView}
      />
      <PublicRoute
        exact
        path="/gameover"
        component={GameOverView}
      />
    </Switch>
  ) 
} 

export default Routes 
