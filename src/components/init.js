import { useContext, useEffect } from 'react'
import { collection, getDocs, query } from 'firebase/firestore'
import { useDispatch } from 'react-redux'

import { Context } from '../App'

import { db } from '../db'
import { setLoading } from '../redux/actions'

export const Init = () => {
  const dispatch = useDispatch()
  const { setProjectsContext, setUsersContext } = useContext(Context)

  useEffect(() => {
    fetch() // eslint-disable-next-line
  }, [])

  const fetch = async () => {
    try {
      dispatch(setLoading(true))
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
      dispatch(setLoading(false))
    }
  }
}
