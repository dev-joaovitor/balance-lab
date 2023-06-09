/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React, { useEffect, useInsertionEffect, useContext } from "react"
import "./Home.css";
import { AppContext } from "../App";
import { HomeContext } from "../contexts/HomeContext";
import { IdInput, BatchInput, DensityInput, LineSelect, VolumeSelect, SaveData } from "../components/home/HomeInputs"


export default function Home() {
  const { ws } = useContext(AppContext);
  const {
    setNotReady,
    userId,
    batchNo,
    density,
    packLine,
    volume,
  } = useContext(HomeContext);
  
  //change the body class to individual page styles
  useInsertionEffect(() => {
        // console.clear();
        document.body.classList.add("home-page");
        
        return () => {
          document.body.classList.remove("home-page");
        };
      }, []);
      
  useEffect(() => {
    checkFields();
  });

  const fields = [
    userId,
    batchNo,
    density,
    packLine,
    volume
  ];

  const checkFields = () => { //checks if all the fields are valid so the user can submit
    setTimeout(() => {
      if (ws.readyState != 1) return alert("Conexão não estabelecida =(\n Reinicie a página!");
    }, 2000);

    const invalid = ["", undefined, NaN];
    
    if (invalid.some(e => fields.includes(e))) return setNotReady(true);

    return setNotReady(false);
  }

  return (
    <>
      <div className="home-form-container">
        <form className="home-form">
          <p>Dados obrigatórios<br/>para a coleta!</p>
          <IdInput />
          <BatchInput />
          <DensityInput />
          <LineSelect />
          <VolumeSelect />
          <SaveData />
        </form>
      </div>
    </>
  )
}