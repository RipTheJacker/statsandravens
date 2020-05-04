import React from 'react'
import { useForm } from "react-hook-form"
import { Modal } from '/components/Modal'

export const PlayerForm = (props) => {
  const { onSave, onCancel, isActive } = props
  const { register, errors, handleSubmit, reset } = useForm()

  return (
    <Modal title={"Add Player"} isActive={isActive}>
      <form className='form' onSubmit={handleSubmit(onSave)}>
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
            <button className="button is-link">Submit</button>
          </div>
          <div className="control">
            <button className="button is-link is-light" onClick={onCancel}>Cancel</button>
          </div>
        </div>
      </form>
    </Modal>
  )
}
