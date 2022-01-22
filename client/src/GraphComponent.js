import React from "react";
import {
  ResponsiveContainer,
  LineChart,
  CartesianGrid,
  XAxis,
  YAxis,
  Label,
  Tooltip,
  Line,
  ReferenceLine
} from "recharts";
import './GraphComponent.css';
import moment from "moment";

const formatTimeStamp = (tickFormat) => {
  return moment(tickFormat).format("YYYY/MM/DD HH:mm:ss");
};

// function dotColorSettings(dotData){
//   console.log("start dot data");
//   console.log(dotData);
//   console.log("end dot data");
//   if(dotData.cy<=1000) {
//     return { stroke: 'green', strokeWidth: 2 };
//   } else if(dotData.cy>1000 && dotData.cy<=2000) {
//     return { stroke: 'yellow', strokeWidth: 2 };
//   } else {
//     return { stroke: 'red', strokeWidth: 2 }
//   }
// }

// const SetDotColor = (props) => {
//   console.log(props);
//   const { cx, cy, stroke, payload, value } = props;

//   if (value < 1000) {
//     return (
//         <svg x={cx} y={cy} width={5} height={5} fill="red" viewBox="0 0 1024 1024">
          
//         </svg>
//       );
//   }
//   if (value >= 1001 && value<2001) {
//     return (
      
//         <svg x={cx} y={cy} width={5} height={5} fill="red" viewBox="0 0 1024 1024">
//           <path d="M512 1009.984c-274.912 0-497.76-222.848-497.76-497.76s222.848-497.76 497.76-497.76c274.912 0 497.76 222.848 497.76 497.76s-222.848 497.76-497.76 497.76zM340.768 295.936c-39.488 0-71.52 32.8-71.52 73.248s32.032 73.248 71.52 73.248c39.488 0 71.52-32.8 71.52-73.248s-32.032-73.248-71.52-73.248zM686.176 296.704c-39.488 0-71.52 32.8-71.52 73.248s32.032 73.248 71.52 73.248c39.488 0 71.52-32.8 71.52-73.248s-32.032-73.248-71.52-73.248zM772.928 555.392c-18.752-8.864-40.928-0.576-49.632 18.528-40.224 88.576-120.256 143.552-208.832 143.552-85.952 0-164.864-52.64-205.952-137.376-9.184-18.912-31.648-26.592-50.08-17.28-18.464 9.408-21.216 21.472-15.936 32.64 52.8 111.424 155.232 186.784 269.76 186.784 117.984 0 217.12-70.944 269.76-186.784 8.672-19.136 9.568-31.2-9.12-40.096z" />
//         </svg>
//       );
//   }
//   if (value > 2000) {
//     return (
//       <svg x={cx} y={cy} width={5} height={5} fill="red" viewBox="0 0 1024 1024">
//           <path d="M512 1009.984c-274.912 0-497.76-222.848-497.76-497.76s222.848-497.76 497.76-497.76c274.912 0 497.76 222.848 497.76 497.76s-222.848 497.76-497.76 497.76zM340.768 295.936c-39.488 0-71.52 32.8-71.52 73.248s32.032 73.248 71.52 73.248c39.488 0 71.52-32.8 71.52-73.248s-32.032-73.248-71.52-73.248zM686.176 296.704c-39.488 0-71.52 32.8-71.52 73.248s32.032 73.248 71.52 73.248c39.488 0 71.52-32.8 71.52-73.248s-32.032-73.248-71.52-73.248zM772.928 555.392c-18.752-8.864-40.928-0.576-49.632 18.528-40.224 88.576-120.256 143.552-208.832 143.552-85.952 0-164.864-52.64-205.952-137.376-9.184-18.912-31.648-26.592-50.08-17.28-18.464 9.408-21.216 21.472-15.936 32.64 52.8 111.424 155.232 186.784 269.76 186.784 117.984 0 217.12-70.944 269.76-186.784 8.672-19.136 9.568-31.2-9.12-40.096z" />
//         </svg>
      
//     );
//   }
  
// };

class CustomizedLabel extends React.Component {
  render() {
    const { x, y, stroke, value } = this.props;

    return (
      <text x={x} y={y}  fill={stroke} fontSize={10} textAnchor="middle">
        {value}
      </text>
    );
  }
}


class GraphComponent extends React.Component {

  constructor(props) {
    super(props);
  }

