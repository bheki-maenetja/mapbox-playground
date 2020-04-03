import React from 'react'

import MapGl from 'react-map-gl'
import 'mapbox-gl/dist/mapbox-gl.css'

const mapboxToken = process.env.REACT_APP_MAPBOX_ACCESS_TOKEN

class WorldMap extends React.Component {

  state = {}

  render() {
    return (
      <>
      <section className="section" style={{ height: '100vw', width: '100vw' }}>
        <h1>WorldMap</h1>
        <MapGl
          height={'100%'}
          width={'100%'}
          interactive={true}
          dragPan={true}
          dragRotate={true}
          mapStyle="mapbox://styles/mapbox/streets-v11"
          mapboxApiAccessToken={mapboxToken}
          zoom={2}
        >

        </MapGl>
      </section>
      </>
    )
  }
}

export default WorldMap