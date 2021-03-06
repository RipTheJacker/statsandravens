import React from 'react'
import { Icon } from '/components/Icon'
import { useFirestoreAuth, googleProvider } from '/hooks/use-firestore'
import { useAppContext } from '/contexts/application'

export const Login = () => {
  const auth = useFirestoreAuth()
  const { globalState } = useAppContext()

  const signIn = () => {
    auth.signInWithRedirect(googleProvider())
  }

  const loadingAuth = globalState.isAuthenticated == null

  return (
    <section className='hero is-large is-info'>
      <div className='hero-body'>
        <div className='container has-text-centered'>
          <h1 className='title'>Please Log In</h1>
          <p>
            <button className={`button is-large is-primary ${loadingAuth && 'is-loading'}`} onClick={signIn}>
              <Icon name='google' />
              <span>Log in with Google</span>
            </button>
          </p>
        </div>
      </div>
    </section>
  );
};
