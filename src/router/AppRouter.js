import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { useSelector } from 'react-redux'

import { Login, Register, Dashboard, Reset, Profile } from '../authPages'
import { PrivateRoute } from './PrivateRoute'
import { RainbowLoader } from '../UI'
import { Header, ProjectList, Project } from '../pages'

const AppRouter = () => {
  const { loading } = useSelector((state) => state)

  return (
    <BrowserRouter>
      <Header />
      {loading ? (
        <RainbowLoader />
      ) : (
        <Routes>
          <Route exact path="/login" element={<Login />} />
          <Route exact path="/register" element={<Register />} />
          <Route exact path="/reset" element={<Reset />} />

          <Route exact path="/" element={<PrivateRoute />}>
            <Route exact path="/dashboard" element={<Dashboard />} />
            <Route exact path="/profile" element={<Profile />} />
            <Route exact path="/list" element={<ProjectList />} />
            <Route exact path="/" element={<ProjectList />} />
            <Route path="/project/:id" element={<Project />} />
          </Route>
        </Routes>
      )}
    </BrowserRouter>
  )
}

export default AppRouter
