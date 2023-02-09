import React, { useState } from 'react'
import {
  MdHighlightOff,
  MdOpenWith,
  MdLogout,
  MdAccountCircle,
  MdLibraryAdd,
  MdViewList
} from 'react-icons/md'
import { useNavigate } from 'react-router-dom'
import { logout } from '../../db'

import './Header.scss'

export const Header = () => {
  const navigate = useNavigate()
  const [open, setOpen] = useState(false)

  const onClickHandler = ({ id }) => {
    setOpen(false)

    switch (id) {
      case 'toggler':
        setOpen(!open)
        return
      case 'dashboard':
        navigate('/dashboard')
        return
      case 'new':
        return
      case 'list':
        navigate('/list')
        return
      case 'logout':
        navigate('/login')
        logout()
        return
      default:
        return
    }
  }

  const icons = [
    { id: 'toggler', icon: open ? <MdHighlightOff /> : <MdOpenWith /> },
    { id: 'dashboard', icon: open ? <MdAccountCircle /> : null },
    { id: 'new', icon: open ? <MdLibraryAdd /> : null },
    { id: 'list', icon: open ? <MdViewList /> : null },
    { id: 'logout', icon: open ? <MdLogout /> : null }
  ]

  return (
    <div>
      <div className={open ? 'header header__show' : 'header'}></div>
      <div>
        {Object.keys(icons).map((el, index) => {
          const { id, icon } = icons[el]
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
