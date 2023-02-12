export const sortTicketsHelper = (input, style) => {
  const sorted = {}
  
  Object.keys(input).forEach(el => input[el]['id'] = el)
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