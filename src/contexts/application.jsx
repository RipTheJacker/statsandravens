import React, { useState, useContext, useReducer } from 'react'
import produce from 'immer'

const ApplicationContext = createContext({})

const useApp = () => {
  const [state, dispatch] = useReducer(
    (state, action) => {

      return produce(
        state,
        draft => draft
      )
    }
  )

  return state
}
