import React from 'react'
import axios from 'axios'

import MapGl, { Marker } from 'react-map-gl'
import 'mapbox-gl/dist/mapbox-gl.js'
import 'mapbox-gl/dist/mapbox-gl.css'

const mapboxToken = process.env.REACT_APP_MAPBOX_ACCESS_TOKEN
const weatherKey = process.env.REACT_APP_WEATHER_API_KEY

class WorldMap extends React.Component {

  state = {
    viewport: {
      latitude: 0,
      longitude: 0,
      zoom: 2,
      bearing: 0,
      pitch: 0
    },
    capitals: null,
    weatherData: []
  }

  async componentDidMount() {
    try {
      const res = await Promise.all([
        axios.get(`http://api.openweathermap.org/data/2.5/weather?q=Johannesburg&units=metric&appid=${weatherKey}`),
        axios.get('https://restcountries.eu/rest/v2/all')
      ])
      console.log(res[2])
      const capital_names = res[1].data.map(count => count.capital).filter(cap => cap)
      const capitals = []
      capital_names.map(async cap => {
        try {
          const locRes = await axios.get(`https://api.mapbox.com/geocoding/v5/mapbox.places/${cap}.json`, { params: { access_token: mapboxToken } })
          capitals.push({ name: cap, location: locRes.data.features[0].center  })
        } catch (err) {
          console.log(err)
        }
      })
      this.setState({ capitals, weatherData: res[0].data })
    } catch(err) {
      console.log(err)
    }
  }

  render() {
    const { capitals } = this.state
    if (!capitals) return false
    return (
      <>
      <section className="section" style={{ height: '100%', width: '100vw' }}>
        <h1>WorldMap</h1>
        <div id="world-map" style={{ position: 'absolute', top: '0', bottom: '0' }}></div>
        <MapGl
          height={'500px'}
          width={'100%'}
          container={'world-map'}
          mapStyle="mapbox://styles/mapbox/satellite-streets-v11"
          mapboxApiAccessToken={mapboxToken}
          {...this.state.viewport}
          onViewportChange={viewport => this.setState({ viewport })}
        >
          {capitals.map((cap, i) => (
            <>
              <Marker 
                key={i}
                latitude={cap.location[1]} 
                longitude={cap.location[0]}
              >
                <div>🔥</div>
              </Marker>
            </>
          ))}
        </MapGl>
      </section>
      </>
    )
  }
}

export default WorldMap

axios.get('https://api.mapbox.com/geocoding/v5/mapbox.places/London.json', {
    params: {
      access_token: mapboxToken
    }
  })