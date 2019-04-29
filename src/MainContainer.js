import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import * as actionCreators from './actions'

import App from './App'

// menghubungkan state yang ada di reducer dan store ke component
function mapStateToProps(state) {
  return {
    Auth: state.Auth
  }
}

// menghubungkan actions ke component yang ada
function mapDispatchtoProps(dispatch) {
  return bindActionCreators(actionCreators, dispatch);
}

const MainContainer = connect(mapStateToProps, mapDispatchtoProps)(App)

export default MainContainer
