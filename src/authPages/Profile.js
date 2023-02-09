import React, { useState } from 'react'
import { useAuthState } from 'react-firebase-hooks/auth'
import { useNavigate } from 'react-router-dom'
import { Button, Input } from '@mui/material'

import './auth.scss'

import { auth } from '../db'

export const Profile = () => {
  const navigate = useNavigate()
  const [user] = useAuthState(auth)
  // const { displayName } = user
  const [name, setName] = useState(user ? auth.currentUser : '')

  const submitHandler = () => {

  }

  const noChanges = user ? auth.currentUser.name === name : true

  return (
    <div className="auth">
      <div className="auth__container">
        <Input type="text" onChange={(e) => {setName(e.target.value)}} value={name} />
        <Button disabled={noChanges} onClick={submitHandler}>
          {noChanges ? 'No changes' : 'Save'}
        </Button>
        <Button onClick={() => navigate(-1)}>Cancel</Button>
      </div>
    </div>
  )
}
