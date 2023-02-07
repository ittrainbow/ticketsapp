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

import { db, auth } from '../../db'
import { Context } from '../../App'
import { setLoading } from '../../redux/actions'
import { ticketModal } from '../../UI'

export const Project = () => {
  const [user] = useAuthState(auth)
  const { uid } = user
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const { appContext, usersContext } = useContext(Context)
  const { project } = appContext
  const [tickets, setTickets] = useState(null)
  const [open, setOpen] = useState(false)
  const [tempTicket, setTempTicket] = useState()

  useEffect(() => {
    if (!project) navigate('/list')
    fetch() // eslint-disable-next-line
  }, [])

  const fetch = async () => {
    if (project) {
      try {
        await getDocs(collection(db, 'projects', project, 'issues')).then((response) => {
          const obj = {}
          response.forEach((el) => {
            obj[el.id] = el.data()
          })
          setTickets(obj)
        })
      } catch (error) {
        console.error(error)
      }
    }
  }

  const isotime = (timestamp) => moment(timestamp).format().substring(0, 16).replace(/T/g, ' ')

  const submitHandler = async () => {
    dispatch(setLoading(true))
    const data = { ...tempTicket, lasttoucher: uid, lasttouched: new Date().getTime() }
    delete data['id']
    try {
      await setDoc(doc(db, 'projects', project, 'issues', tempTicket.id), data)
      setTickets({ ...tickets, id: tempTicket })
    } catch (error) {
      console.error(error)
    } finally {
      dispatch(setLoading(false))
    }
  }

  const openModalHandler = (value, el) => {
    value['id'] = el
    setTempTicket(value)
    setOpen(true)
  }

  const closeModalHandler = () => {
    setOpen(false)
  }

  const showTempTicket = () => {
    console.log('tempTicket', tempTicket)
    console.log('open', open)
  }

  const drawModal = () => {
    return open
      ? ticketModal(
          tempTicket,
          open,
          closeModalHandler,
          setTempTicket,
          submitHandler,
          showTempTicket
        )
      : null
  }

  return (
    <div className="container">
      <div className="card__container">
        {tickets
          ? Object.keys(tickets).map((el, index) => {
              const { issue, created, creator, severityhigh } = tickets[el]
              const { functional, fixed, lasttouched, lasttoucher } = tickets[el]

              return (
                <div key={index} className="card">
                  <div className="card__body">
                    <div className="card__header">
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
                      Created {isotime(created)} ({usersContext[creator].name})
                    </div>
                    <div className="card__time">
                      Touched {isotime(lasttouched)} ({usersContext[lasttoucher].name})
                    </div>
                    <Button onClick={() => openModalHandler(tickets[el], el)}>View ticket</Button>
                    {drawModal()}
                  </div>
                </div>
              )
            })
          : null}
      </div>
    </div>
  )
}
