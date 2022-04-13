import * as DateSelector from '../ui/DateSelector.js'

export const setTimeExtent = () => {
  const [startDate, endDate] = getDates()
  if (startDate && endDate) DateSelector.setTimeExtent(startDate, endDate, true)
}

export const center = (defaultCenter) => {
  const urlParams = getUrlParams()
  const lat = urlParams.get('lat')
  const lon = urlParams.get('lon')
  return (lat && lon) ? [lon, lat] : defaultCenter
}

export const update = (startDate, endDate) => {
  const urlParams = getUrlParams()
  urlParams.set('startdate', startDate)
  urlParams.set('enddate', endDate)
  window.history.pushState(window.history.state,'', `?${urlParams.toString()}`)
}

const getDates = () => {
  const urlParams = getUrlParams()
  const startDate = urlParams.get('startdate')
  const endDate = urlParams.get('enddate')

  DateSelector.updateCalendar(startDate, endDate)
  DateSelector.updateTextInputs(startDate, endDate)

  return [startDate, endDate]
} 

const getUrlParams = () => {
  const queryString = window.location.search;
  return new URLSearchParams(queryString)
}



