import FeatureLayer from 'https://js.arcgis.com/4.23/@arcgis/core/layers/FeatureLayer.js'


export const create =  () => {
  return new FeatureLayer({
    title: 'Målestasjoner',
    url: 'https://services.arcgis.com/2JyTvMWQSnM2Vi8q/arcgis/rest/services/CautusGeo/FeatureServer/0',
    renderer: renderer,
    labelingInfo: labelingInfo,
    popupTemplate: popupTemplate
  })
}


/*
export const popupTemplate = { 
  title: "Målestasjon {Navn}",
  content: [
    {
      type: "expression",
      expressionInfo: {
        expression: `
        var html = '<table style="border: 1px solid;border-collapse: collapse;"><thead><th>Skreddato</th><th>Kommentar</th></thead>'
        var fs = FeatureSetByRelationshipName($feature,"Skredhendelser")
        for(var f in fs){
            html += '<tr><td>' + Text(f.Skreddato, 'D.M.Y HH:mm:ss') + '</td><td>' + f.Kommentar + '</td></tr>'
        }
        
        html += '</table>'
        return {
          type: 'text',
          text: html
        }
        `
      }    
    }
  ]
}
*/

const popupTemplate = { 
  title: "Målestasjon {Navn}",
  content: [
    {
      type: "expression",
      expressionInfo: {
        expression: `
        var count = Count(FeatureSetByRelationshipName($feature,"Skredhendelser"))
        var html = '<strong>' + count + '</strong> skredhendelser registrert ved denne stasjonen.'
        
        return {
          type: 'text',
          text: html
        }
        `
      }    
    }
  ]
}

const labelingInfo = [
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

const renderer = {
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
