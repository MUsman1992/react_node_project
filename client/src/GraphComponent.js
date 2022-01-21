import React from "react";
import {
  ResponsiveContainer,
  LineChart,
  CartesianGrid,
  XAxis,
  YAxis,
  Label,
  Tooltip,
  Line
} from "recharts";
import './GraphComponent.css';
import moment from "moment";

const formatTimeStamp = (tickFormat) => {
  return moment(tickFormat).format("YYYY/MM/DD HH:mm:ss");
};

class GraphComponent extends React.Component {

  constructor(props) {
    super(props);
  }

  render() {

    
    return (
      <ResponsiveContainer width={"95%"} height={560}>
      <LineChart
        data={this.props.data}
        margin={{ top: 30, right: 30, left: 30, bottom: 30 }}
      >
      
      <CartesianGrid/>
      <XAxis
          // type="number"
          dataKey="timestamp"
          tickFormatter={(tick) => formatTimeStamp(tick)} 
          type={'category'}
          // domain={["dataMin", "dataMax"]}
        >
          <Label
            value={"Time"}
            position="bottom"
            style={{ textAnchor: "middle" }}
          />
      </XAxis>
      <YAxis type="number" domain={[400, 3500]}>
          <Label
            value={"Carbon Dioxide Level (ppm)"}
            position="left"
            angle={-90}
            style={{ textAnchor: "middle" }}
          />
      </YAxis>
      <Tooltip 
        labelFormatter={tick => formatTimeStamp(tick)}
      />
        <Line
          dataKey="co2MeasurementValue"
          name="CO2 Level"
          unit={"ppm"}
          dot={false}
          // stroke="url(#co2measurementvalue)"
          // strokeWidth="4px"
          // type={"natural"}
          type="monotone"
        />
        
        
    </LineChart>
    </ResponsiveContainer>
    );
    
  }

}

export default GraphComponent;
