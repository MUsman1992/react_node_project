import React from "react";
import './TableComponent.css';
import moment from "moment";

const formatTimeStamp = (tickFormat) => {
  return moment(tickFormat).format("YYYY/MM/DD HH:mm:ss");
};

class TableComponent extends React.Component {

  constructor(props) {
    super(props);
  }

  render() {

    
    return (
      <div >
      <table id="co2measurementsData">
        
          <thead>
          <tr>
          <th>Entry No #</th>
          <th>Time</th>
          <th>CO2 Measurement Value</th>
          </tr>
          </thead>
        <tbody>
        {this.props.data.map((co2MeasurementData, index) => {
          return (
            <tr key={index} className={`${co2MeasurementData.co2MeasurementValue <= 1000 && 'co2_threshold_green_row'}
            ${co2MeasurementData.co2MeasurementValue > 1000 && co2MeasurementData.co2MeasurementValue <= 2000 &&'co2_threshold_yellow_row'}
            ${co2MeasurementData.co2MeasurementValue > 2000 && 'co2_threshold_red_row'}`}>
              <td>{index+1}</td>
              <td>{formatTimeStamp(co2MeasurementData.timestamp)}</td>
              <td>{co2MeasurementData.co2MeasurementValue}</td>
            </tr>
          )
        })}
        </tbody>
        </table>
        </div>

    );
    
  }

}

export default TableComponent;
