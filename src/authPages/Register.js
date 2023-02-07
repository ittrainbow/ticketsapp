import React, { useEffect, useReducer } from 'react'
import { useAuthState } from 'react-firebase-hooks/auth'
import { Link, useNavigate } from 'react-router-dom'

import { auth } from '../db/firebase'
import { registerWithEmailAndPassword, signInWithGoogle } from '../db/auth'

const initialState = {
  email: '',
  password: '',
  name: ''
}

const reducer = (state, action) => {
  switch (action.type) {
    case 'EMAIL':
      return { ...state, email: action.payload }
    case 'PASSWORD':
      return { ...state, password: action.payload }
    case 'NAME':
      return { ...state, name: action.payload }
    default:
      return state
  }
}

export const Register = () => {
  const [state, dispatch] = useReducer(reducer, initialState)
  const { email, password, name } = state
  const [user, loading] = useAuthState(auth)
  const navigate = useNavigate()

  const register = () => {
    if (!name) alert('Please enter name')
    if (!email) alert('Please enter Email')
    if (password.length < 3) alert('Please type password of 3 chars or more')
    else registerWithEmailAndPassword(name, email, password)
  }

  useEffect(() => {
    if (loading) return
    if (user) navigate('/dashboard')
  }, [loading, user, navigate])

  return (
    <div className="auth">
      <div className="auth__container">
        <input
          type='text'
          value={name}
          onChange={(e) => dispatch({ type: 'NAME', payload: e.target.value })}
          placeholder='Name'
        />
        <input
          type='email'
          value={email}
          onChange={(e) => dispatch({ type: 'EMAIL', payload: e.target.value })}
          placeholder='E-mail'
        />
        <input
          type='password'
          value={password}
          onChange={(e) => dispatch({ type: 'PASSWORD', payload: e.target.value })}
          placeholder='Password'
        />
        <button className="login" onClick={register}>
          Sign Up
        </button>
        <button className="google" onClick={signInWithGoogle}>
          Google Sign Up
        </button>
        <div className="link-container">
          Got account? <Link to="/login">Sign In</Link>
        </div>
      </div>
    </div>
  )
}
