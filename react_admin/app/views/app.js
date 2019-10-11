import React, { Component } from 'react'
import { HashRouter as Router, Route, Switch } from 'react-router-dom'
import Dashboard from './dashboard/dashboard'
import PageNotFound from './pageNotFound/pageNotFound'

class App extends Component {
  render () {
    return (
      <Router>
        <Switch>
          <Route exact path="/" component={Dashboard} />
          <Route path="/admin" component={Dashboard} />
          <Route exact path="/404" component={PageNotFound} />
          <Route component={PageNotFound} />
        </Switch>
      </Router>
    )
  }
}

export default App
