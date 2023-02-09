export const getNewTicketId = (tickets) => {
  return (Number(Object.keys(tickets).sort((a, b) => b - a)[0]) + 1).toString()
}