export const getNewTicketHelper = (tickets, action) => {
  if (action === 'id') return (Number(Object.keys(tickets).sort((a, b) => b - a)[0]) + 1).toString()
  if (action === 'number')
    return (
      Object.keys(tickets)
        .map((el) => tickets[el].number)
        .sort((a, b) => b - a)[0] + 1
    )
}
