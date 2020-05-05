import React from 'react'
import { useFirestoreAuth } from '/hooks/use-firestore'

export const AuthButton = ({ globalState }) => {
  const auth = useFirestoreAuth()

  const signOut = () => auth.signOut()

  if (globalState.isAuthenticated) {
    return (
      <button className="button is-small" onClick={signOut}>Sign Out</button>
    )
  }

  return null
}
