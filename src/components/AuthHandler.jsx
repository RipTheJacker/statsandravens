import React, { useEffect } from 'react'
import { Redirect } from 'react-router-dom'
import { useAppContext } from '/contexts/application'
import { useFirestoreAuth } from '/hooks/use-firestore'

export const AuthHandler = () => {
  const auth = useFirestoreAuth()

  useEffect(() => {
    auth.getRedirectResult().catch(error => console.error("login error", error))
  }, [])

  return null
}

export const AuthRenderer = ({ children }) => {
  const {globalState} = useAppContext()
  const auth = useFirestoreAuth()

  useEffect(() => {
    auth.getRedirectResult()
  }, [])
  if (globalState.isAuthenticated === null) return null
  if (!globalState.isAuthenticated) return <Redirect to='/login' />
  return children
}
