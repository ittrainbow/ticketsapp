import React, { useEffect, useState } from 'react'
import { useAuthState } from 'react-firebase-hooks/auth'
import { useNavigate } from 'react-router-dom'
import { Button, Stack, OutlinedInput } from '@mui/material'

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
    <Stack mt={10} alignItems="center">
      <Stack direction="column" spacing={1} width={250} alignItems="center">
        <OutlinedInput
          sx={{ height: '50px', width: '250px' }}
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="E-mail"
        />
        <Button variant="contained" color='secondary' onClick={() => sendPasswordReset(email)}>
          Send recovery e-mail
        </Button>
        <Button variant="outlined" onClick={() => navigate('/register')}>
          Sign Up
        </Button>
        <Button variant="outlined" onClick={() => navigate('/login')}>
          Log In
        </Button>
      </Stack>
    </Stack>
  )
}
