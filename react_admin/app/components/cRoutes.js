import React, { Component } from 'react'
import { Route, Redirect, Switch } from 'react-router-dom'
import DocumentTitle from 'react-document-title'
import routesConfig from '../config/routes'
import queryString from 'query-string'

class CRouter extends Component {
  render () {
    return (
      <Switch>
        {Object.keys(routesConfig).map(key => {
          return routesConfig[key].map(r => {
            const route = r => {
              const Component = r.component
              return (
                <Route
                  key={r.route || r.key}
                  exact
                  path={r.route || r.key}
                  render={props => {
                    const reg = /\?\S*/g
                    // 匹配?及其以后字符串
                    const queryParams = window.location.hash.match(reg)
                    // 去除?的参数
                    const { params } = props.match
                    Object.keys(params).forEach(key => {
                      params[key] = params[key] && params[key].replace(reg, '')
                    })
                    props.match.params = { ...params }
                    const merge = {
                      ...props,
                      query: queryParams
                        ? queryString.parse(queryParams[0])
                        : {}
                    }
                    // 重新包装组件
                    const wrappedComponent = (
                      <DocumentTitle title={r.title}>
                        <Component {...merge} />
                      </DocumentTitle>
                    )
                    return wrappedComponent
                  }}
                />
              )
            }
            return r.component ? route(r) : r.subs.map(r => route(r))
          })
        }
        )}

        <Route render={() => <Redirect to="/admin/user/info" />} />
      </Switch>
    )
  }
}

export default CRouter
