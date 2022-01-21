var currentDate = new Date();
var time = currentDate.getTime();

const initialState = {
    currentCO2MeasurementValue: 1876,
    co2MeasurementValuesHistory:[
      { "timestamp": time, "co2MeasurementValue": 1876 }
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