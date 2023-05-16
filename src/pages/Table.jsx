import "./Table.css";
import React, { useContext, useInsertionEffect } from "react"
import { AppContext } from "../App";
import { TableContext } from "../contexts/TableContext";
import { useNavigate } from "react-router-dom";

export default function Table() {
  const { userData, ws } = useContext(AppContext);

  const {
    weights,
    setWeights,
    rows,
    setRows,
    current,
    setCurrent,
    notReady,
    setNotReady,
    buttonText,
    setButtonText,
  } = useContext(TableContext);

  //change the body class to individual page styles
  useInsertionEffect(() => {
    console.clear();
    document.body.classList.add("table-page");
    
    return () => {
      setButtonText("Enviar ao MES");
      document.body.classList.remove("table-page");
    };
  }, []);

  const navigate = useNavigate();

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

    setButtonText("Enviado!");

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
  
  ws.onmessage = (msg) => {
    if (current.Completed.length === 4) return;
    addWeight(msg.data)
  };

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