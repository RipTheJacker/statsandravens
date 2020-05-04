import { useState } from 'react'

export const useModal = () => {
  const [activeModal, setModalState] = useState(null)

  const toggleModal = (name) => {
    const isString = typeof name === 'string'
    const newState = (activeModal === name || !isString) ? null : name

    setModalState(newState)
  }

  return [ activeModal, toggleModal ]
}
