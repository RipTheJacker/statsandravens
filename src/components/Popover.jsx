import React, { useRef } from 'react'
import { usePopper } from 'react-popper'

export const Popover = ({ isShown, children, handler }) => {
  const popoverRef = useRef()
  const { styles, attributes } = usePopper(handler.current, popoverRef.current, {
    placement: 'bottom'
  })

  return (
    <div className={`popover ${isShown && 'is-shown'}`} ref={popoverRef} style={styles.popper} {...attributes.popper}>
      <div className='box'>
        {children}
      </div>
    </div>
  )
}
