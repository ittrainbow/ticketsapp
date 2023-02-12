import React from 'react'
import { useAuthState } from 'react-firebase-hooks/auth'

import { auth } from '../../db'

import { Login } from '../../authPages'
import { ProjectList } from '..'

export const Home = () => {
  const [user] = useAuthState(auth)

  return user ? <ProjectList /> : <Login />
}
