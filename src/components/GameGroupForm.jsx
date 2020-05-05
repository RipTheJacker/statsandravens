import React, { useState, useEffect } from 'react'
import { useForm } from "react-hook-form"
import { Modal } from '/components/Modal'
import { useAppContext } from '/contexts/application'

export const GameGroupForm = ({ title, isActive, onSave, onCancel }) => {
  const { register, errors, handleSubmit, reset } = useForm()
  const { globalState } = useAppContext()

  const onSubmit = (data) => {
    onSave({
      ...data,
      ownerId: globalState.currentUser.uid
    })
    reset()
  }

  const handleCancel = () => {
    onCancel()
    reset()
  }

  return (
    <Modal title={"Create a Game Group"} isActive={isActive}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <p className='subtitle is-6'>A place to track the games you play with friends.</p>
        <div className='field'>
          <label className='label'>Name</label>
          <div className='control'>
            <input
              className='input'
              name='name'
              type='text'
              ref={register({ required: true })} />
          </div>
          {errors.name && <p className="help is-danger">Name is required</p>}
        </div>

        <div className='field is-grouped'>
          <div className="control">
            <button className="button is-link">Create</button>
          </div>
          <div className="control">
            <button className="button" onClick={handleCancel}>Cancel</button>
          </div>
        </div>
      </form>
    </Modal>
  )
}
