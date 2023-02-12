import React, { useContext } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'

import { Login, Register, UserPage, Reset, Profile } from '../authPages'
import { Loader } from '../UI'
import { Header, ProjectList, Project, Home } from '../pages'

import { Context } from '../App'

const AppRouter = () => {
  const { appContext } = useContext(Context)
  const { loading } = appContext

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
          <Route exact path="/list" element={<ProjectList />} />
          <Route exact path="/" element={<Home />} />
          <Route path="/project/:id" element={<Project />} />
        </Routes>
      )}
    </BrowserRouter>
  )
}

export default AppRouter
