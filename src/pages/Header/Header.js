import React, { useState } from 'react'
import { useAuthState } from 'react-firebase-hooks/auth'
import {
  MdHighlightOff,
  MdOpenWith,
  MdLogout,
  MdAccountCircle,
  MdLibraryAdd,
  MdViewList
} from 'react-icons/md'
import { useNavigate } from 'react-router-dom'

import { auth, logout } from '../../db'

import './Header.scss'

export const Header = () => {
  const navigate = useNavigate()
  const [open, setOpen] = useState(false)
  const [user] = useAuthState(auth)

  const onClickHandler = ({ id }, authRequired) => {
    if (user || !authRequired) {
      setOpen(false)

      switch (id) {
        case 'toggler':
          setOpen(!open)
          return
        case 'dashboard':
          user ? navigate('/dashboard') : navigate('/login')
          return
        case 'new':
          return
        case 'list':
          navigate('/')
          return
        case 'logout':
          navigate('/login')
          logout()
          return
        default:
          return
      }
    }
  }

  const icons = [
    { id: 'toggler', icon: open ? <MdHighlightOff /> : <MdOpenWith /> },
    { id: 'dashboard', icon: open ? <MdAccountCircle /> : null }
  ]

  const iconsAuth = [
    { id: 'new', icon: open ? <MdLibraryAdd /> : null },
    { id: 'list', icon: open ? <MdViewList /> : null },
    { id: 'logout', icon: open ? <MdLogout /> : null }
  ]

  const array = user ? icons.concat(iconsAuth) : icons

  return (
    <div>
      <div className={open ? 'header header__show' : 'header'}></div>
      <div>
        {array.map((el, index) => {
          const { id, icon } = el
          return (
            <div
              key={index}
              id={id}
              style={{ left: `calc(5px + ${index * 60}px)` }}
              className="header__icon"
              onClick={(e) => onClickHandler(e.currentTarget)}
            >
              {icon}
            </div>
          )
        })}
      </div>
    </div>
  )
}
