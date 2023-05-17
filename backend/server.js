const ws = require("ws");
const wss = new ws.Server({ port: 6969 });

const mqtt = require('mqtt');
const client = mqtt.connect("http://sodamqtt:1883");

const { spawn } = require("child_process");
const child = spawn("cat", ["/dev/ttyUSB0"]);


const msg = {//payload
  payload: {},
};

const pontoProdutivoObj = {//productive point map
  "ENCH 1 - 502": 2253,
  "ENCH 1 - 503": 2964,
  "ENCH 2 - 503": 3137,
  "ENCH 1 - 511": 27601,
  "ENCH 1 - 512": 10701,
  "ENCH 2 - 512": 10659,
  "ENCH 1 - 541": 17987,
  "ENCH 2 - 541": 32539,
};

const idLinha = {//soda id map
  "ENCH 1 - 502": 12049,
  "ENCH 1 - 503": 11882,
  "ENCH 2 - 503": 11882,
  "ENCH 1 - 511": 11884,
  "ENCH 1 - 512": 11885,
  "ENCH 2 - 512": 11885,
  "ENCH 1 - 541": 11883,
  "ENCH 2 - 541": 11883,
};

const toleranciaObj = {//map tolerance
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
};

client.on("connect", () => console.log("mqtt connected"));

wss.on("connection", (stream) => {
  console.log("ws connected");
 
  child.stdout.on("data", (data) => {//send the weights to the table
    data = data.toString("utf8");//buffer to string
    data = parseFloat(data.replace(/\((\d)\)/g, "$1"));//format only numbers
    stream.send(data);
  })

  child.on("exit", (code) => {//child_process err
    console.log(code);
  })

  //mock sender 200ms
  const balanceMock = setInterval(() => {
    stream.send(getRandomFloat(60, 350, 2));
  }, 200);

  stream.on("message", (message) => {
    message = message.toString();
    message = JSON.parse(message);

    if (message.weights) { //handle weights
      message.weights.p1.map((v, i) => msg.payload[`p1_${i+1}`] = v);
      message.weights.p2.map((v, i) => msg.payload[`p2_${i+1}`] = v);
      message.weights.p3.map((v, i) => msg.payload[`p3_${i+1}`] = v);
      message.weights.p4.map((v, i) => msg.payload[`p4_${i+1}`] = v);
    }

    if (message.userData) { //handle userdata
      msg.payload.idUsuario = message.userData.userId;
      msg.payload.numeroLote = message.userData.batchNo;
      msg.payload.densidadeAgua = message.userData.density;
      msg.payload.linhaPackaging = message.userData.packLine;
      msg.payload.packagingPontoProdutivo = pontoProdutivoObj[msg.payload.linhaPackaging];
      msg.payload.volumeNominal = message.userData.volume;
      msg.payload.toleranciaIndividual = toleranciaObj[msg.payload.volumeNominal];
    }

    console.log(msg.payload);
    sendMqtt("/soda/laboratorio/" + idLinha[msg.payload.linhaPackaging]);
  })
  stream.on("close", () => console.log("closed"));
})

//send to mqtt
function sendMqtt(topic) {
  client.publish(
    topic,
    JSON.stringify(msg.payload),
    () => console.log("Dados enviados!"));
}

//mock weights
function getRandomFloat(min, max, decimals) {
  const str = (Math.random() * (max - min) + min).toFixed(decimals);
 
  return parseFloat(str);
}