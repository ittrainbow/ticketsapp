import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { useSelector } from 'react-redux'

import { Login, Register, UserPage, Reset, Profile } from '../authPages'
import { Loader } from '../UI'
import { Header, ProjectList, Project } from '../pages'

const AppRouter = () => {
  const { loading } = useSelector((state) => state)

  return (
    <BrowserRouter>
      <Header />
      {loading ? (
        <Loader />
      ) : (
        <Routes>
          <Route exact path="/login" element={<Login />} />
          <Route exact path="/register" element={<Register />} />
          <Route exact path="/reset" element={<Reset />} />
          <Route exact path="/dashboard" element={<UserPage />} />
          <Route exact path="/profile" element={<Profile />} />
          <Route exact path="/" element={<ProjectList />} />
          <Route path="/project/:id" element={<Project />} />
        </Routes>
      )}
    </BrowserRouter>
  )
}

export default AppRouter
