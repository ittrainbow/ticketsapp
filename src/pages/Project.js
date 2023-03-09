import React, { useState, useEffect } from 'react'
import { collection, doc, getDocs, setDoc, query } from 'firebase/firestore'
import { useNavigate } from 'react-router-dom'
import { useAuthState } from 'react-firebase-hooks/auth'
import { Button, Stack, Grid, Typography } from '@mui/material'
import { makeStyles } from '@material-ui/core'
import moment from 'moment/moment'

import { db, auth } from '../db'
import { useAppContext } from '../context/context'
import { Dropdown } from '../UI/Dropdown'
import { Ticket } from '../UI/Ticket'
import {
  iconPickerHepler,
  textPickerHelper,
  getNewTicketHelper,
  sortTicketsHelper
} from '../helpers/helpers'
import { filterList, sortList } from '../helpers/helpers'

const useStyles = makeStyles({
  card: {
    transition: '0.1s',
    width: '100%',
    maxWidth: 400,
    '&:hover': { transform: 'scale(1.04)' }
  },
  font12: {
    fontSize: '12px'
  },
  gridItem: {
    border: '2px solid lightgrey',
    borderRadius: '5px',
    padding: '10px'
  }
})

export const Project = () => {
  const classes = useStyles()
  const navigate = useNavigate()
  const [user] = useAuthState(auth)
  const { appContext, setAppContext, usersContext, setLoading } = useAppContext()
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
      setLoading(true)
      const data = { ...tempTicket, toucher: uid, touched: new Date().getTime() }
      delete data['id']
      setTickets({ ...tickets, id: tempTicket })
      const { id } = tempTicket
      await setDoc(doc(db, 'projects', project, 'issues', id.toString()), data)
    } catch (error) {
      console.error(error)
    } finally {
      setLoading(false)
    }
  }

  const openModalHandler = (value, el) => {
    setTempTicket(value)
    setModalOpen(true)
  }

  const drawModal = () => {
    return modalOpen
      ? Ticket({
          tempTicket,
          modalOpen,
          setModalOpen,
          setTempTicket,
          submitHandler,
          user
        })
      : null
  }

  const sortHandler = (style) => {
    setSort(style)
    sortTickets(style)
  }

  const filterDropDown = () => {
    return Dropdown({
      size: 'small',
      label: 'Filter',
      inputId: 'demo-simple-select-label',
      value: filter,
      list: filterList,
      maxWidth: 170,
      onChange: (e) => setFilter(e.target.value)
    })
  }

  const sortDropDown = () => {
    return Dropdown({
      size: 'small',
      label: 'Sort',
      inputId: 'demo-simple-select-label',
      selectLabel: 'Age',
      value: sort,
      list: sortList,
      maxWidth: 170,
      onChange: (e) => sortHandler(e.target.value)
    })
  }

  return (
    <Stack mb={2}>
      <Stack direction="row" ml={6}>
        <Stack width={105}>{filterDropDown()}</Stack>
        <Stack>{sortDropDown()}</Stack>
      </Stack>
      <Button onClick={createTicket} disabled={!user}>
        Create ticket
      </Button>
      <Grid container spacing={2}>
        {tickets
          ? queue.map((el) => {
              const { number, issue, created, creator, id } = el
              const { severity, status, problem, touched, toucher } = el

              return filter !== 'open' || status !== 'done' ? (
                <Grid item key={touched} className={classes.card}>
                  <Stack spacing={1} height={210} className={classes.gridItem}>
                    <Typography variant="h6">Ticket #{number}</Typography>
                    <Stack minHeight={40}>
                      <Typography variant="body2">
                        {issue.length > 70 ? issue.substring(0, 70) + '{...}' : issue}
                      </Typography>
                    </Stack>
                    <Stack spacing={1} direction="row">
                      <Stack>{iconPickerHepler(severity, status)}</Stack>
                      <Stack direction="column">
                        <Typography className={classes.font12}>Class:</Typography>
                        <Typography className={classes.font12}>Status:</Typography>
                      </Stack>
                      <Stack>
                        <Typography className={classes.font12}>
                          {problem === 'ui' ? 'UI' : 'Functional'}
                        </Typography>
                        <Typography
                          className={classes.font12}
                          color={status === 'totest' ? 'green' : 'black'}
                          fontWeight={600}
                        >
                          {textPickerHelper(status)}
                        </Typography>
                      </Stack>
                    </Stack>
                    <Stack direction="row" spacing={1}>
                      <Stack direction="column">
                        <Typography className={classes.font12} fontSize={13}>
                          Created:
                        </Typography>
                        <Typography className={classes.font12}>Edited:</Typography>
                      </Stack>
                      <Stack direction="column">
                        <Typography className={classes.font12}>
                          {isotime(created)} by {usersContext[creator].name}
                        </Typography>
                        <Typography className={classes.font12}>
                          {isotime(touched)} by {usersContext[toucher].name}
                        </Typography>
                      </Stack>
                    </Stack>
                    <Button onClick={() => openModalHandler(tickets[id])}>View ticket</Button>
                  </Stack>
                </Grid>
              ) : null
            })
          : null}
      </Grid>
      {drawModal()}
    </Stack>
  )
}
