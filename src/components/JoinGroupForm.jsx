import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import { useFunctions } from '/hooks/use-firestore'

export const JoinGroupForm = ({ isActive, onCancel }) => {
  const { register, handleSubmit, reset, errors } = useForm()

  const joinGroup = useFunctions('joinGroup')
  const [functionError, setFunctionError] = useState(null)
  const [submissionState, setState]  = useState(null)

  const onSubmit = (data) => {
    setState('loading')
    joinGroup(data).then(() => {
      onCancel()
      reset()
    }).catch(error => {
      console.log("function error", error)
      setFunctionError(error)
    }).finally(() => setState(null))
  }

  const handleCancel = () => {
    onCancel()
    reset()
  }

  if (!isActive) return null

  return (
    <div className='modal is-active'>
      <div className='modal-background'></div>
      <div className='modal-content'>
        <div className='box is-shadowless'>
          <h3 className='title'>Join a Game Group</h3>
          <div className='message is-info is-small'>
            <div className='message-body'>
              Get a join code from a member of the group you want to join.
            </div>
          </div>

          {functionError && (
            <div className='message is-danger'>
              <div className='message-body'>
                <p>{functionError.message}</p>
              </div>
            </div>
          )}

          <form className='form' onSubmit={handleSubmit(onSubmit)}>
            <div className='field'>
              <label className='label'>Group Code</label>

              <div className='control'>
                <input
                  className='input'
                  name='code'
                  type='text'
                  ref={register({ required: true })} />
              </div>
              {errors.code && <p className="help is-danger">Code is required</p>}
            </div>

            <div className='field is-grouped'>
              <div className="control">
                <button className={`button is-success ${submissionState && "is-loading"}`}>Join</button>
              </div>
              <div className="control">
                <button className="button is-link is-light" onClick={handleCancel}>Cancel</button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}
