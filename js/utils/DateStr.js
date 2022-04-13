export const parse = (str, delimiter = '-') => {
  let dateParts = str.split(delimiter)
  dateParts = dateParts.map(part => Number(part))
  return new Date(dateParts[0], dateParts[1] - 1, dateParts[2])
}

export const isSpan = (startDate, endDate) => {
  const start = parse(startDate)
  const end = parse(endDate)
  return end >= start
}

export const toISO = (str, delimiter = '.') => {
  const [day, month, year] = str.split(delimiter)
  return `${year}-${month}-${day}`
}

export const isDate = (str) => {
  const dateRE = /^(0?[1-9]|1\d|2\d|3[01])\.(0?[1-9]|1[0-2])\.(19|20)\d{2}$/
  return dateRE.test(str)
}

export const formatISO = (isoDateStr, delimiter = '.') => {
  isoDateStr = isoDateStr.replace(/-0+/g, '-') // Removes leading zeros
  const [year, month, day] = isoDateStr.split('-')
  return `${day}${delimiter}${month}${delimiter}${year}`
}

export const formatEpoch = (epochStr, delimiter = '.') => {
  const date = new Date(Number(epochStr))
  return fromDate(date, false)
}

export const toSpan = (dateStr) => {
  const date = parse(dateStr)
  const startDate = new Date(date.setDate(date.getDate() - 1))
  const endDate = new Date(date.setDate(date.getDate() + 2))
  return [fromDate(startDate), fromDate(endDate)]
}

export const fromDate = (date, ISO = true, delimiter = '.') => {
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  return ISO 
    ? `${year}-${month}-${day}` 
    : `${day}${delimiter}${month}${delimiter}${year}`
}
