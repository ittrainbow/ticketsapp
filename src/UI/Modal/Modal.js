import React from 'react'
import {
  MdNewReleases,
  MdAccessTimeFilled,
  MdSmartphone,
  MdSettingsApplications,
  MdOutlineCheckBox,
  MdOutlineDoubleArrow
} from 'react-icons/md'
import Box from '@mui/material/Box'
import Modal from '@mui/material/Modal'
import { Button } from '@mui/material'

import './Modal.scss'

export const ticketModal = (tempTicket, open, closeModalHandler, setTempTicket, submitHandler) => {
  const { issue, solution, severityhigh, functional, fixed } = tempTicket
  
  const style = {
    textAlign: 'center',
    position: 'relative',
    top: '3%',
    left: '50%',
    transform: 'translate(-50%, 0%)',
    width: '300px',
    bgcolor: 'background.paper',
    borderRadius: '10px',
    boxShadow: 24,
    p: 4
  }

  const btnSeverity = () => {
    return (
      <div className="modal__icons__inner">
        <div className="modal__icons__text">High/Low</div>
        <div onClick={() => setTempTicket({ ...tempTicket, severityhigh: !severityhigh })}>
          <MdNewReleases className={severityhigh ? 'red' : null} />
          <MdAccessTimeFilled className={severityhigh ? null : 'yellow'} />
        </div>
      </div>
    )
  }

  const btnClass = () => {
    return (
      <div className="modal__icons__inner">
        <div className="modal__icons__text">UI/Func</div>
        <div onClick={() => setTempTicket({ ...tempTicket, functional: !functional })}>
          <MdSmartphone className={functional ? null : 'blue'} />
          <MdSettingsApplications className={functional ? 'blue' : null} />
        </div>
      </div>
    )
  }

  const btnStatus = () => {
    return (
      <div className="modal__icons__inner">
        <div className="modal__icons__text">Done/Yet</div>
        <div onClick={() => setTempTicket({ ...tempTicket, fixed: !fixed })}>
          <MdOutlineCheckBox className={fixed ? 'green' : null} />
          <MdOutlineDoubleArrow className={fixed ? null : 'red'} />
        </div>
      </div>
    )
  }

  return (
    <Modal open={open} onClose={closeModalHandler}>
      <Box sx={style} className="modal">
        <div className="modal__issue">
          <textarea
            type="text"
            className="modal__issue__textbox"
            value={issue}
            onChange={(e) => {
              setTempTicket({ ...tempTicket, issue: e.target.value })
            }}
          ></textarea>
        </div>
        <div className="modal__solution" sx={{ mt: 2 }}>
          <textarea
            type="text"
            className="modal__solution__textbox"
            value={solution}
            onChange={(e) => {
              setTempTicket({ ...tempTicket, solution: e.target.value })
            }}
          ></textarea>
        </div>
        <div className="modal__icons">
          {btnSeverity()}
          {btnClass()}
          {btnStatus()}
        </div>
        <div className="modal__buttons">
          <Button className="modal__buttons__btn" onClick={submitHandler}>
            Submit
          </Button>
          <Button className="modal__buttons__btn" onClick={closeModalHandler}>
            Discard
          </Button>
          <Button className="modal__buttons__btn" onClick={() => console.log(tempTicket)}>
            Log
          </Button>
        </div>
      </Box>
    </Modal>
  )
}
