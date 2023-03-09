import React, { useState } from 'react'
import { useAuthState } from 'react-firebase-hooks/auth'
import { useNavigate } from 'react-router-dom'
import { Button, OutlinedInput, Stack } from '@mui/material'
import { setDoc, doc } from 'firebase/firestore'

import { auth, db } from '../db'
import { useAppContext } from '../context/context'

export const Profile = () => {
  const navigate = useNavigate()
  const [user] = useAuthState(auth)
  const { uid } = user
  const { usersContext, setUsersContext, setLoading } = useAppContext()
  const { name } = usersContext[uid]
  const [tempName, setTempName] = useState(name)

  const submitHandler = async () => {
    setLoading(true)
    try {
      const data = structuredClone(usersContext)
      data[uid]['name'] = tempName
      setUsersContext(data)
      await setDoc(doc(db, 'users', uid), data[uid])
    } catch (error) {
      console.error(error)
    }
    setLoading(false)
    navigate(-1)
  }

  const noChanges = name === tempName

  return (
    <Stack mt={10} alignItems="center">
      <Stack direction="column" spacing={1} width={220} alignItems="center">
        <OutlinedInput
          sx={{ height: '40px' }}
          type={'text'}
          onChange={(e) => setTempName(e.target.value)}
          value={tempName}
        />
        <Button
          variant="contained"
          color="secondary"
          fullWidth={true}
          disabled={noChanges}
          onClick={submitHandler}
        >
          {noChanges ? 'No changes' : 'Save'}
        </Button>
        <Button variant="outlined" fullWidth={true} onClick={() => navigate(-1)}>
          Cancel
        </Button>
      </Stack>
    </Stack>
  )
}
