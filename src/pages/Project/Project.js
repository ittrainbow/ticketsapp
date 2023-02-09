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
import { getNewTicketIdHelper, sortTicketsHelper } from '../../helpers'

export const Project = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const [user] = useAuthState(auth)
  const { uid } = user
  const { appContext, usersContext } = useContext(Context)
  const { project } = appContext

  const [tickets, setTickets] = useState()
  const [queue, setQueue] = useState([])
  const [modalOpen, setModalOpen] = useState(false)
  const [tempTicket, setTempTicket] = useState()
  const [filter, setFilter] = useState('all')
  const [sort, setSort] = useState('touchdesc')

  useEffect(() => {
    if (!project) navigate('/')
    fetch() // eslint-disable-next-line
  }, [])

  useEffect(() => {
    if (tickets) sortTickets(sort) // eslint-disable-next-line
  }, [tickets])

  const createTicket = () => {
    const date = new Date().getTime()

    setTempTicket({
      id: getNewTicketIdHelper(tickets),
      created: date,
      touched: date,
      creator: uid,
      toucher: uid,
      fixed: false,
      functional: false,
      severityhigh: false,
      issue: '',
      solution: ''
    })

    setModalOpen(true)
  }

  const sortTickets = (style) => {
    if (tickets) {
      const resp = sortTicketsHelper(tickets, style)
      const array = Object.keys(resp).map((el) => resp[el])
      setQueue(array)
    }
  }

  const fetch = async () => {
    const link = project ? project : window.location.pathname.split('/').slice(-1).toString()
    try {
      await getDocs(collection(db, 'projects', link, 'issues')).then((response) => {
        const object = {}
        response.forEach((el) => (object[el.id] = el.data()))
        setTickets(object, 'touchdesc')
      })
    } catch (error) {
      console.error(error)
    } finally {
      sortTickets()
    }
  }

  const isotime = (timestamp) => {
    return moment(timestamp).format().substring(0, 16).replace(/T/g, ' ')
  }

  const submitHandler = async () => {
    try {
      dispatch(setLoading(true))
      const data = { ...tempTicket, toucher: uid, touched: new Date().getTime() }
      delete data['id']
      setTickets({ ...tickets, id: tempTicket })
      const { id } = tempTicket
      await setDoc(doc(db, 'projects', project, 'issues', id), data)
    } catch (error) {
      console.error(error)
    } finally {
      dispatch(setLoading(false))
    }
  }

  const openModalHandler = (value, el) => {
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
    setSort(style)
    return sortTickets(style)
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
          <div className="card__creator">
            <Button onClick={createTicket} className="create-button">
              Create ticket
            </Button>
          </div>
          {tickets
            ? queue.map((el, index) => {
                const {
                  issue,
                  created,
                  creator,
                  severityhigh,
                  id,
                  functional,
                  fixed,
                  touched,
                  toucher
                } = el

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
                        onClick={() => openModalHandler(tickets[id])}
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
