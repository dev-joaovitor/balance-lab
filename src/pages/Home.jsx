/* eslint-disable no-unused-vars */
import React, { useInsertionEffect, useState } from 'react'
import './Home.css';

const ws = new WebSocket("ws://localhost:666/");

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
      const volumes = ['1ml', '2ml', '3ml'];

      const sendForm = () => {
        ws.send(JSON.stringify({ test: 12 }));
      }

    //   id
    //   densidade
    //   volume
    //   linha

      return (
        <>
            <div className="form-container">
                <form>
                    <label htmlFor="user-id">Digite seu ID</label>
                    <input type="text" name="user-id" id="user-id" required/><br />
        
                    <label htmlFor="density">Densidade</label>
                    <input type="text" name="density" id="density" required/><br />
        
                    <select
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
                </form>
            </div>
        </>
      )
}