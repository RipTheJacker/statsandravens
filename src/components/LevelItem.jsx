import React from 'react'

export const LevelItem = ({ heading, data, children, ...props }) => (
  <div className='level-item has-text-centered' {...props}>
    <div>
      {heading && <p className='heading'>{heading}</p>}
      <p className='title'>{data}</p>
      {children}
    </div>
  </div>
)
