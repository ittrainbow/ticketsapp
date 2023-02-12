import React, { useContext, useState, useEffect } from 'react'
import { collection, doc, getDocs, setDoc, query } from 'firebase/firestore'
import { useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { useAuthState } from 'react-firebase-hooks/auth'
import { MdNewReleases, MdOutlineCheckBox } from 'react-icons/md'
import { Button } from '@mui/material'
import moment from 'moment/moment'

import './Project.scss'
import '../../styles/cards.scss'
import '../../styles/filters.scss'

import { db, auth } from '../../db'
import { Context } from '../../App'
import { setLoading } from '../../redux/actions'
import { Dropdown, TicketModal } from '../../UI'
import { getNewTicketHelper, sortTicketsHelper } from '../../helpers'

export const Project = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const [user] = useAuthState(auth)
  const { appContext, setAppContext, usersContext } = useContext(Context)
  const { project } = appContext

  const [tickets, setTickets] = useState()
  const [queue, setQueue] = useState([])
  const [modalOpen, setModalOpen] = useState(false)
  const [tempTicket, setTempTicket] = useState()
  const [filter, setFilter] = useState('all')
  const [sort, setSort] = useState('touchdesc')

  useEffect(() => {
    if (!project) navigate('/')
    fetch()
    setAppContext({ ...appContext, headerOpen: false }) // eslint-disable-next-line
  }, [])

  useEffect(() => {
    if (tickets) sortTickets(sort) // eslint-disable-next-line
  }, [tickets])

  const iconSeverity = (severity, status) => {
    return status === 'done' ? (
      <MdOutlineCheckBox className="grey" />
    ) : (
      <MdNewReleases
        className={severity === 'high' ? 'red' : severity === 'avg' ? 'orange' : 'yellow'}
      />
    )
  }

  const createTicket = () => {
    const date = new Date().getTime()
    const { uid } = user
    const { id, number } = getNewTicketHelper(tickets)

    setTempTicket({
      id,
      number,
      created: date,
      touched: date,
      creator: uid,
      toucher: uid,
      status: '',
      problem: '',
      severity: '',
      issue: '',
      description: '',
      solution: ''
    })

    setModalOpen(true)
  }

  const sortTickets = (style) => {
    if (tickets) {
      const resp = sortTicketsHelper(tickets, style)
      const queue = Object.keys(resp).map((el) => resp[el])
      setQueue(queue)
    }
  }

  const fetch = async () => {
    const link = project ? project : window.location.pathname.split('/').slice(-1).toString()
    try {
      await getDocs(query(collection(db, 'projects', link, 'issues'))).then((response) => {
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
    const { uid } = user
    try {
      dispatch(setLoading(true))
      const data = { ...tempTicket, toucher: uid, touched: new Date().getTime() }
      delete data['id']
      setTickets({ ...tickets, id: tempTicket })
      const { id } = tempTicket
      await setDoc(doc(db, 'projects', project, 'issues', id.toString()), data)
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
      ? TicketModal({
          tempTicket,
          modalOpen,
          closeModalHandler,
          setTempTicket,
          submitHandler,
          user
        })
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
      maxWidth: 170,
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
      maxWidth: 170,
      onChange: (e) => sortHandler(e.target.value)
    })
  }

  return (
    <>
      <div className="filters">
        {filterDropDown()}
        {sortDropDown()}
      </div>

      <div className="container">
        <Button onClick={createTicket} disabled={!user}>
          Create ticket
        </Button>{' '}
        <div className="card-container">
          {tickets
            ? queue.map((el, index) => {
                const {
                  number,
                  issue,
                  created,
                  creator,
                  id,
                  severity,
                  status,
                  problem,
                  touched,
                  toucher
                } = el

                return filter !== 'open' || status !== 'done' ? (
                  <div key={index} className="card">
                    <div className="card__body">
                      <div className="card__header">Ticket #{number}</div>
                      <div className="card__issue">
                        {issue.length > 70 ? issue.substring(0, 70) + '{...}' : issue}
                      </div>
                      <div className="card__desc">
                        <div className="card__desc__icon">{iconSeverity(severity, status)}</div>
                        <div className="card__desc__status">
                          <div className="flex">
                            <div className="w40">Class:</div>
                            {problem === 'ui' ? 'UI' : 'Functional'}
                          </div>
                          <div className="flex">
                            <div className="w40">Status:</div>
                            <div className={status === 'totest' ? 'green' : ''}>
                            {status === 'work'
                              ? 'In work'
                              : status === 'new'
                              ? 'New'
                              : status !== 'totest'
                              ? 'Closed'
                              : 'Ready for re-test'}</div>
                          </div>
                        </div>
                      </div>
                      <div className="card__timestamps">
                        <div className="w40">Created:</div>
                        <div>
                          {isotime(created)} by {usersContext[creator].name}
                        </div>
                      </div>
                      <div className="card__timestamps">
                        <div className="w40">Edited:</div>{' '}
                        <div>
                          {isotime(touched)} by {usersContext[toucher].name}
                        </div>
                      </div>
                      <Button
                        onClick={() => openModalHandler(tickets[id])}
                        className="card__button"
                      >
                        View ticket
                      </Button>
                    </div>
                  </div>
                ) : null
              })
            : null}
        </div>
      </div>
      {drawModal()}
    </>
  )
}
