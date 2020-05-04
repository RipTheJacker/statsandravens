import React from 'react'

export const Icon = ({ name, className }) => {

  return (
    <span className={['icon', className].join(' ')}>
      <i className={`mdi mdi-${name}`}></i>
    </span>
  )
}
