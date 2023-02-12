import { useContext, useEffect } from 'react'
import { collection, getDocs, query } from 'firebase/firestore'

import { Context } from '../App'

import { db } from '../db'

export const Init = () => {
  const { setProjectsContext, setUsersContext, setLoading } = useContext(Context)

  useEffect(() => {
    fetch() // eslint-disable-next-line
  }, [])

  const fetch = async () => {
    try {
      setLoading(true)
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
}
