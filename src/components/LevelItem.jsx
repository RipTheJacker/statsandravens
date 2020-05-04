import React from 'react'

export const LevelItem = ({ heading, data }) => (
  <div className='level-item has-text-centered'>
    <div>
      {heading && <p className='heading'>{heading}</p>}
      <p className='title'>{data}</p>
    </div>
  </div>
)
