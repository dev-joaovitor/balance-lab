/* eslint-disable no-unused-vars */
import React, { useInsertionEffect, useState } from "react"
import { Link } from "react-router-dom";
import "./Table.css";

const ws = new WebSocket("ws://localhost:666/");

export default function Table() {
  //change the body class to individual page styles
  useInsertionEffect(() => {
    console.clear();
    document.body.classList.add("table-page");
    
    return () => {
      document.body.classList.remove("table-page");
    };
  }, []);
  
  //table initializer, enum the beak column
  const tableInit = [""];
  for (let i = 1; i <= 20; i++) {
    tableInit.push({
      "id": i,
      "weight1": "",
      "weight2": "",
      "weight3": "",
      "weight4": "",
    });
  }


  const [weights, setWeights]        = useState([]), //weight storage
        [rows, setRows]              = useState(tableInit), //table storage
        [current, setCurrent]        = useState({Row: 1, Column: 1}), //table coord storage
        [notReady, setNotReady]      = useState(true), //button status
        [buttonText, setbuttonText]  = useState("Enviar ao MES"); //button status


  const addWeight = (weight) => {
    //if the table is finished, don"t accept more values
    if (notReady === false) return (ws.send("stop"), 
    alert("Tabela já finalizada, envie os dados!"));

    console.log(current);

    //add weight to table
    rows[current.Row]["weight" + current.Column] = weight;

    //store the weights in the array
    weights.push(weight);
    setWeights(weights);

    //store the table values
    setRows([...rows]);

    //water columns are limited by 6 rows
    if (!(current.Column % 2) && current.Row === 6) {
      rows.map((row, idx) => {
        idx > 6 && (row["weight" + current.Column] = "---");
      })
      current.Row = 20;
      setCurrent(current);
    }
  
    //row 20 means the end of a column
    if (current.Row === 20) {
      current.Row = 1;
      current.Column++;
      
      if (current.Column === 5) return setNotReady(false);

      return setCurrent(current);
    }

    //new row
    current.Row++;
  
    return setCurrent(current);
  }

  const sendWeights = () => {
    setbuttonText("Enviado!");

    if (notReady) return alert("Não foi possível enviar, verifique os campos!");

    ws.send(JSON.stringify({weights}));
  }

  ws.onmessage = (msg) => addWeight(msg.data); //receiving data from backend

  return (
    <>
  <div className="container">
    <table>
      <thead>
        <tr>
          <th>Nº do Bico</th>
          <th>Amostra</th>
          <th>Amostra + Água</th>
          <th>Embalagem</th>
          <th>Embalagem + Água</th>
        </tr>
      </thead>
      <tbody>
        {
          rows.slice(1).map((row, idx) => (
            <tr key={idx} className={current.Row === row.id ? "current-row" : ""}>
              <td>{row.id}</td>
              <td className={current.Column === 1 ? "current-column" : ""}>{row.weight1}</td>
              <td className={current.Column === 2 ? "current-column" : ""}>{row.weight2}</td>
              <td className={current.Column === 3 ? "current-column" : ""}>{row.weight3}</td>
              <td className={current.Column === 4 ? "current-column" : ""}>{row.weight4}</td>
            </tr>
          ))
        }
      </tbody>
    </table>
  </div>
  <div className="send-btn-container">
  <button onClick={sendWeights} className="send-btn" disabled={notReady}>{buttonText}</button>
  </div>
  <p id="cop"> © 2023, joaotorvitor. All rights reserved.</p>
    </>
  )
}