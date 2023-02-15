import React, { useContext } from 'react'
import { useAuthState } from 'react-firebase-hooks/auth'
import {
  MdHighlightOff,
  MdOpenWith,
  MdLogout,
  MdAccountCircle,
  MdFormatListNumbered
} from 'react-icons/md'
import { useNavigate } from 'react-router-dom'

import './Header.scss'

import { auth, logout } from '../../db'
import { Context } from '../../App'

export const Header = () => {
  const { appContext, setAppContext } = useContext(Context)
  const { headerOpen } = appContext
  const navigate = useNavigate()
  const [user] = useAuthState(auth)

  const onClickHandler = ({ id }, authRequired) => {
    if (user || !authRequired) {
      setAppContext({ ...appContext, headerOpen: false})

      switch (id) {
        case 'toggler':
          if (!headerOpen) setAppContext({ ...appContext, headerOpen: true})
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
    { id: 'toggler', icon: headerOpen ? <MdHighlightOff /> : <MdOpenWith /> },
    { id: 'dashboard', icon: headerOpen ? <MdAccountCircle /> : null }
  ]

  const iconsAuth = [
    { id: 'list', icon: headerOpen ? <MdFormatListNumbered /> : null },
    { id: 'logout', icon: headerOpen ? <MdLogout /> : null }
  ]

  const array = user ? icons.concat(iconsAuth) : icons

  return (
    <div>
      <div className={headerOpen ? 'header header__show' : 'header'}></div>
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
