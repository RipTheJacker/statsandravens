import React, { useState, useEffect } from 'react'
import { useForm } from "react-hook-form"

const DataField = ({label, name, register, errors}) => (
  <div className='field is-horizontal'>
    <div className='field-label'>
      <label className='label'>{label}</label>
    </div>
    <div className='field-body'>
      <div className='field is-narrow'>
        <div className='control'>
          <input
            className='input'
            name={name}
            type='number'
            defaultValue={0}
            ref={register({ required: true, min: 0 })} />
        </div>
        {errors[name] && <p className="help is-danger">This is required</p>}
      </div>
    </div>
  </div>
)

export const PlayerForm = (props) => {
  const { onAddPlayer } = props
  const { register, errors, handleSubmit, reset } = useForm()

  return (
    <form className='form' onSubmit={handleSubmit(onAddPlayer)}>

      <div className='field is-horizontal'>
        <div className='field-label'>
          <label className='label'>Name</label>
        </div>

        <div className='field-body'>
          <div className='field is-narrow'>
            <div className='control'>
              <input
                className='input'
                name='name'
                type='text'
                ref={register({ required: true })} />
            </div>
            {errors.name && <p className="help is-danger">Name is required</p>}
          </div>
        </div>
      </div>

      <DataField label="Castles" name="castles" register={register} errors={errors} />
      <DataField label="Strongholds" name="strongholds" register={register} errors={errors} />
      <DataField label="Power Tokens" name="powerTokens" register={register} errors={errors} />
      <DataField label="Supply" name="supply" register={register} errors={errors} />

      <div className='field is-horizontal'>
        <div className='field-label'>
          <label className='label'>House</label>
        </div>
        <div className='field-body'>
          <div className='field'>
            <div className="control">
              <div className="select">
                <select name='house' ref={register({ required: true })}>
                  <option value='baratheon'>Baratheon</option>
                  <option value='greyjoy'>Greyjoy</option>
                  <option value='lannister'>Lannister</option>
                  <option value='martell'>Martell</option>
                  <option value='stark'>Stark</option>
                  <option value='tyrell'>Tyrell</option>
                </select>
              </div>
            </div>
          </div>
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
