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
