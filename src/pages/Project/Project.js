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
import { Button, FormControl, InputLabel, MenuItem, Select } from '@mui/material'
import moment from 'moment/moment'

import './Project.scss'
import '../../styles/cards.scss'
import '../../styles/filters.scss'

import { db, auth } from '../../db'
import { Context } from '../../App'
import { setLoading } from '../../redux/actions'
import { ticketModal } from '../../UI'

export const Project = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const [user] = useAuthState(auth)
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
      const data = { ...tempTicket, toucher: user.uid, touched: new Date().getTime() }
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

  return (
    <div>
      <div className="filters">
        <FormControl sx={{ m: 1, minWidth: 80 }} size="small">
          <InputLabel id="demo-simple-select-label">Filter</InputLabel>
          <Select
            labelId="demo-select-small"
            id="demo-select-small"
            value={filter}
            label="Filter"
            onChange={(e) => setFilter(e.target.value)}
          >
            <MenuItem value={'all'}>All</MenuItem>
            <MenuItem value={'open'}>Open</MenuItem>
          </Select>
        </FormControl>
        <FormControl sx={{ m: 1, minWidth: 150 }} size="small">
          <InputLabel id="demo-simple-select-label">Sort</InputLabel>
          <Select
            labelId="demo-select-small"
            id="demo-select-small"
            value={sort}
            label="Age"
            onChange={(e) => sortHandler(e.target.value)}
          >
            <MenuItem value={'touchasc'}>Touched ascending</MenuItem>
            <MenuItem value={'touchdesc'}>Touched descending</MenuItem>
            <MenuItem value={'createasc'}>Created ascending</MenuItem>
            <MenuItem value={'createdesc'}>Created descending</MenuItem>
          </Select>
        </FormControl>
      </div>

      <div className="container">
        <div className="card__container">
          {tickets
            ? Object.keys(tickets).map((el, index) => {
                const {
                  issue,
                  created,
                  creator,
                  severityhigh,
                  functional,
                  fixed,
                  touched,
                  toucher
                } = tickets[el]

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
