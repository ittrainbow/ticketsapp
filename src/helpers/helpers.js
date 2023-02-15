import { CheckCircleOutline, NewReleases } from '@mui/icons-material'
import { Stack } from '@mui/material'

export const iconPickerHepler = (severity, status) => {
  const color =
    status === 'done'
      ? 'grey'
      : severity === 'high'
      ? 'red'
      : severity === 'avg'
      ? 'orange'
      : 'khaki'

  const icon =
    status === 'done' ? <CheckCircleOutline fontSize="large" /> : <NewReleases fontSize="large" />

  return <Stack color={color}>{icon}</Stack>
}

export const textPickerHelper = (status) => {
  return status === 'work'
    ? 'Work'
    : status === 'new'
    ? 'New'
    : status === 'done'
    ? 'Done'
    : 'Ready for test'
}

export const sortTicketsHelper = (input, style) => {
  const sorted = {}

  Object.keys(input).forEach((el) => (input[el]['id'] = el))
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

  return sorted
}

export const getNewTicketHelper = (tickets) => {
  const gotTickets = Object.keys(tickets).length > 0

  const id = gotTickets ? (Number(Object.keys(tickets).sort((a, b) => b - a)[0]) + 1).toString() : 0
  const number = gotTickets
    ? Object.keys(tickets)
        .map((el) => tickets[el].number)
        .sort((a, b) => b - a)[0] + 1
    : 1

  return { id, number }
}

export const filterList = [
  { value: 'all', text: 'All' },
  { value: 'open', text: 'Open' }
]
export const sortList = [
  { value: 'touchasc', text: 'Touched ascending' },
  { value: 'touchdesc', text: 'Touched descending' },
  { value: 'createasc', text: 'Created ascending' },
  { value: 'createdesc', text: 'Created descending' }
]