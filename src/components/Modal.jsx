import React from 'react'

const ModalHead = ({ title }) => (
  <header className='modal-card-head'>
    <p className='modal-card-title'>{title}</p>
  </header>
)

export const Modal = ({ children, title, isActive, ...props }) => {
  const className = [props.className, 'modal', isActive && 'is-active'].join(' ')

  return (
    <div className={className}>
      <div className='modal-background'></div>
      <div className='modal-card'>
        {title && <ModalHead title={title} />}
        <div className='modal-card-body'>
          {children}
        </div>
        {/*<footer className="modal-card-foot">
          <button className="button is-success" onClick={onSave}>Save</button>
          <button className="button" onClick={onCancel}>Cancel</button>
        </footer>*/}
      </div>
    </div>
  )
}
