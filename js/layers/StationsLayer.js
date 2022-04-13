
export const labelingInfo = [
  {
    labelExpressionInfo: {
      value: "{Navn}"
    },
    symbol: {
      type: "label-3d", // autocasts as new LabelSymbol3D()
      symbolLayers: [
        {
          type: "text", // autocasts as new TextSymbol3DLayer()
          material: {
            color: "white"
          },
          halo: {
            size: 1,
            color: [50, 50, 50]
          },
          size: 10
        }
      ]
    }
  }
]

export const renderer = {
  type: "simple",  // autocasts as new SimpleRenderer()
  symbol: {
    type: "point-3d", // autocasts as new PointSymbol3D()
    symbolLayers: [
      {
        type: "icon", // autocasts as new IconSymbol3DLayer()
        resource: {
          href: 'https://geodata.maps.arcgis.com/sharing/rest/content/items/1f050acc0f894ba48db5843b52eb155f/data'
        },
        size: 20,
        outline: {
          color: "white",
          size: 2
        }
      }
    ],

    verticalOffset: {
      screenLength: 40,
      maxWorldLength: 200,
      minWorldLength: 35
    },

    callout: {
      type: "line", // autocasts as new LineCallout3D()
      color: "white",
      size: 2,
      border: {
        color: 'black'
      }
    }
  }
}
