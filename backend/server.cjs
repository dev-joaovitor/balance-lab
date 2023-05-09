/* eslint-disable no-undef */
const ws = require("ws");

function getRandomFloat(min, max, decimals) {
    const str = (Math.random() * (max - min) + min).toFixed(decimals);
  
    return parseFloat(str);
  }

const server = new ws.Server({ port: 666 });

server.on("connection", (stream) => {
  console.log(`connected`);
  setInterval(() => {
      stream.send(getRandomFloat(60, 350, 2));
  }, 2000);
})