const map = L.map('map').setView([51.505, -0.09], 13)
L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png', {
  attribution:
    '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors',
}).addTo(map)
// FeatureGroup is to store editable layers
const drawnItems = new L.FeatureGroup()
map.addLayer(drawnItems)
const drawControl = new L.Control.Draw({
  edit: {
    featureGroup: drawnItems,
  },
})
map.addControl(drawControl)

// just to start draw on the map
// ===============================
map.on('draw:created', (e) => {
  const type = e.layerType,
    layer = e.layer
  drawnItems.addLayer(layer)
  // =============================

//   map.on('draw:created', (e) => {
//     const layer = e.layer
//     feature = layer.feature = layer.feature || {}

//     feature.type = feature.type || 'Feature'
//     const props = (feature.properties = feature.properties || {})
//     drawnItems.addLayer(layer)
//   })
// })

// get feature data
document.getElementById('convert').addEventListener('click', () => {
  const data = drawnItems.toGeoJSON()
  if (data.features.length === 0) return
  const result = $('#result').html(JSON.stringify(data))
})
