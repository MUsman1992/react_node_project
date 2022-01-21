import React from 'react';
import socketIOClient from "socket.io-client";
import DisplayCO2MeasurementValue from './DisplayCO2MeasurementValue';
import GraphComponent from './GraphComponent';
import TableComponent from './TableComponent';
// import logo from './logo.svg';
import './App.css';

class App extends React.Component {

  constructor(props) {
    super(props);
  }

  render() {
    console.log(this.props.currentCO2MeasurementValue);
    console.log(this.props.co2MeasurementValuesHistory);
    return (
      <div>
        <DisplayCO2MeasurementValue currentCO2MeasurementValue={this.props.currentCO2MeasurementValue}/>
        <div className="mainDiv">
        <div className="leftDiv">
        <GraphComponent data={this.props.co2MeasurementValuesHistory} />
        </div>
        <div className="rightDiv">
        <TableComponent data={this.props.co2MeasurementValuesHistory} />
        </div>
        </div>

      </div>
      
    );
  }

  componentDidMount() {
    //const socket = socketIOClient('http://localhost:8080');
    //const socket = socketIOClient('http://localhost:8080/getCO2MeasurementData');
    const socket = socketIOClient('/getCO2MeasurementData');
    socket.on("getCO2MeasurementValue", data => this.props.setCO2Measurement(data));
  }

}

export default App;
