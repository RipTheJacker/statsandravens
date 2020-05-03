import React from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import { Games } from '/pages/Games'
import { GameStats } from '/pages/GameStats'
import { GameForm } from '/components/GameForm'

const App = () => {
  return (
    <section className='section'>
      <Router>
        <Switch>
          <Route path='/' exact>
            <Games />
          </Route>
          <Route path='/games/:id'>
            <GameStats />
          </Route>
        </Switch>
      </Router>

      <GameForm />
    </section>
  )
}

export default App
