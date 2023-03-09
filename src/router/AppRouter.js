import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { CircularProgress, Stack } from '@mui/material'

import { ProjectList, Project, Home, Login, Register, UserPage, Reset, Profile } from '../pages'
import { Header } from '../UI/Header'
import { useAppContext } from '../context/context'

const AppRouter = () => {
  const { appContext } = useAppContext()
  const { loading } = appContext

  return (
    <BrowserRouter>
      <Header />
      <Stack sx={{ padding: '0 15px' }}>
        {loading ? (
          <Stack sx={{ display: 'flex', width: '100%', alignItems: 'center', paddingTop: 15 }}>
            <CircularProgress color="inherit" />
          </Stack>
        ) : (
          <Routes>
            <Route exact path="/login" element={<Login />} />
            <Route exact path="/register" element={<Register />} />
            <Route exact path="/reset" element={<Reset />} />
            <Route exact path="/dashboard" element={<UserPage />} />
            <Route exact path="/profile" element={<Profile />} />
            <Route exact path="/list" element={<ProjectList />} />
            <Route exact path="/" element={<Home />} />
            <Route path="/project/:id" element={<Project />} />
          </Routes>
        )}
      </Stack>
    </BrowserRouter>
  )
}

export default AppRouter
