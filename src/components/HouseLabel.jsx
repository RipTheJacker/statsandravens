import React from 'react'

export const HouseLabel = ({ name, size = 'normal' }) => {
  if (!name) return null
  const titled = name.charAt(0).toUpperCase() + name.slice(1)
  return <span className={`tag is-${size} is-rounded house-color-${name}`}>{titled}</span>
}
