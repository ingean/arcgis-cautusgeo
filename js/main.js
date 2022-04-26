import esriConfig from 'https://js.arcgis.com/4.23/@arcgis/core/config.js'
import Map from 'https://js.arcgis.com/4.23/@arcgis/core/Map.js'
import SceneView from 'https://js.arcgis.com/4.23/@arcgis/core/views/SceneView.js'
import ImageryTileLayer from 'https://js.arcgis.com/4.23/@arcgis/core/layers/ImageryTileLayer.js'
import ActionBar from './ui/ActionBar.js'
import MapTheme from './ui/MapTheme.js'
import * as SensorDataLayer from './layers/SensorDataLayer.js'
import * as StationsLayer from './layers/StationsLayer.js'
import * as OAuth2 from './utils/OAuth2.js'
import * as StationsList from './ui/StationsList.js'
import * as UrlParams from './utils/UrlParams.js'
import * as DateSelector from './ui/DateSelector.js'

//esriConfig.apiKey = 'AAPKa9498736c8d64cfdb88cd0abbde4efcb-bZOw_j3NJA_zxvWbyNiCSB0NSwvP58ngMuXuhLHDU5YX_W9LrGy3fRhR01lMXbg'

const portal = await OAuth2.authenticate() //Authenticate with named user using OAuth2
const theme = new MapTheme() // Not passing the view prevents basemap switching when changing theme

DateSelector.init()

//const websceneId = '3dae0e6160b44357a1c41982f573d8ee' 

const sensordataImageLayer = new ImageryTileLayer({
  title: 'Skreddata (Raster)',
  url: 'https://tiledimageservices.arcgis.com/2JyTvMWQSnM2Vi8q/arcgis/rest/services/Heatmap_20220207_055_WebMercator_ND/ImageServer',
  renderer: SensorDataLayer.rasterHeatMapRederer,
  opacity: 0.7,
  visible: false,
  popupTemplate: {
    title: "Skreddata fra radar",
    content:
      "Makshastighet (km/t): {Raster.ServicePixelValue}"
  }
})

const stationsLayer = StationsLayer.create()
const sensordataLayer = SensorDataLayer.create()

const scene = new Map({
  basemap: 'hybrid',
  ground: 'world-elevation'
})

scene.addMany([stationsLayer, sensordataLayer, sensordataImageLayer])

const view = new SceneView({
  map: scene,
  container: "viewDiv",
  environment: {
    lighting: {
      directShadowsEnabled: true,
      date: new Date("Sun May 15 2019 16:00:00 GMT+0100 (CET)")
    }
  },
  padding: {
    left: 49
  },
  center: UrlParams.center([-23.49, 66.06]),
  zoom: 15
})

view.whenLayerView(sensordataLayer).then((layerView) => {
  DateSelector.setLayerView(layerView)
  UrlParams.setTimeExtent()
})

const actionBar = new ActionBar(view, 'stations')

stationsLayer.queryFeatures({
  where: '1=1',
  returnGeometry: true,
  outFields: ["*"],
})
.then(featureSet => {
  StationsList.addStations('stations', stationsLayer, featureSet.features, view)
})

document.getElementById('header-title').textContent = 'Cautus Geo Web - 3D visning av skred'
document.querySelector("calcite-shell").hidden = false
document.querySelector("calcite-loader").active = false

document.getElementById('opacity-slider')
.addEventListener('calciteSliderChange', event => {
  sensordataLayer.opacity = 1 - event.target.value/100
})

document.querySelectorAll('.extrude-height')
.forEach(element => {
  element.addEventListener('calciteInputChange', event => {
    let renderer = sensordataLayer.renderer.clone()
    let index = (event.target.label === 'min') ? 0 : 1
    renderer.visualVariables[0].stops[index].size = Number(event.target.value)
    sensordataLayer.renderer = renderer
  })
})

