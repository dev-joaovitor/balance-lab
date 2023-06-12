import { React, useContext } from 'react'
import { AppContext } from '../../App';
import { TableContext } from '../../contexts/TableContext';
import criteriaCalc from './criteriaCalc';

export default function Conformity() {
    const [{userData}, {weights, current}] = [useContext(AppContext), useContext(TableContext)];

    const INMETRO = criteriaCalc(weights, userData);

  return (
    <>
        {
        !Object.keys(userData).length ? <p id="loading"><span>PARA CALCULAR O CRITÉRIO, PREENCHA OS DADOS INICIAIS</span></p>

        : current.Completed.length === 4 ?

          <div {...console.log(INMETRO)} className="container conformity">
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
    </>
  )
}