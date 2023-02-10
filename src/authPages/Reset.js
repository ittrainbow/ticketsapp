import React, { useEffect, useState } from 'react'
import { useAuthState } from 'react-firebase-hooks/auth'
import { useNavigate } from 'react-router-dom'
import { Button, Input } from '@mui/material'

import './auth.scss'

import { auth } from '../db/firebase'
import { sendPasswordReset } from '../db/auth'

export const Reset = () => {
  const navigate = useNavigate()
  const [email, setEmail] = useState('')
  const [user, loading] = useAuthState(auth)

  useEffect(() => {
    if (loading) return
    if (user) navigate('/')
  }, [user, loading, navigate])

  return (
    <div className="auth">
      <div className="auth__container">
        <Input
          type='email'
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder='E-mail'
        />
        <Button className="login" onClick={() => sendPasswordReset(email)}>
          Send recovery e-mail
        </Button>
        <Button onClick={() => navigate('/register')}>
          Sign Up
        </Button>
        <Button onClick={() => navigate('/login')}>
          Log In
        </Button>
      </div>
    </div>
  )
}
