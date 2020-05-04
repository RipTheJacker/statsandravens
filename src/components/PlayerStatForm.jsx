import React, { useState, useEffect } from 'react'
import { useForm } from "react-hook-form"
import { Modal } from '/components/Modal'

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

export const PlayerStatForm = (props) => {
  const { players, onSave, onCancel, isActive } = props
  const { register, errors, handleSubmit, reset } = useForm()

  const handleSave = (data) => {
    const player = players.find(p => p.id === data.playerId)

    onSave({...data, player})
  }

  return (
    <Modal title={"Add Game Result"} isActive={isActive}>
      <form className='form' onSubmit={handleSubmit(handleSave)}>

        <div className='field is-horizontal'>
          <div className='field-label'>
            <label className='label'>Player</label>
          </div>

          <div className='field-body'>
            <div className='field is-narrow'>
              <div className="select">
                <select name='playerId' ref={register({ required: true })}>
                  {players.map(player => <option key={player.id} value={player.id}>{player.name}</option>)}
                </select>
              </div>
              {errors.name && <p className="help is-danger">Player is required</p>}
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
            <button className="button is-link is-light" onClick={onCancel}>Cancel</button>
          </div>
        </div>
      </form>
    </Modal>
  )
}
