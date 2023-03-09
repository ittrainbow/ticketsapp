import React, { useState, useEffect, useContext } from 'react'
import { db } from '../db'
import { collection, getDocs, query } from 'firebase/firestore'

export const Context = React.createContext()
export const useAppContext = () => useContext(Context)

const initialContext = { project: null, headerOpen: true, loading: true }

export const ContextProvider = ({ children }) => {
  const [projectsContext, setProjectsContext] = useState()
  const [appContext, setAppContext] = useState(initialContext)
  const [usersContext, setUsersContext] = useState({})

  useEffect(() => {
    fetch() // eslint-disable-next-line
  }, [])

  const setLoading = (value) => {
    setAppContext({ ...appContext, loading: value })
  }

  const fetch = async () => {
    try {
      const projects = query(collection(db, 'projects'))
      await getDocs(projects).then((response) => {
        const obj = {}
        response.forEach((el) => (obj[el.id] = el.data()))
        setProjectsContext(obj)
      })

      const users = query(collection(db, 'users'))
      await getDocs(users).then((response) => {
        const obj = {}
        response.forEach((el) => (obj[el.id] = el.data()))
        setUsersContext(obj)
      })
    } catch (error) {
      console.error(error)
    } finally {
      setLoading(false)
    }
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
      {children}
    </Context.Provider>
  )
}
