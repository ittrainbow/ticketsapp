import React, { useState } from 'react'

import AppRouter from './router/AppRouter'
import { Init } from './components/init'

export const Context = React.createContext()
const initialContext = { project: null, headerOpen: true, loading: true }

const App = () => {
  const [projectsContext, setProjectsContext] = useState()
  const [appContext, setAppContext] = useState(initialContext)
  const [usersContext, setUsersContext] = useState({})

  const setLoading = (value) => {
    setAppContext({ ...appContext, loading: value })
  }

  return (
    <Context.Provider
      value={{
        projectsContext,
        setProjectsContext,
        appContext,
        setAppContext,
        setLoading,
        usersContext,
        setUsersContext
      }}
    >
      <Init />
      <AppRouter />
    </Context.Provider>
  )
}

export default App
