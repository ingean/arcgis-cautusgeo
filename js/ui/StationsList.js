import { createElement } from '../utils/Element.js'
import * as DateSelector from './DateSelector.js'
import * as DateStr from '../utils/DateStr.js'

export const addStations = (id, layer, features, view) => {   
  let list = document.querySelector(`#${id}-list`)

  features.forEach(feature => {
    addStation(id, layer, feature, list, view)
  })
}
  
const addStation = (id, layer, feature, list, view) => {
  let action =  createAction(id,'layer-zoom-to')
  action.addEventListener('click', event => view.goTo(feature.geometry))

  let item = createListItem(id, feature.attributes.Navn, action)
  item.addEventListener('click', event => {
    layer.queryRelatedFeatures({
      outFields: ['Skreddato', 'Kommentar'],
      relationshipId: layer.relationships[0].id,
      objectIds: [feature.attributes.OBJECTID]
    })
    .then(featureSets => {
      let featureSet = featureSets[feature.attributes.OBJECTID]
      if (!featureSet) return
      addEventsListItems(featureSet.features)
    })
  })
  list.appendChild(item)
}

const addEventsListItems = (features) => {
  let list = document.getElementById('events-list')
  list.innerHTML = ''

  features.forEach(feature => {
    let label = DateStr.formatEpoch(feature.attributes.Skreddato)
    let descr = feature.attributes.Kommentar
    let action = createAction('events', 'filter')
    let item = createListItem('events', label, action, descr)
    let elements = [action, item]

    elements.forEach(element => {
      element.addEventListener('click', event => filterEvents(DateStr.toISO(label)))
    })    
    list.appendChild(item)
  })
}

const createAction = (id, icon) => {
  return createElement('calcite-action', {
    class: `${id}-list-item-action`,
    slot: 'actions-end',
    icon
  })
}

const createListItem = (id, label, action, descr) => {
  return createElement('calcite-value-list-item', {
    class: `${id}-list-item`,  
    label,
    ...(descr && { description: descr }), // Only add description if not null or undefined
    },
    action
  )
}

const filterEvents = (dateStr) => {
  const dates = DateStr.toSpan(dateStr)
  DateSelector.setTimeExtent(dates[0], dates[1])
}
