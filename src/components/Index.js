import React from 'react'
import { BrowserRouter, Switch, Route } from 'react-router-dom'

import 'bulma'
import 'animate.css'
import '@fortawesome/fontawesome-free/css/all.css'

import WorldMap from './WorldMap'
import CityMap from './CityMap'
import WeatherMap from './WeatherMap'

class Index extends React.Component {
  
  state = {}

  render() {
    return (
      <>
      <BrowserRouter>
        <Switch>
          <Route exact path="/" component={WorldMap} />
          <Route path="/city" component={CityMap} />
          <Route path="/weather" component={WeatherMap} />
        </Switch>
      </BrowserRouter>
      </>
    )
  }
}

export default Index