const currentDate = new Date()

const options = {
  year: 'numeric',
  month: 'short',
  day: 'numeric',
  hour: '2-digit',
  minute: '2-digit',
  second: '2-digit',
  hour12: true,
  timeZoneName: 'short'
}

export const handleDateFormat = (date = Date.now()) => {
  return new Date(date).toLocaleDateString('en-US', options)
}
export const formattedDate = currentDate.toLocaleDateString('en-US', options)
