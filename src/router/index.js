import React, { Component } from 'react'
import { HashRouter, Route } from 'react-router-dom'
import routerConfig from './config'
export default class Router extends Component {
  render() {
    const config = routerConfig
    return (
      <HashRouter>
        {config.map((route, key) => {
          {
            return (
              <Route
                path={route.path || '/' + route['id'] + '/demo/index'}
                exact
                component={route['component']}
                key={route['id']}
              ></Route>
            )
          }
        })}
      </HashRouter>
    )
  }
}
