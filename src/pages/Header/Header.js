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

  const header = ['header-bg']
  header.push(open ? 'header-bg__show' : 'header-bg__hide')

  const toggler = ['icon__toggler']
  toggler.push(open ? 'icon__toggler__open' : 'icon__toggler__closed')

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
    { id: 'toggler', style: toggler.join(' '), icon: open ? <MdHighlightOff /> : <MdOpenWith /> },
    { id: 'dashboard', style: 'icon__profile', icon: open ? <MdAccountCircle /> : null },
    { id: 'new', style: 'icon__new-app', icon: open ? <MdLibraryAdd /> : null },
    { id: 'list', style: 'icon__list', icon: open ? <MdViewList /> : null },
    { id: 'logout', style: 'icon__logout', icon: open ? <MdLogout /> : null }
  ]

  return (
    <div className={header.join(' ')}>
      {Object.keys(icons).map((el, index) => {
        const { id, style, icon } = icons[el]
        const cls = 'icon ' + style
        return (
          <div key={index} className={cls} id={id} onClick={(e) => onClickHandler(e.currentTarget)}>
            {icon}
          </div>
        )
      })}
    </div>
  )
}
