import React from 'react'

export const Quickview = ({ isActive, title, children, className, onClose, ...props}) => {

  return (
    <div className={`quickview ${isActive && 'is-active'} ${className}`} {...props}>
      <header className='quickview-header'>
        <p className='title'>{title}</p>
        <span className='delete' onClick={onClose}></span>
      </header>
      <div className='quickview-body'>
        <div className='quickview-block'>
          {children}
        </div>
      </div>
      <footer className='quickview-footer'></footer>
    </div>
  )
}
