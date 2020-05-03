import React, { useState } from 'react'
import { useForm } from "react-hook-form"
import DatePicker from 'react-datepicker'

import "react-datepicker/dist/react-datepicker.css"

export const GameForm = () => {
  const { register, handleSubmit, errors } = useForm({ mode: 'onChange' })
  const [datePlayed, setDatePlayed] = useState(new Date())
  const onSubmit = (data) => {
    console.log("data", data, datePlayed)
  }

  return (
    <form
      className='form'
      onSubmit={handleSubmit(onSubmit)}>
      <h3 className='title'>Record Game</h3>
      
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
            name='roundsPlayed'
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
          <button className="button is-link is-light">Cancel</button>
        </div>
      </div>
    </form>
  )
}
