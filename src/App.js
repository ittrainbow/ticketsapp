import React from 'react'

import AppRouter from './router/AppRouter'
import { ContextProvider } from './context/context'

const App = () => {
  return (
    <ContextProvider>
      <AppRouter />
    </ContextProvider>
  )
}

export default App
