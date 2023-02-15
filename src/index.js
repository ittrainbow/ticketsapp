import React from 'react'
import ReactDOM from 'react-dom/client'
import { Stack } from '@mui/material'

import App from './App'

const root = ReactDOM.createRoot(document.getElementById('root'))
root.render(
  <React.StrictMode>
    <Stack sx={{ padding: '0 15px' }}>
      <App />
    </Stack>
  </React.StrictMode>
)
