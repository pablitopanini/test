import * as React from 'react'
import {
  Switch,
  Route,
  withRouter,
  RouteComponentProps,
  Redirect
} from 'react-router'
import Blog from './pages/Blog'
import Edit from './pages/Edit'
import Post from './pages/Post'

const NoMatch = ({ location }: RouteComponentProps) => {
  return (
    <div>
      <h3>
        No match for <code>{location.pathname}</code>
      </h3>
    </div>
  )
}

class Routes extends React.Component<RouteComponentProps> {
  public render() {
    if (this.props.location.pathname === '/') {
      return <Redirect to="/blog" />
    }

    return (
      <Switch>
        <Route path="/blog" component={Blog} />
        <Route path="/add" component={Edit} />
        <Route path="/edit/:id" component={Edit} />
        <Route path="/post/:id" component={Post} />

        <Route component={NoMatch} />
      </Switch>
    )
  }
}

export default withRouter(Routes)
