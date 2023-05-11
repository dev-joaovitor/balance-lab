/* eslint-disable no-unused-vars */
import React, { useEffect, useInsertionEffect, useState, useContext, createContext } from "react"
import { useNavigate } from "react-router-dom";
import "./Home.css";


const lines = [502, 503, 511, 512, 541];

const volumes = [
  "207ml", "237ml", "250ml", "269ml", "275ml",
  "300ml", "310ml", "313ml", "315ml", "330ml",
  "343ml", "350ml", "355ml", "385ml", "473ml",
  "500ml", "550ml", "600ml", "630ml", "650ml",
  "1L", "1.1L", "1L (Gran BOH e Bud)"
];

export default function Home({setUserData}) {
    //change the body class to individual page styles
    useInsertionEffect(() => {
        console.clear();
        document.body.classList.add("home-page");
        
        return () => {
          document.body.classList.remove("home-page");
        };
      }, []);
      
      useEffect(() => {
        checkFields();
      })

      const navigate = useNavigate();
      
      const [notReady, setNotReady] = useState(true), //send button status
            [userId, setUserId]     = useState(''), //stores userid
            [batchNo, setBatchNo]   = useState(''), //stores batchno
            [density, setDensity]   = useState(''), //stores density
            [packLine, setPackLine] = useState(''), //stores packaging line
            [volume, setVolume]     = useState(''); //stores volume

      const fields = [
        userId,
        batchNo,
        density,
        packLine,
        volume
      ]

      const checkFields = () => { //checks if all the fields are valid so the user can submit
        if (fields.includes('')) {
          return setNotReady(true);
        }

        return setNotReady(false);
      }

      const saveForm = () => { //saves the data and redirect to table page
        console.log(userId.length);
        if (userId.length != 8) return alert("O ID deve conter 8 dígitos");

        setUserData({
          userId: parseFloat(userId),
          batchNo,
          density,
          packLine,
          volume: (volume === "1L (Gran BOH e Bud)" ? '990.00' :
                   volume === "1L" ? '1000.00' :
                   volume === "1.1L" ? '1100.00' : parseFloat(volume).toFixed(2)),
        });
        return navigate("/table");
      }

      return (
        <>
          <div className="home-form-container">
          <form className="home-form">
          <p>Dados obrigatórios<br/>para a coleta!</p>
              <label htmlFor="user-id" className="home-labels">
                Usuário *
                <input
                onChange={(e) => {
                  const val = e.currentTarget.value;

                  if (isNaN(val)) return alert("Apenas números!"), e.currentTarget.value = '';

                  if (val.length > 8) return e.currentTarget.value = val.slice(0,8);

                  setUserId(val);
                }}
                className="home-inputs"
                name="user-id" 
                id="user-id"
                placeholder="Digite seu ID"
                required/>
              </label>
              
              <label htmlFor="batch-no" className="home-labels">
                Nº do Lote *
                <input
                onChange={(e) => {
                  const val = e.currentTarget.value;

                  if (isNaN(val)) return alert("Apenas números!"), e.currentTarget.value = '';

                  setBatchNo(parseInt(val));
                }}
                className="home-inputs"
                name="batch-no"
                id="batch-no"
                placeholder="Digite o número do lote"
                required/>
              </label>
        
              <label htmlFor="density" className="home-labels">
                Densidade *
                <input
                onChange={(e) => {
                  const val = e.currentTarget.value;

                  if (isNaN(val)) return alert("Apenas números!"), e.currentTarget.value = '';

                  setDensity(parseInt(val));
                }}
                className="home-inputs"
                name="density"
                id="density"
                placeholder="Digite a densidade do item"
                required/>
              </label>

              <select
              className="home-selects"
              onChange={(e) => {
                setPackLine(parseInt(e.currentTarget.value));
              }}
              id="pack-line"
              defaultValue=""
              required>
              
              <option
                value=""
                disabled
                hidden>
                Selecione a linha
              </option>

              {lines.map((line, idx) => (
                <option key={idx} value={line}>{line}</option>
                ))}

              </select>

              <select
              className="home-selects"
              onChange={(e) => {
                setVolume(e.currentTarget.value);
              }}
              id="volume"
              defaultValue=""
              required>
              
              <option
                value=""
                disabled
                hidden>
                Selecione o volume
              </option>

              {volumes.map((volume, idx) => (
                <option key={idx} value={volume}>{volume}</option>
                ))}

              </select>
              <button type="button" className="save-home-form-btn" onClick={saveForm} disabled={notReady}>Salvar Dados</button>
          </form>
          </div>
        </>
      )
}