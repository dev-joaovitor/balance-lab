/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React, { useEffect, useInsertionEffect, useState } from "react"
import { Link, useNavigate } from "react-router-dom";
import "./Table.css";

export default function Table({userData, ws}) {
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
      "title": i,
      "weight1": "",
      "weight2": "",
      "weight3": "",
      "weight4": "",
    });
  }

  tableInit.push({
    "title": "MÉDIA"
  })

  const navigate = useNavigate();

  const [weights, setWeights]        = useState({p1: [], p2: [], p3: [], p4: []}), //weight storage
        [rows, setRows]              = useState(tableInit), //table storage
        [current, setCurrent]        = useState({Row: 1, Column: 1, Completed: []}), //table coord storage
        [notReady, setNotReady]      = useState(true), //button status
        [buttonText, setbuttonText]  = useState("Enviar ao MES"); //button status


  const addWeight = (weight) => {
    weight = parseFloat(weight);

    //if table is finished, don"t accept more values
    if (current.Completed.length === 4) return alert("Tabela já finalizada, envie os dados!");

    //add weight to table only if there's not a data
    if (rows[current.Row][`weight${current.Column}`] !== "") {
      if (current.Completed.includes(current.Column)) {
        current.Column++;
      }

      current.Row = weights[`p${current.Column}`].length + 1;
      setCurrent(current);
    }
    rows[current.Row][`weight${current.Column}`] = weight;
    
    //store the weights in the array
    weights[`p${current.Column}`].push(weight);
    setWeights(weights);

    //store the table values
    setRows([...rows]);

    //average logic
    rows[21][`weight${current.Column}`] = (weights[`p${current.Column}`]
                                          .reduce((acc, cur) => acc + cur, 0)/current.Row)
                                          .toFixed(2);

    //water columns are limited by 6 rows
    if (!(current.Column % 2) && current.Row === 6) {
      rows.map((row, idx) => {
        idx > 6 && idx < 21 && (row[`weight${current.Column}`] = "---");
      });
      current.Row = 20;
      setCurrent(current);
    }

    //row 20 means the end of a column
    if (current.Row === 20) {
      current.Completed.push(current.Column);
      current.Row = 1;
      current.Column++;
      setCurrent(current);
      
      if (current.Completed.length === 4) return setNotReady(false);

      return;
    }

    //new row
    current.Row++;
    return setCurrent(current);
  }

  //send the data collected to the backend
  const sendData = () => {
    if (notReady) return alert("Não foi possível enviar, verifique os campos!");

    setbuttonText("Enviado!");

    ws.send(JSON.stringify({weights, userData}));

    setNotReady(true);
  }

  //back to the homepage forms
  const backHome = () => navigate("/");

  //delete a selected column
  const clearColumn = (col) => {
    weights[`p${col}`] = [];
    setWeights(weights);

    rows.map((row, idx) => idx > 0 && (row["weight" + col] = ""));
    setRows([...rows]);
    
    current.Completed = current.Completed.filter(e => e !== col);
    current.Row = 1;
    current.Column = col;
    setCurrent(current);

    return setNotReady(true);
  }
  
  ws.onmessage = (msg) => addWeight(msg.data);

  return (
    <>
  <div className="container">
    <table>
      <thead>
        <tr>
          <th>Nº do Bico</th>
          <th onClick={() => clearColumn(1)}>Amostra</th>
          <th onClick={() => clearColumn(2)}>Amostra + Água</th>
          <th onClick={() => clearColumn(3)}>Embalagem</th>
          <th onClick={() => clearColumn(4)}>Embalagem + Água</th>
        </tr>
      </thead>
      <tbody>
        {
          rows.slice(1).map((row, idx) => (
            <tr key={idx} className={current.Row === row.title ? "current-row" : ""}>
              <td>{row.title}</td>
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
    <p id="observation">Para deletar uma coluna, basta clicar no título dela</p>
  <div className="send-btn-container">
  <button onClick={sendData} className="send-btn" disabled={notReady}>{buttonText}</button>
  <button onClick={backHome} className="back-btn">Voltar ao início</button>
  </div>
    </>
  )
}