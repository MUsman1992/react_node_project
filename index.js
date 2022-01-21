const express = require("express");
const http = require("http");
const socketIo = require("socket.io");
const cors = require('cors')
const path = require('path')

const port = process.env.PORT || 8080;

const router = express.Router();
// router.get("/", (req, res) => {
//   res.send({ response: "I am alive" }).status(200);
// });

const app = express();
app.use(router);

const server = http.createServer(app);

const io = socketIo(server, {
  transports:['polling'],
  cors:{
    cors: {
      origin: "http://localhost:3000"
    }
  }
});

const whitelist = ['http://localhost:3000', 'http://localhost:8080', 'https://evening-stream-19905.herokuapp.com'];
const corsOptions = {
  origin: function(origin, callback) {
    console.log("** Origin of request " + origin);
    if(whitelist.indexOf(origin)!= 1 || !origin){
      console.log("Origin acceptable");
      callback(null, true);
    }
    else {
      console.log("Origin rejected");
      callback(new Error("Not allowed by CORS"));
    }
  }
}
app.use(cors(corsOptions))
// console.log(process.env.NODE_ENV);
if(process.env.NODE_ENV === 'production'){
  app.use(express.static(path.join(__dirname, 'client/build')));

  app.get('*', function(req,res){
    res.sendFile(path.join(__dirname, 'client/build', 'index.html'))
  });
}

io.of('/getCO2MeasurementData').on("connection", (socket) => {
  console.log('connection has established')
  var interval = setInterval(() => generateCO2MeasurementValue(socket), 10000);
  socket.on("disconnect", () => {
   console.log('disconnect')
   clearInterval(interval);
  });
});

const generateCO2MeasurementValue = socket => {
  // Get random CO2 measurement value (between 400 and 3500 ppm) .
  var min = 400;
  var max = 3500;
  var currentDate = new Date();
  var timestamp = currentDate.getTime();
  const co2MeasurementValue = Math.floor(Math.random() * (max - min + 1)) + min;
  socket.emit("getCO2MeasurementValue", {co2MeasurementValue: co2MeasurementValue, timestamp: timestamp});
};

server.listen(port, () => console.log(`Listening on port ${port}`));