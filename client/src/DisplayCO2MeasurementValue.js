import React from 'react';
import './DisplayCO2MeasurementValue.css';

class DisplayCO2MeasurementValue extends React.Component {

  constructor(props) {
    super(props);
  }

  

  render() {
    return (
      <div className={`${this.props.currentCO2MeasurementValue <= 1000 && 'co2_threshold_green'}
       ${this.props.currentCO2MeasurementValue > 1000 && this.props.currentCO2MeasurementValue <= 2000 &&'co2_threshold_yellow'}
       ${this.props.currentCO2MeasurementValue > 2000 && 'co2_threshold_red'}`}>
        {this.props.currentCO2MeasurementValue} ppm
      </div>
    );
  }
}

export default DisplayCO2MeasurementValue;
