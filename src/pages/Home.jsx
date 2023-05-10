/* eslint-disable no-unused-vars */
import React, { useInsertionEffect, useState } from "react"
import "./Home.css";

const ws = new WebSocket("ws://localhost:666/");
// const ws = new WebSocket("ws://100.100.228.239:666/");

export default function Home() {
    //change the body class to individual page styles
    useInsertionEffect(() => {
        console.clear();
        document.body.classList.add("home-page");
        
        return () => {
          document.body.classList.remove("home-page");
        };
      }, []);

      const lines = [502, 503, 511, 512, 541];
      const volumes = [
        "207ml",
        "237ml",
        "250ml",
        "269ml",
        "275ml",
        "300ml",
        "310ml",
        "313ml",
        "315ml",
        "330ml",
        "343ml",
        "350ml",
        "355ml",
        "385ml",
        "473ml",
        "500ml",
        "550ml",
        "600ml",
        "630ml",
        "650ml",
        "1L",
        "1,1L",
        "1,1L (Gran BOH e Bud)"
      ];

      useState

      const saveForm = () => {
        ws.send(JSON.stringify({ test: 12 }));
      }

    //   id
    //   lote
    //   densidade
    //   linha
    //   volume

      

      return (
        <>
          <div className="home-form-container">
          <form className="home-form">
          <p>Dados obrigatórios<br/>para coleta!</p>
              <label htmlFor="user-id" className="home-labels">
                Usuário *
                <input className="home-inputs" inputMode="numeric" name="user-id" id="user-id" placeholder="Digite seu ID" required/>
              </label>
              
              <label htmlFor="batch-no" className="home-labels">
                Nº do Lote *
                <input className="home-inputs" inputMode="numeric" name="batch-no" id="batch-no" placeholder="Digite o número do lote" required/>
              </label>
        
              <label htmlFor="density" className="home-labels">
                Densidade *
                <input className="home-inputs" inputMode="numeric" name="density" id="density" placeholder="Digite a densidade do item" required/>
              </label>

              <select
              className="home-selects"
              onChange={(e) => console.log(e.target.value)}
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
              onChange={(e) => console.log(e.target.value)}
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
              <button className="save-home-form-btn" onClick={saveForm} disabled>Salvar Dados</button>
          </form>
          </div>
        </>
      )
}