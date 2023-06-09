import "./Table.css";
import React, { useContext, useInsertionEffect } from "react"
import TableHead from "../components/table/TableHead";
import TableBody from "../components/table/TableBody";
import TableButtons from "../components/table/TableButtons";
import { AppContext } from "../App";
import { TableContext } from "../contexts/TableContext";

export default function Table() {
  //change the body class to individual page styles
  useInsertionEffect(() => {
    // console.clear();
    document.body.classList.add("table-page");
    
    return () => {
      document.body.classList.remove("table-page");
    };
  }, []);

  const [{userData}, {weights, current}] = [useContext(AppContext), useContext(TableContext)];

  const criteriaCalc = (user, weights) => {
    const { p1, p2, p3, p4 } = weights;
    const { volume, tolerance, density } = user;
    
    const v = [];
    const d = [];
    const calcContent = [];
    const di2Sample = [];
    const qnValue = volume - tolerance;

    for (let n = 1; n <= 6; n++) {
      
    }


  }

  return (
    <>
      <div className="container">
        <table>
          <TableHead />
          <TableBody />
        </table>
      </div>

      <p id="observation">Para deletar uma coluna, basta clicar no título dela</p>

      {
       current.Completed.length === 4 ?
       
        <div className="container conformity">
          <table>
            <thead>
              <tr>
                <th>Conformidade Volume Individual</th>
                <th>Conformidade Volume Médio</th>
              </tr>
            </thead>
            <tbody>
              <tr id={"TODO: ok nok logic"}>
                <td>1</td>
                <td>1</td>
              </tr>
            </tbody>
          </table>
        </div>
        
        : <p id="loading"><span>Calculando Critérios INMETRO. . .</span></p>
      }

      <div className="send-btn-container">
        <TableButtons />
      </div>
    </>
  )
}