import React from 'react'
import { createBrowserHistory } from 'history'
import { Provider } from 'react-redux'
import store from './store'
import { Router } from 'react-router-dom'
import Routes from './router/Routes'
import "./App.scss"


const browserHistory = createBrowserHistory()


function App() {
  return (
      <Provider store={store}>
        <Router history={browserHistory}>
            <Routes/>
          </Router>

      </Provider>

  );
}

export default App
