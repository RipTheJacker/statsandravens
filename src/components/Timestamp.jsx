import React from 'react'
import PropTypes from 'prop-types'
import formatDate from 'date-fns/format'
import parseJSON from 'date-fns/parseJSON'
import isDate from 'date-fns/isDate'

export const Timestamp = ({
  value, format, ...props
}) => {

  try {
    const date = isDate(value) ? value : parseJSON(value)
    const timestamp = formatDate(date, format)
    return <span className='timestamp' {...props}>{timestamp}</span>
  } catch (e) {
    return null
  }
}

Timestamp.propTypes = {
  className: PropTypes.string,
  value: PropTypes.oneOfType([
    PropTypes.string, PropTypes.instanceOf(Date), PropTypes.number
  ]).isRequired,
  format: PropTypes.string
}

Timestamp.defaultProps = {
  // @see https://date-fns.org/v2.11.1/docs/format
  format: 'P'
}
