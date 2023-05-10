/* eslint-disable no-undef */
const ws = require("ws");

function getRandomFloat(min, max, decimals) {
    const str = (Math.random() * (max - min) + min).toFixed(decimals);
  
    return parseFloat(str);
  }

const msg = {
  payload: {},
};

const server = new ws.Server({ port: 666 });

server.on("connection", (stream) => {
  console.log("connected");

  const balanceMock = setInterval(() => {
      stream.send(getRandomFloat(60, 350, 2));
  }, 100);

  stream.on("message", (message) => {
    message = message.toString();

    if (message === "stop") return clearInterval(balanceMock); //stops the mock

    message = JSON.parse(message);

    if (message.weights) { //handle weights
      msg.payload.p1 = message.weights.slice(0,20);
      msg.payload.p2 = message.weights.slice(20,26);
      msg.payload.p3 = message.weights.slice(26,46);
      msg.payload.p4 = message.weights.slice(46,52);
    }

    if (message.test) {
      msg.payload.test = message.test;
    }

    console.log(msg.payload);
  })

  stream.on("close", () => console.log("closed"));

})



// function getRandomFloat(min, max, decimals) {
//   const str = (Math.random() * (max - min) + min).toFixed(decimals);

//   return parseFloat(str);
// }
// const balanceMock = setInterval(() => {
//     stream.send(getRandomFloat(60, 350, 2));
// }, 50);