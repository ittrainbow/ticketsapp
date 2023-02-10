import React, { useState, useContext } from 'react'
import { useAuthState } from 'react-firebase-hooks/auth'
import { useNavigate } from 'react-router-dom'
import { Button, Input } from '@mui/material'
import { useDispatch } from 'react-redux'
import { setDoc, doc } from 'firebase/firestore'

import './auth.scss'

import { auth, db } from '../db'
import { Context } from '../App'
import { setLoading } from '../redux/actions'

export const Profile = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const [user] = useAuthState(auth)
  const { uid } = user
  const { usersContext, setUsersContext } = useContext(Context)
  const { name } = usersContext[uid]
  const [tempName, setTempName] = useState(name)

  const submitHandler = async () => {
    dispatch(setLoading(true))
    try {
      const data = structuredClone(usersContext)
      data[uid]['name'] = tempName
      setUsersContext(data)
      await setDoc(doc(db, 'users', uid), data[uid])
    } catch (error) {
      console.error(error)
    }
    dispatch(setLoading(false))
    navigate(-1)
  }

  const noChanges = name === tempName

  return (
    <div className="auth">
      <div className="auth__container">
        <Input type={'text'} onChange={(e) => setTempName(e.target.value)} value={tempName} />
        <Button disabled={noChanges} onClick={submitHandler}>
          {noChanges ? 'No changes' : 'Save'}
        </Button>
        <Button onClick={() => navigate(-1)}>Cancel</Button>
      </div>
    </div>
  )
}
