import React from 'react'
import { useAuthState } from 'react-firebase-hooks/auth'

import { auth } from '../db'
import { ProjectList, Login } from '.'

export const Home = () => {
  const [user] = useAuthState(auth)

  return user ? <ProjectList /> : <Login />
}
