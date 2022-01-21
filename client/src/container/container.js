import { connect } from 'react-redux';
import App from '../App';

import { setCO2MeasurementValue } from "../actions/actions";


const mapStateToProps = state => ({
  ...state
});

const mapDispatchToProps = dispatch => {
  return {
    setCO2Measurement: (co2MeasurementValue) => dispatch(setCO2MeasurementValue(co2MeasurementValue))
  }
}

export const Container = connect(mapStateToProps, mapDispatchToProps)(App);