import React, { useEffect } from 'react'
import { BrowserRouter as Router, Route, Switch, useHistory, useLocation } from 'react-router-dom'
import { GameGroupDetails } from '/pages/GameGroupDetails'
import { GameStats } from '/pages/GameStats'
import { GameGroups } from '/pages/GameGroups'
import { Login } from '/pages/Login'
import { Anchor } from '/components/Anchor'
import { useAppContext } from '/contexts/application'
import { useFirestoreAuth } from '/hooks/use-firestore'
import { AuthHandler, AuthRenderer } from '/components/AuthHandler'
import { AuthButton } from '/components/AuthButton'

const App = () => {
  const { globalState } = useAppContext()

  return (
    <Router>
      <AuthHandler />

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

          <div className='navbar-end'>
            <div className='navbar-item' href='/'>
              <AuthButton globalState={globalState} />
            </div>
          </div>
        </div>
      </nav>

      <Switch>
        <Route path='/login' exact>
          <Login />
        </Route>
        <Route path='/' exact>
          <AuthRenderer>
            <GameGroups />
          </AuthRenderer>
        </Route>
        <Route path='/groups/:groupId/games/:id'>
          <AuthRenderer>
            <GameStats />
          </AuthRenderer>
        </Route>
        <Route path='/groups/:id'>
          <AuthRenderer>
            <GameGroupDetails />
          </AuthRenderer>
        </Route>
      </Switch>
    </Router>
  )
}

export default App
