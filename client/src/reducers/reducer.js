import moment from "moment";


var currentDate = new Date();
var time = currentDate.getTime();

const initialState = {
    //currentCO2MeasurementValue: 1876,
    currentCO2MeasurementValue: 1200,
    co2MeasurementValuesHistory:[
      // { "timestamp": time, "co2MeasurementValue": 1876 }
      { "timestamp": new Date(moment(currentDate).subtract(140, 'seconds').format()).getTime(),
        "co2MeasurementValue": 1876 },
      { "timestamp": new Date(moment(currentDate).subtract(130, 'seconds').format()).getTime(),
        "co2MeasurementValue": 2345 },
      { "timestamp": new Date(moment(currentDate).subtract(120, 'seconds').format()).getTime(),
        "co2MeasurementValue": 678 },
      { "timestamp": new Date(moment(currentDate).subtract(110, 'seconds').format()).getTime(),
        "co2MeasurementValue": 889 },
      { "timestamp": new Date(moment(currentDate).subtract(100, 'seconds').format()).getTime(),
        "co2MeasurementValue": 1200 },
      { "timestamp": new Date(moment(currentDate).subtract(90, 'seconds').format()).getTime(),
        "co2MeasurementValue": 1900 },
      { "timestamp": new Date(moment(currentDate).subtract(80, 'seconds').format()).getTime(),
        "co2MeasurementValue": 2100 },
      { "timestamp": new Date(moment(currentDate).subtract(70, 'seconds').format()).getTime(),
        "co2MeasurementValue": 2600 },
      { "timestamp": new Date(moment(currentDate).subtract(60, 'seconds').format()).getTime(),
        "co2MeasurementValue": 2800 },
      { "timestamp": new Date(moment(currentDate).subtract(50, 'seconds').format()).getTime(),
        "co2MeasurementValue": 2400 },
      { "timestamp": new Date(moment(currentDate).subtract(40, 'seconds').format()).getTime(),
        "co2MeasurementValue": 2400 },
      { "timestamp": new Date(moment(currentDate).subtract(30, 'seconds').format()).getTime(),
        "co2MeasurementValue": 2050 },
      { "timestamp": new Date(moment(currentDate).subtract(20, 'seconds').format()).getTime(),
        "co2MeasurementValue": 1965 },
      { "timestamp": new Date(moment(currentDate).subtract(10, 'seconds').format()).getTime(),
        "co2MeasurementValue": 1589 },
      { "timestamp": currentDate.getTime(),
        "co2MeasurementValue": 1200 },
    ]
}

export default (state = initialState, action) => {
    switch (action.type) {
      case "SET_CO2_MEASUREMENT_VALUE":
        if (state.co2MeasurementValuesHistory.length < 15){
          var newCO2MeasurementValuesHistory = [...state.co2MeasurementValuesHistory, action.currentCO2MeasurementValueData]
        } else {
          var newCO2MeasurementValuesHistory = state.co2MeasurementValuesHistory
          newCO2MeasurementValuesHistory.shift()
          newCO2MeasurementValuesHistory[14] = action.currentCO2MeasurementValueData
        }
        return {
            currentCO2MeasurementValue: action.currentCO2MeasurementValueData.co2MeasurementValue,
            co2MeasurementValuesHistory: newCO2MeasurementValuesHistory
        };
      default:
        return state;
    }
};