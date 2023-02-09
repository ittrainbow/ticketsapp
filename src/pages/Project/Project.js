import React, { useContext, useState, useEffect } from 'react'
import { collection, doc, getDocs, setDoc } from 'firebase/firestore'
import { useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { useAuthState } from 'react-firebase-hooks/auth'
import {
  MdNewReleases,
  MdAccessTimeFilled,
  MdSmartphone,
  MdSettingsApplications,
  MdOutlineCheckBox,
  MdOutlineDoubleArrow
} from 'react-icons/md'
import { Button } from '@mui/material'
import moment from 'moment/moment'

import './Project.scss'
import '../../styles/cards.scss'
import '../../styles/filters.scss'

import { db, auth } from '../../db'
import { Context } from '../../App'
import { setLoading } from '../../redux/actions'
import { Dropdown, ticketModal } from '../../UI'
import { getNewTicketId } from '../../helpers/ticketHelper'

export const Project = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const [user] = useAuthState(auth)
  const { uid } = user
  const { appContext, usersContext } = useContext(Context)
  const { project } = appContext

  const [tickets, setTickets] = useState()
  const [modalOpen, setModalOpen] = useState(false)
  const [tempTicket, setTempTicket] = useState()
  const [filter, setFilter] = useState('all')
  const [sort, setSort] = useState('touchdesc')

  useEffect(() => {
    if (!project) navigate('/')
    fetch() // eslint-disable-next-line
  }, [])

  const createTicket = () => {
    const date = new Date().getTime()

    setTempTicket({
      id: getNewTicketId(tickets),
      created: date,
      creator: uid,
      touched: date,
      toucher: uid,
      fixed: false,
      functional: false,
      issue: '',
      severityhigh: false,
      solution: ''
    })

    setModalOpen(true)
  }

  const sortTickets = (input, style) => {
    setSort(style)
    const sorted = {}

    Object.keys(input)
      .sort((a, b) => {
        switch (style) {
          case 'touchasc':
            return input[a].touched - input[b].touched
          case 'touchdesc':
            return input[b].touched - input[a].touched
          case 'createasc':
            return input[a].created - input[b].created
          case 'createdesc':
            return input[b].created - input[a].created
          default:
            return 0
        }
      })
      .forEach((el, index) => {
        sorted[index] = input[el]
      })

    setTickets(sorted)
  }

  const fetch = async () => {
    const link = project ? project : window.location.pathname.split('/').slice(-1).toString()
    try {
      await getDocs(collection(db, 'projects', link, 'issues')).then((response) => {
        const object = {}
        response.forEach((el) => (object[el.id] = el.data()))
        sortTickets(object, 'touchdesc')
      })
    } catch (error) {
      console.error(error)
    }
  }

  const isotime = (timestamp) => moment(timestamp).format().substring(0, 16).replace(/T/g, ' ')

  const submitHandler = async () => {
    dispatch(setLoading(true))
    try {
      const data = { ...tempTicket, toucher: uid, touched: new Date().getTime() }
      delete data['id']
      setTickets({ ...tickets, id: tempTicket })
      await setDoc(doc(db, 'projects', project, 'issues', tempTicket.id), data)
    } catch (error) {
      console.error(error)
    } finally {
      dispatch(setLoading(false))
    }
  }

  const openModalHandler = (value, el) => {
    value['id'] = el
    setTempTicket(value)
    setModalOpen(true)
  }

  const closeModalHandler = () => {
    setModalOpen(false)
  }

  const drawModal = () => {
    return modalOpen
      ? ticketModal(tempTicket, modalOpen, closeModalHandler, setTempTicket, submitHandler)
      : null
  }

  const sortHandler = (style) => {
    sortTickets(tickets, style)
  }

  const filterDropDown = () => {
    const list = [
      { value: 'all', text: 'All' },
      { value: 'open', text: 'Open' }
    ]

    return Dropdown({
      size: 'small',
      label: 'Filter',
      inputId: 'demo-simple-select-label',
      labelId: 'demo-select-small',
      selectId: 'demo-select-small',
      selectLabel: 'Filter',
      value: filter,
      list,
      minWidth: 90,
      onChange: (e) => setFilter(e.target.value)
    })
  }

  const sortDropDown = () => {
    const list = [
      { value: 'touchasc', text: 'Touched ascending' },
      { value: 'touchdesc', text: 'Touched descending' },
      { value: 'createasc', text: 'Created ascending' },
      { value: 'createdesc', text: 'Created descending' }
    ]

    return Dropdown({
      size: 'small',
      label: 'Sort',
      inputId: 'demo-simple-select-label',
      labelId: 'demo-select-small',
      selectId: 'demo-select-small',
      selectLabel: 'Age',
      value: sort,
      list,
      minWidth: 150,
      onChange: (e) => sortHandler(e.target.value)
    })
  }

  return (
    <div>
      <div className="filters">
        {filterDropDown()}
        {sortDropDown()}
      </div>

      <div className="container">
        <div className="card__container">
          <Button onClick={createTicket} className="create-button">
            create ticket
          </Button>
          {tickets
            ? Object.keys(tickets).map((el, index) => {
                const { issue, created, creator, severityhigh } = tickets[el]
                const { functional, fixed, touched, toucher } = tickets[el]

                return filter !== 'open' || !fixed ? (
                  <div key={index} className="card">
                    <div className="card__body">
                      <div className="card__issue">
                        {issue.substring(0, 80) + (issue.length > 80 ? '{...}' : '')}
                      </div>
                      <div className="card__icons">
                        <div className="card__icons__left">
                          {fixed ? (
                            <MdOutlineCheckBox className="green" />
                          ) : (
                            <MdOutlineDoubleArrow className="red" />
                          )}
                        </div>
                        <div>{severityhigh ? <MdNewReleases /> : <MdAccessTimeFilled />}</div>
                        <div>{functional ? <MdSettingsApplications /> : <MdSmartphone />}</div>
                      </div>
                      <div className="card__time">
                        <div>
                          Created {isotime(created)} ({usersContext[creator].name})
                        </div>
                        <div>
                          Touched {isotime(touched)} ({usersContext[toucher].name})
                        </div>
                      </div>
                      <Button
                        onClick={() => openModalHandler(tickets[el], el)}
                        className="card__button"
                      >
                        View ticket
                      </Button>
                      {drawModal()}
                    </div>
                  </div>
                ) : null
              })
            : null}
        </div>
      </div>
    </div>
  )
}
