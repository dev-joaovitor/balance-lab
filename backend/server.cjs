/* eslint-disable no-undef */
const ws = require("ws");

function getRandomFloat(min, max, decimals) {
    const str = (Math.random() * (max - min) + min).toFixed(decimals);
  
    return parseFloat(str);
  }

const msg = {
  payload: {},
};

const toleranciaObj = {
  207: 10.35,
  237: 11.85,
  250: 9,
  269: 9,
  275: 9,
  300: 9,
  310: 9.3,
  313: 9,
  315: 9,
  330: 9.9,
  343: 10.29,
  350: 10.5,
  355: 10.65,
  385: 11.55,
  473: 14.19,
  500: 15,
  550: 15,
  600: 15,
  630: 15,
  650: 19.5,
  990: 5,
  1000: 15,
  1100: 16.5,
}

const server = new ws.Server({ port: 6969 });

server.on("connection", (stream) => {
  console.log("connected");

  const balanceMock = setInterval(() => {
      stream.send(getRandomFloat(60, 350, 2));
  }, 100);

  stream.on("message", (message) => {
    message = message.toString();

    if (message === "stop") return clearInterval(balanceMock); //stops the mock

    message = JSON.parse(message);

    console.log(message);

    if (message.weights) { //handle weights
      message.weights.slice(0,20) .map((v, i) => msg.payload[`p1_${i+1}`] = parseFloat(v)) //p1
      message.weights.slice(20,26).map((v, i) => msg.payload[`p2_${i+1}`] = parseFloat(v)) //p2
      message.weights.slice(26,46).map((v, i) => msg.payload[`p3_${i+1}`] = parseFloat(v)) //p3
      message.weights.slice(46,52).map((v, i) => msg.payload[`p4_${i+1}`] = parseFloat(v)) //p4
    }

    if (message.userData) { //handle userdata
      msg.payload.idUsuario = message.userData.userId;
      msg.payload.numeroLote = message.userData.batchNo;
      msg.payload.densidadeAgua = message.userData.density;
      msg.payload.linhaPackaging = message.userData.packLine;
      msg.payload.volumeNominal = message.userData.volume;
      msg.payload.toleranciaIndividual = toleranciaObj[msg.payload.volumeNominal];
    }

    console.log(msg.payload);
  })

  stream.on("open", () => console.log("opened"));
  stream.on("close", () => console.log("closed"));
})



// function getRandomFloat(min, max, decimals) {
//   const str = (Math.random() * (max - min) + min).toFixed(decimals);

//   return parseFloat(str);
// }
// const balanceMock = setInterval(() => {
//     stream.send(getRandomFloat(60, 350, 2));
// }, 50);