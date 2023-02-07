import React, { useState } from 'react'
import { useAuthState } from 'react-firebase-hooks/auth'
import { useNavigate } from 'react-router-dom'

import './auth.scss'

import { auth } from '../db'

export const Profile = () => {
  const navigate = useNavigate()
  const [user] = useAuthState(auth)
  const { displayName } = user
  const [name, setName] = useState(displayName)

  const submitHandler = () => {

  }

  const noChanges = displayName === name

  return (
    <div className="auth">
      <div className="auth__container">
        <input type="text" onChange={(e) => {setName(e.target.value)}} value={name} />
        <button disabled={displayName === name} onClick={submitHandler}>
          {noChanges ? 'No changes' : 'Save'}
        </button>
        <button onClick={() => navigate(-1)}>Cancel</button>
      </div>
    </div>
  )
}
