import React, { useEffect, useReducer } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuthState } from 'react-firebase-hooks/auth'

import { auth, logInWithEmailAndPassword, signInWithGoogle } from '../db'

const initialState = {
  email: '',
  emailValid: false,
  password: ''
}

const reducer = (state, action) => {
  switch (action.type) {
    case 'EMAIL':
      return { ...state, email: action.payload }
    case 'EMAIL_VALID':
      return { ...state, emailValid: action.payload }
    case 'PASSWORD':
      return { ...state, password: action.payload }
    default:
      return state
  }
}

export const Login = () => {
  const [state, dispatch] = useReducer(reducer, initialState)
  const { email, emailValid, password } = state
  const [user, loading, error] = useAuthState(auth)
  const navigate = useNavigate()

  const loginButtonActive = emailValid && password.length > 2

  useEffect(() => {
    if (loading) return
    if (user) navigate('/dashboard')
    if (error) alert(error)
  }, [user, loading, error, navigate])

  const emailInputHandler = (email) => {
    const checkEmailValid = /\S+@\S+\.\S+/.test(email)

    dispatch({ type: 'EMAIL', payload: email })
    dispatch({ type: 'EMAIL_VALID', payload: checkEmailValid })
  }

  return (
    <div className="auth">
      <div className="auth__container">
        <input
          type='text'
          value={email}
          onChange={(e) => emailInputHandler(e.target.value)}
          placeholder='E-mail'
        />
        <input
          type='password'
          value={password}
          onChange={(e) => dispatch({ type: 'PASSWORD', payload: e.target.value })}
          placeholder={'Password'}
        />
        <button
          className={'login'}
          disabled={!loginButtonActive}
          onClick={() => logInWithEmailAndPassword(email, password)}
        >
          Sign In
        </button>
        <button className="google" onClick={signInWithGoogle}>
          Google Sign In
        </button>
        <div className="link-container">
          <Link to="/reset">Recover Password</Link>
        </div>
        <div className="link-container">
          No account yet? <Link to="/register">Sign Up</Link>
        </div>
      </div>
    </div>
  )
}
