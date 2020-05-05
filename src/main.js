import React from 'react'
import { render } from 'react-dom'

import App from './App'
import { ApplicationProvider } from '/contexts/application'

import '/scss/index.scss'

render(
  <ApplicationProvider>
    <App />
  </ApplicationProvider>,
  document.getElementById('root')
)
