import React, { useState, useContext, useEffect, createContext } from 'react'
import produce from 'immer'
import { useFirestoreAuth } from '/hooks/use-firestore'

const ApplicationContext = createContext({})

export const useAuthInitializer = (update) => {
  const auth = useFirestoreAuth()

  useEffect(() => {
    return auth.onAuthStateChanged(function(user) {
      console.log("auth state", user)
      if (user) {
        update({
          'isAuthenticated': true,
          'currentUser': user,
        })
      } else {
        // No user is signed in.
        update({ 'isAuthenticated': false })
      }
    })
  }, [])
}

export const ApplicationProvider = ({ children }) => {

  const [globalState, update] = useState({
    isAuthenticated: null,
    curentUser: null
  })

  const updateGlobalState = (values) => {
    const newState = produce(globalState, draft => {
      Object.entries(values).forEach(([k,v]) => {
        draft[k] = v
      })
    })

    update(newState)
  }

  useAuthInitializer(updateGlobalState)

  return (
    <ApplicationContext.Provider value={{globalState, updateGlobalState}}>
      {children}
    </ApplicationContext.Provider>
  )
}

export const useAppContext = () => {
  return useContext(ApplicationContext)
}
