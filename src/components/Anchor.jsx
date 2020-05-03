import React from 'react'
import { Link } from 'react-router-dom'

export const Anchor = ({children, href}) => {
  return <Link className='' to={href}>{children}</Link>
}
