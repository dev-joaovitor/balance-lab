/* eslint-disable no-unused-vars */
import React, { useInsertionEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import './Table.css';

let ws = '';

const connect = () => {
  new WebSocket('ws://localhost:666/').readyState
}

connect();

export default function Table() {
  //change the body class to individual page styles
  useInsertionEffect(() => {
    console.clear();
    document.body.classList.add('table-page');
    
    return () => {
      document.body.classList.remove('table-page');
    };
  }, []);

  //table initializer, enum the beak column
  const tableInit = [''];

  for (let i = 1; i <= 20; i++) {
    tableInit.push({
      'id': i,
      'weight1': "",
      'weight2': "",
      'weight3': "",
      'weight4': "",
    });
  }
  

  const [weights, setWeights] = useState([]), //weight storage
        [rows, setRows]       = useState([...tableInit]), //table storage
        [current, setCurrent] = useState({Row: 1, Column: 1}); //table coord storage
  
        
  const addWeight = (weight) => {
    //if the table is finished, don't accept more values
    if (current.Column === 5) {
      ws.close();
      return alert('Tabela já finalizada, envie os dados!');
    }
    console.log(current);

    //add weight to table
    rows[current.Row]['weight' + current.Column] = weight;

    //store the weights in the array
    weights.push(weight);
    setWeights(weights);

    //store the table values
    setRows([...rows]);

    //water columns are limited by 6 rows
    if (!(current.Column % 2) && current.Row === 6) {
      rows.map((row, idx) => {
        idx > 6 && (row['weight' + current.Column] = '---');
      })
      current.Row = 20;
      setCurrent(current);
    }
  
    //row 20 means the end of a column
    if (current.Row === 20) {
      current.Row = 1;
      current.Column++;
      return setCurrent(current);
    }

    //new row
    current.Row++;
    return setCurrent(current);
  }


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
            <tr key={idx}>
              <td>{row.id}</td>
              <td>{row.weight1}</td>
              <td>{row.weight2}</td>
              <td>{row.weight3}</td>
              <td>{row.weight4}</td>
            </tr>
          ))
        }
      </tbody>
    </table>
  </div>
  <p id="cop"> © 2023, joaotorvitor. All rights reserved.</p>
      <Link to="/">Home</Link>
    </>
  )
}