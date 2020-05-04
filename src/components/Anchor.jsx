import React from 'react'
import { Link } from 'react-router-dom'

export const Anchor = ({children, href, ...props}) => {
  return <Link className='' to={href} {...props}>{children}</Link>
}
