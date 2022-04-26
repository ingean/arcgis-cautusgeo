export const popupTemplate = { 
  title: "{Maalestasjon} ({Skreddato})",
  content: [
    {
      type: "fields",
      fieldInfos: [
        {
          fieldName: "Verdi",
          label: "Makshastighet (km/t)"
        }
      ]
    }
  ]
}

export const rasterHeatMapRederer = {
  type: "raster-stretch",
  stretchType: "percent-clip",
  statistics: [66,77,71.87, 3.27],
  colorRamp: {
    type: "algorithmic",
    fromColor: [66, 168, 220, 255],
    toColor: [77, 0, 152, 255]
  }
}

export const heatmapRenderer = {
  type: "simple", // autocasts as new SimpleRenderer()
  symbol: {
    type: "polygon-3d", // autocasts as new PolygonSymbol3D()
    symbolLayers: [{ type: "extrude" }] // autocasts as new ExtrudeSymbol3DLayer()
  },
  label: "Makshastighet (km/t)",
  visualVariables: [
    {
      type: "size", // indicates this is a size visual variable
      field: "Verdi", // total population in poverty
      stops: [
        {
          value: 62, // features where < 10% of the pop in poverty
          size: 5 // will be extruded by this height in meters
        },
        {
          value: 84, // features where > 50% of the pop in poverty
          size: 10 // will be extruded by this height in meters
        }
      ]
    },
    {
      type: "color",
      field: "Verdi",
      stops: [
        {
          value: 62,
          //color: "#FFFCD4"
          color: [168, 220, 255]
        },
        {
          value: 84,
          //color: [153, 83, 41]
          color: [0, 152, 255]
        }
      ]
    }
  ]
}