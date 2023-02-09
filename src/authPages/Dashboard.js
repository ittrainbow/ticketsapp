import React from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuthState } from 'react-firebase-hooks/auth'
import { Button } from '@mui/material'

import './auth.scss'

import { logout } from '../db/auth'
import { auth } from '../db'

export const Dashboard = () => {
  const [user] = useAuthState(auth)
  // const { email, displayName } = user
  const navigate = useNavigate()

  const logoutHandler = () => {
    logout()
    navigate('/login')
  }

  return (
    <div className="auth">
      <div className="auth__container">
        <div className="text-container">
          <div>{user ? user.displayName : '...fetching'}</div>
          <div>{user ? user.email : '...fetching'}</div>
        </div>
        <Button onClick={() => navigate('/profile')}>Edit profile</Button>
        <Button onClick={logoutHandler}>Log Out</Button>
      </div>
    </div>
  )
}
