import React from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuthState } from 'react-firebase-hooks/auth'

import './auth.scss'

import { logout } from '../db/auth'
import { auth } from '../db'

export const Dashboard = () => {
  const [user] = useAuthState(auth)
  const { displayName } = user
  const navigate = useNavigate()

  const logoutHandler = () => {
    logout()
    navigate('/')
  }

  return (
    <div className="auth">
      <div className="auth__container">
        <div>{displayName ? displayName : '...fetching'}</div>
        <button onClick={() => navigate('/profile')}>Edit profile</button>
        <button onClick={logoutHandler}>Log Out</button>
      </div>
    </div>
  )
}
