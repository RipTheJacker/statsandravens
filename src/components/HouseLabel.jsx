import React from 'react'

export const HouseLabel = ({ name, size = 'normal' }) => {
  return <span className={`tag is-${size} is-rounded house-color-${name}`}>{name}</span>
}
