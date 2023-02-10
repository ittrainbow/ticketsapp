import React, { useState } from 'react'

import './App.scss'

import AppRouter from './router/AppRouter'
import { Init } from './components/init'

export const Context = React.createContext()

const App = () => {
  const [projectsContext, setProjectsContext] = useState()
  const [appContext, setAppContext] = useState({ project: null, headerOpen: true })
  const [usersContext, setUsersContext] = useState({})

  return (
    <Context.Provider
      value={{
        projectsContext,
        setProjectsContext,
        appContext,
        setAppContext,
        usersContext,
        setUsersContext
      }}
    >
      <Init />
      <AppRouter className="container" />
    </Context.Provider>
  )
}

export default App
