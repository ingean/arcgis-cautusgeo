import TimeExtent from 'https://js.arcgis.com/4.23/@arcgis/core/TimeExtent.js'
import * as DateStr from '../utils/DateStr.js'
import * as UrlParams from '../utils/UrlParams.js'

let layerView

export const setLayerView = (lv) => {layerView = lv}

export const init = () => {
  // Event handlers
  document.querySelectorAll('.filter-date-input')
  .forEach((element, i) => {
    element.addEventListener('calciteInputChange', event => {
      
      if (!DateStr.isDate(event.target.value)) return // TODO: Give user feedback when input format is not a proper date string
      
      let isoDateStr = DateStr.toISO(event.target.value)
      let calendar = document.getElementById('filter-dates-calendar')    
      if (i == 0) {
        calendar.start = isoDateStr
      } else {
        calendar.end = isoDateStr
      }
      const [startDate, endDate] = getDatesfromInputs()
      setTimeExtent(startDate, endDate)
    })
  })

  document.getElementById('filter-dates-calendar')
  .addEventListener('calciteDatePickerChange', event => {
    let startDate = event.target.start
    let endDate = event.target.end
    let dateInputs = document.querySelectorAll('.filter-date-input')
    
    dateInputs[0].value = DateStr.formatISO(startDate)
    dateInputs[1].value = endDate 
      ? DateStr.formatISO(endDate)
      : ''

    setTimeExtent(startDate, endDate)
  })
} 

export const setTimeExtent = (startDate, endDate, fromUrl = false) => {
  if (!startDate || !endDate) return
  if (!DateStr.isSpan(startDate, endDate)) return // End date is before start date

  if (!fromUrl) UrlParams.update(startDate, endDate)
  updateSummary(startDate, endDate)
  
  const timeExtent = new TimeExtent({
    start: DateStr.parse(startDate),
    end: DateStr.parse(endDate)
  })

  layerView.filter = {timeExtent}
}

export const getDatesfromInputs = () => {
  const dateInputs = document.querySelectorAll('.filter-date-input')
  const startDate = DateStr.toISO(dateInputs[0].value)
  const endDate = DateStr.toISO(dateInputs[1].value)
  return [startDate,endDate]
}

export const updateCalendar = (startDate, endDate) => {
  let calendar = document.getElementById('filter-dates-calendar')
  calendar.start = startDate
  calendar.end = endDate
}

export const updateTextInputs = (startDate, endDate) => {
  let dateInputs = document.querySelectorAll('.filter-date-input')
  
  dateInputs[0].value = DateStr.formatISO(startDate)
  dateInputs[1].value = DateStr.formatISO(endDate)
}

const updateSummary = (startDate, endDate) => {
  let btnSummary = document.getElementById('filter-dates-summary')
  btnSummary.innerHTML = (startDate && endDate) 
    ? `${DateStr.formatISO(startDate)} - ${DateStr.formatISO(endDate)}`
    : 'Ingen dato valgt'
}

