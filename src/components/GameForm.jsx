import React, { useState } from 'react'
import { useForm } from "react-hook-form"
import DatePicker from 'react-datepicker'
import { Modal } from '/components/Modal'

import "react-datepicker/dist/react-datepicker.css"

export const GameForm = (props) => {
  const { title = "Add Game", isActive, onSave, onCancel } = props
  const { register, handleSubmit, errors, reset } = useForm()
  const [datePlayed, setDatePlayed] = useState(new Date())

  const onSubmit = (data) => {
    onSave({
      ...data,
      rounds: parseInt(data.rounds, 10),
      date: datePlayed
    })

    reset()
  }

  const handleCancel = () => {
    onCancel()
    reset()
  }

  return (
    <Modal title={title} isActive={isActive}>
      <form
        className='form'
        onSubmit={handleSubmit(onSubmit)}>

        <div className='field'>
          <label className='label'>Name</label>
          <div className='control'>
            <input
              className='input'
              name='name'
              type='text'
              ref={register({ required: true })} />
          </div>
          {errors.name && <p className="help is-danger">This is required</p>}
        </div>

        <div className='field'>
          <label className='label'>Rounds</label>
          <div className='control'>
            <input
              className='input'
              name='rounds'
              type='number'
              ref={register({ required: true, max: 10 })} />
          </div>
          {errors.roundsPlayed && <p className="help is-danger">This is required</p>}
        </div>

        <div className='field'>
          <label className='label'>Url</label>
          <div className='control'>
            <input
              className='input'
              name='url'
              type='url'
              ref={register({ pattern: /^(https?):\/\/[^\s$.?#].[^\s]*$/g })} />
          </div>
          {errors.url && <p className="help is-danger">Please use a valid url</p>}
        </div>


        <div className='field'>
          <label className='label'>Date Played</label>
          <div className='control'>
            <DatePicker
              className='input'
              showPopperArrow={false}
              onChange={setDatePlayed}
              selected={datePlayed}
              maxDate={new Date()} />
          </div>
        </div>

        <div className='field is-grouped'>
          <div className="control">
            <button className="button is-link">Submit</button>
          </div>
          <div className="control">
            <button className="button is-link is-light" onClick={handleCancel}>Cancel</button>
          </div>
        </div>
      </form>
    </Modal>
  )
}
