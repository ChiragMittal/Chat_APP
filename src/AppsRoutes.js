import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Route, Switch, Redirect } from 'react-router-dom'
import Home from './containers_components/Home'
import NoMatch from './containers_components/NoMatch'
import BookSearch from './containers_components/Search/index'
import Register from './containers_components/Auth/register'
import Login from './containers_components/Auth/login'
import Multi_Channel from './containers_components/Channel/multi_channel.react'
import ChatApp from './containers_components/Chat_app.react'


class AppsRoutes extends Component {

  constructor(props) {
    super(props);
  }

  render() {
    let appProps = this.props;
    return (

      <Switch>
        {/* Will redirect to auth in booting app */}
        <Route exact path="/" render={(props) => (<Home {...appProps} />)} />
        <Route path="/search"  render={(props) => (<BookSearch {...appProps} />)} />
        <Route path="/register"  render={(props) => (<Register {...appProps} />)} />
        <Route path="/login"  render={(props) => (<Login {...appProps} />)} />
        {/* <Route path="/home/:id"  render={(props) => (<ChatApp {...appProps} />)} /> */}
        <Route path="/chat"  render={(props) => (<ChatApp {...appProps} />)} />
        <Route path="/check"  render={(props) => (<Multi_Channel {...appProps} />)} />
        {/* <Route path="/:id"  render={(props) => (<UserInfo {...appProps} />)} /> */}
        {/* <Route exact path="/destination/search" render={(props) => (<FluxCartApp {...appProps} />)} /> */}
        {/* Accessing auth directly will bring to login page */}
        <Route component={NoMatch} />
      </Switch>

    );
  }

}

AppsRoutes.propTypes = {
  Auth: PropTypes.object
}

export default AppsRoutes;
