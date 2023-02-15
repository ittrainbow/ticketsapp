import React from 'react'
import { ButtonGroup, Modal, TextField, Stack, Button } from '@mui/material'

import { Dropdown } from './Dropdown'

export const Ticket = ({
  tempTicket,
  modalOpen,
  setModalOpen,
  setTempTicket,
  submitHandler,
  user
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
    p: 4,
    maxWidth: 400
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
      inputId: 'select-severity',
      value: severity,
      list,
      width: 86,
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
      inputId: 'select-class',
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
      { value: 'totest', text: 'To test' },
      { value: 'done', text: 'Done' }
    ]

    return Dropdown({
      size: 'small',
      label: 'Status',
      inputId: 'select-status',
      value: status,
      list,
      width: 86,
      onChange: (e) => setTempTicket({ ...tempTicket, status: e.target.value })
    })
  }

  return (
    <Modal open={modalOpen} onClose={() => setModalOpen(false)}>
      <Stack sx={style} direction="column" spacing={3}>
        <TextField
          label="Issue"
          value={issue}
          size="small"
          onChange={(e) => {
            setTempTicket({ ...tempTicket, issue: e.target.value })
          }}
        />
        <TextField
          label="Description"
          value={description}
          multiline
          rows={4}
          onChange={(e) => {
            setTempTicket({ ...tempTicket, description: e.target.value })
          }}
        />
        <TextField
          label="Solution"
          value={solution}
          multiline
          rows={4}
          onChange={(e) => {
            setTempTicket({ ...tempTicket, solution: e.target.value })
          }}
        />
        <Stack justifyContent="center" alignItems="center" direction="row" spacing={0}>
          {severityDropDown()}
          {classDropDown()}
          {statusDropDown()}
        </Stack>
        <ButtonGroup variant="text">
          <Button
            disabled={!status || !problem || !severity || !issue || !user}
            onClick={submitHandler}
          >
            Submit
          </Button>
          <Button onClick={() => setModalOpen(false)}>Discard</Button>
        </ButtonGroup>
      </Stack>
    </Modal>
  )
}
