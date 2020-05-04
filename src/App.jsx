import React from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import { GameGroupDetails } from '/pages/GameGroupDetails'
import { GameStats } from '/pages/GameStats'
import { GameGroups } from '/pages/GameGroups'
import { Anchor } from '/components/Anchor'

const App = () => {
  return (
    <Router>
      <nav className='navbar is-dark' role='navigation'>
        <div className='navbar-brand'>
          <div className='navbar-item'>
            <h5 className='is-5'>Stats and Ravens</h5>
          </div>
        </div>

        <div className='navbar-menu'>
          <div className='navbar-start'>
            <Anchor className='navbar-item' href='/'>
              Groups
            </Anchor>
          </div>
        </div>
      </nav>

      <section className='section'>
        <Switch>
          <Route path='/' exact>
            <GameGroups />
          </Route>
          <Route path='/groups/:groupId/games/:id'>
            <GameStats />
          </Route>
          <Route path='/groups/:id'>
            <GameGroupDetails />
          </Route>
        </Switch>
      </section>
    </Router>
  )
}

export default App