  render() {

    var minCO2MeasurementValueData = this.props.data.reduce((prev, curr) => prev.co2MeasurementValue < curr.co2MeasurementValue ? prev : curr);
    var maxCO2MeasurementValueData = this.props.data.reduce((prev, curr) => prev.co2MeasurementValue > curr.co2MeasurementValue ? prev : curr);
    var minCO2MeasurementValue=minCO2MeasurementValueData.co2MeasurementValue;
    var maxCO2MeasurementValue=maxCO2MeasurementValueData.co2MeasurementValue;
    console.log(minCO2MeasurementValue);
    console.log(maxCO2MeasurementValue);
    if(this.props.data.length>1){
    var maxGreenColorOffset = ((1001 - minCO2MeasurementValue)/(maxCO2MeasurementValue-minCO2MeasurementValue))*100;
    var maxYellowColorOffset = ((2001 - minCO2MeasurementValue)/(maxCO2MeasurementValue-minCO2MeasurementValue))*100; 
    //var maxGreenColorOffset = ((1001 - 400)/(3100))*100;
    //var maxYellowColorOffset = ((2001 - 400)/(3100))*100; 
    var minGreenColorOffset="0";
    var minYellowColorOffset;
    var minRedColorOffset;
    var maxRedColorOffset="100";
    minYellowColorOffset=maxGreenColorOffset;
    minRedColorOffset=maxYellowColorOffset;
    var areGreenDataPointsPresent = true;
    var areYellowDataPointsPresent = true;
    var areRedDataPointsPresent = true;
    if(maxGreenColorOffset <= 0) {
      areGreenDataPointsPresent = false;
      maxGreenColorOffset="0";
      minYellowColorOffset="0";
    }
    if(maxYellowColorOffset <= 0) {
      areYellowDataPointsPresent = false;
      maxGreenColorOffset="0";
      minYellowColorOffset="0";
      maxYellowColorOffset="0";
      minRedColorOffset="0";
    }
    if(maxCO2MeasurementValue<1001) {
      areYellowDataPointsPresent = false;
      maxGreenColorOffset="100"
      minYellowColorOffset="100";
      maxYellowColorOffset="100";
      minRedColorOffset="100";
      maxRedColorOffset="100";
    }
    if(maxCO2MeasurementValue<2001){
      areRedDataPointsPresent=false;
      maxYellowColorOffset="100";
      minRedColorOffset="100";
      maxRedColorOffset="100";
    }

    } else{
      minGreenColorOffset="0"
      maxGreenColorOffset="0"
      minYellowColorOffset="0";
      maxYellowColorOffset="100";
      minRedColorOffset="100";
      maxRedColorOffset="100";
    }

    minGreenColorOffset=minGreenColorOffset+"%";
    maxGreenColorOffset=maxGreenColorOffset+"%"
    minYellowColorOffset=minYellowColorOffset+"%";
    maxYellowColorOffset=maxYellowColorOffset+"%";
    minRedColorOffset=minRedColorOffset+"%";
    maxRedColorOffset=maxRedColorOffset+"%";
    
    return (
      <ResponsiveContainer width={"95%"} height={560}>
      
      <LineChart
        data={this.props.data}
        margin={{ top: 30, right: 30, left: 30, bottom: 30 }}
      >
        <defs>
          <linearGradient id="co2measurementvalue" x1="0%" y1="100%" x2="0%" y2="0%">
            <stop offset={minGreenColorOffset} stopColor="green" />
            <stop offset={maxGreenColorOffset} stopColor="green" />
            <stop offset={minYellowColorOffset} stopColor="yellow" />
            <stop offset={maxYellowColorOffset} stopColor="yellow" />
            <stop offset={minRedColorOffset}  stopColor="red" />
            <stop offset={maxRedColorOffset}  stopColor="red" />

            
            
          </linearGradient>
        </defs>
      
      <CartesianGrid strokeDasharray="3 3">
      </CartesianGrid >
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
          //dot={<SetDotColor />}
          dot={false}
          //activeDot={false}
          stroke="url(#co2measurementvalue)"
          strokeWidth="3px"   
          // type={"natural"}
          type="monotone"
          activeDot={{ stroke: 'grey', strokeWidth: 2, r: 3, fill: 'white' }}
          // fill={dotColorSettings}
          //label={<CustomizedLabel />}
          
        />

       
       {/* <ReferenceLine y={1000}  stroke="green"  strokeWidth="1.5px" strokeDasharray="5 5"/>
       <ReferenceLine y={1001}  stroke="yellow" />
       
       
       
       <ReferenceLine y={2001}  stroke="red" />
       <ReferenceLine y={2000}  stroke="yellow" strokeWidth="1.5px" strokeDasharray="5 5"/> */}

      <ReferenceLine y={1000}  stroke="orange"  strokeWidth="1.5px" />
      <ReferenceLine y={2000}  stroke="orange"  strokeWidth="1.5px" />
       
        
      
    </LineChart>
    </ResponsiveContainer>
    );
    
  }

}

export default GraphComponent;
