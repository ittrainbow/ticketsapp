import React from 'react'
import Box from '@mui/material/Box'
import Modal from '@mui/material/Modal'
import { Button } from '@mui/material'

import './Modal.scss'

import { Dropdown } from '../Dropdown/Dropdown'

export const TicketModal = ({
  tempTicket,
  modalOpen,
  closeModalHandler,
  setTempTicket,
  submitHandler
}) => {
  const { issue, description, solution, severity, problem, status } = tempTicket

  const style = {
    textAlign: 'center',
    position: 'relative',
    top: '3%',
    left: '50%',
    transform: 'translate(-50%, 0%)',
    bgcolor: 'background.paper',
    borderRadius: '10px',
    boxShadow: 24,
    p: 4
  }

  const severityDropDown = () => {
    const list = [
      { value: 'high', text: 'High' },
      { value: 'avg', text: 'Avg' },
      { value: 'low', text: 'Low' }
    ]

    return Dropdown({
      size: 'small',
      label: 'Severity',
      inputId: 'demo-simple-select-label',
      value: severity,
      list,
      width: 80,
      onChange: (e) => setTempTicket({ ...tempTicket, severity: e.target.value })
    })
  }

  const classDropDown = () => {
    const list = [
      { value: 'func', text: 'Functional' },
      { value: 'ui', text: 'UI' }
    ]

    return Dropdown({
      size: 'small',
      label: 'Class',
      inputId: 'demo-simple-select-label',
      value: problem,
      list,
      width: 100,
      onChange: (e) => setTempTicket({ ...tempTicket, problem: e.target.value })
    })
  }

  const statusDropDown = () => {
    const list = [
      { value: 'new', text: 'New' },
      { value: 'work', text: 'Work' },
      { value: 'done', text: 'Done' }
    ]

    return Dropdown({
      size: 'small',
      label: 'Status',
      inputId: 'demo-simple-select-label',
      value: status,
      list,
      width: 90,
      onChange: (e) => setTempTicket({ ...tempTicket, status: e.target.value })
    })
  }

  return (
    <Modal open={modalOpen} onClose={closeModalHandler}>
      <Box sx={style} className="modal">
        <div className="modal__issue">
          Issue
          <textarea
            type="text"
            className="modal__issue__textbox"
            value={issue}
            placeholder="Input issue title (necessary)"
            onChange={(e) => {
              setTempTicket({ ...tempTicket, issue: e.target.value })
            }}
          ></textarea>
        </div>
        <div className="modal__description">
          Description
          <textarea
            type="text"
            className="modal__description__textbox"
            value={description}
            placeholder="Put description here or keep empty"
            onChange={(e) => {
              setTempTicket({ ...tempTicket, description: e.target.value })
            }}
          ></textarea>
        </div>
        <div className="modal__solution" sx={{ mt: 2 }}>
          Solution
          <textarea
            type="text"
            className="modal__solution__textbox"
            value={solution}
            placeholder="Put solution here or keep empty"
            onChange={(e) => {
              setTempTicket({ ...tempTicket, solution: e.target.value })
            }}
          ></textarea>
        </div>
        <div className="modal__icons">
          {severityDropDown()}
          {classDropDown()}
          {statusDropDown()}
        </div>
        <div className="modal__buttons">
          <Button
            className="modal__buttons__btn"
            disabled={!status || !problem || !severity || !issue}
            onClick={submitHandler}
          >
            Submit
          </Button>
          <Button className="modal__buttons__btn" onClick={closeModalHandler}>
            Discard
          </Button>
          {/* <Button className="modal__buttons__btn" onClick={() => console.log(tempTicket)}>
            Log
          </Button> */}
        </div>
      </Box>
    </Modal>
  )
}
