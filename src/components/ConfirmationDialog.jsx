import React from 'react'

export const ConfirmationDialog = ({
  message, title, isActive, onConfirm, onCancel, type = 'danger', ...props
}) => {
  const className = [props.className, 'modal', isActive && 'is-active'].join(' ')

  return (
    <div className={className}>
      <div className='modal-background'></div>
      <div className='modal-card'>
        <header className='modal-card-head'>
          <p className='modal-card-title'>{title}</p>
        </header>
        <div className='modal-card-body'>
          {message}
        </div>
        <footer className="modal-card-foot">
          <button className={`button is-${type}`} onClick={onConfirm}>Confirm</button>
          <button className="button" onClick={onCancel}>Cancel</button>
        </footer>
      </div>
    </div>
  )
}
