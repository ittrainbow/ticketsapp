import React, { useEffect, useState } from 'react'
import { useAuthState } from 'react-firebase-hooks/auth'
import { useNavigate } from 'react-router-dom'
import { Link } from 'react-router-dom'

import './auth.scss'

import { auth } from '../db/firebase'
import { sendPasswordReset } from '../db/auth'

export const Reset = () => {
  const [email, setEmail] = useState('')
  const [user, loading] = useAuthState(auth)
  const navigate = useNavigate()

  useEffect(() => {
    if (loading) return
    if (user) navigate('/')
  }, [user, loading, navigate])

  return (
    <div className="auth">
      <div className="auth__container">
        <input
          type='email'
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder='E-mail'
        />
        <button className="login" onClick={() => sendPasswordReset(email)}>
          Send recovery e-mail
        </button>
        <div className="link-container">
          No account yet? <Link to="/register">Sign Up</Link>
        </div>
        <div className="link-container">
          Got account? <Link to="/login">Sign In</Link>
        </div>
      </div>
    </div>
  )
}
