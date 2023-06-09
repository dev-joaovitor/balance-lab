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

  const INMETRO = [];

  // inmetro criteria
  const criteriaCalc = () => {
    const { p1, p2, p3, p4 } = weights;
    const { volume, tolerance, density } = userData;

    const v = [];
    const d = [];
    const calcVolume = [];
    const indivAccCriteria = [];
    const di2Sample = [];
    const qnValue = volume - tolerance;

    for (let n = 0; n < 6; n++) {
      v.push((p1[n] - p2[n] - p3[n] + p4[n])/density);
      d.push((p1[n] - p3[n])/v[n]);
    }

    const avgD = d.reduce((prev, curr) => prev + curr)/6;

    for (let n = 0; n < 20; n++) {
      calcVolume.push((p1[n] - p3[n])/avgD);
      indivAccCriteria.push(calcVolume[n] > qnValue ? "OK" : "NOK");
    }

    const indivVolConformity = indivAccCriteria.every(e => e === "OK") ? "OK" : "NOK";
    const avgVolume = calcVolume.reduce((prev, curr) => prev + curr)/20;

    for (let n = 0; n < 20; n++) {
      di2Sample.push(Math.pow((calcVolume[n] - avgVolume), 2));
    }

    const diSum = di2Sample.reduce((prev, curr) => prev + curr)/19;
    const standardDeviation = Math.pow(diSum, 0.5);
    const avgVolCriteria = volume - (0.485 * standardDeviation);
    const avgVolConformity = avgVolume >= avgVolCriteria ? "OK" : "NOK";

    INMETRO.push(indivVolConformity, avgVolConformity);

    return;
  }

  return (
    <>
      <div className="container">
        <table>
          <TableHead />
          <TableBody />
        </table>
      </div>

      <p id="observation">[ Para deletar uma coluna, basta clicar no título dela ]</p>
      <p id="observation">[ Após enviar os dados, aguarde 1 minuto antes de fazer qualquer coisa ]</p>

      {
        !Object.keys(userData).length ? <p id="loading"><span>PARA CALCULAR O CRITÉRIO, PREENCHA OS DADOS INICIAIS</span></p>

        : current.Completed.length === 4 ?

          <div {...criteriaCalc()} className="container conformity">
            <table>
              <thead>
                <tr>
                  <th>Conformidade Volume Individual</th>
                  <th>Conformidade Volume Médio</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td id={INMETRO[0]}>{INMETRO[0]}</td>
                  <td id={INMETRO[1]}>{INMETRO[1]}</td>
                </tr>
              </tbody>
            </table>
          </div>
          
          : <p id="loading"><span>Calculando Critérios INMETRO...</span></p>
      }

      <div className="send-btn-container">
        <TableButtons />
      </div>
    </>
  )
}