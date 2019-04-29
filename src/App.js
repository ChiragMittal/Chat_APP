import React, { Component } from 'react'
import PropTypes from 'prop-types'
import AppsRoutes from './AppsRoutes'
// import AuthenticatedNavigation from './components/Other/AuthenticatedNavigation'

class App extends Component {

  render() {
    let appProps = this.props;
    let { Auth } = this.props;
    return (
      <div>
        <AppsRoutes {...appProps} />

      </div>
    );
  }

}

App.propTypes = {
  Auth: PropTypes.object
}

export default App;
