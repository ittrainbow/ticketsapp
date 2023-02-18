import React, { useEffect, useReducer } from 'react'
import { useAuthState } from 'react-firebase-hooks/auth'
import { useNavigate } from 'react-router-dom'
import { Button, Stack, OutlinedInput } from '@mui/material'

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
    <Stack mt={10} alignItems="center">
      <Stack direction="column" spacing={1} width={220} alignItems="center">
        <OutlinedInput
          sx={{ height: '40px' }}
          type="text"
          value={name}
          onChange={(e) => dispatch({ type: 'NAME', payload: e.target.value })}
          placeholder="Name"
        />
        <OutlinedInput
          sx={{ height: '40px' }}
          type="email"
          value={email}
          onChange={(e) => dispatch({ type: 'EMAIL', payload: e.target.value })}
          placeholder="E-mail"
        />
        <OutlinedInput
          sx={{ height: '40px' }}
          type="password"
          value={password}
          onChange={(e) => dispatch({ type: 'PASSWORD', payload: e.target.value })}
          placeholder="Password"
        />
        <Button variant="contained" fullWidth={true} color="secondary" onClick={register}>
          Sign Up New User
        </Button>
        <Button variant="contained" fullWidth={true} color="primary" onClick={signInWithGoogle}>
          Google Sign Up
        </Button>
        <Button variant="outlined" fullWidth={true} onClick={() => navigate('/login')}>
          Log In
        </Button>
      </Stack>
    </Stack>
  )
}
