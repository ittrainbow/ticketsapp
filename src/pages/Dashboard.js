import React from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuthState } from 'react-firebase-hooks/auth'
import { Button, Stack } from '@mui/material'

import { logout } from '../db/auth'
import { auth } from '../db'

export const Dashboard = () => {
  const [user] = useAuthState(auth)
  const navigate = useNavigate()

  const logoutHandler = () => {
    logout()
    navigate('/login')
  }

  return (
    <Stack mt={10} alignItems="center">
      <Stack direction="column" spacing={1} width={250} alignItems="center">
        <Stack>Name: {user ? user.displayName : '...fetching'}</Stack>
        <Stack>E-mail: {user ? user.email : '...fetching'}</Stack>
        <Button variant="contained" color="secondary" onClick={() => navigate('/profile')}>
          Edit profile
        </Button>
        <Button variant="outlined" onClick={logoutHandler}>
          Log Out
        </Button>
      </Stack>
    </Stack>
  )
}
