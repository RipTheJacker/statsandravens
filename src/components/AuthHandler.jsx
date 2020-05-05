import React, { useEffect } from 'react'
import { useHistory, useLocation, Redirect } from 'react-router-dom'
import { useAppContext } from '/contexts/application'
import { useFirestoreAuth } from '/hooks/use-firestore'

export const AuthHandler = () => {
  const history = useHistory()
  const location = useLocation()
  const {globalState} = useAppContext()
  const auth = useFirestoreAuth()

  useEffect(() => {
    // if (location.pathname.match(/login/)) return

    auth.getRedirectResult().catch(error => console.error("login error", error))
  }, [])

  // useEffect(() => {
  //   if (globalState.isAuthenticated === null) return
  //   if (!globalState.isAuthenticated) history.push('/login')
  //   if (globalState.isAuthenticated) history.replace('/')
  // }, [globalState.isAuthenticated])

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
