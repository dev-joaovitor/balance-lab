/* eslint-disable no-unused-vars */
import { createContext, useContext, useEffect, useState } from 'react';
import { Outlet } from 'react-router-dom'
import Home from './pages/Home';
import Table from './pages/Table';

const ws = new WebSocket("ws://localhost:6969/");

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
});

export const AppContext = createContext({
    userData: null,
    weights: {p1: [], p2: [], p3: [], p4: []},
    rows: tableInit,
    current: {Row: 1, Column: 1, Completed: []},
    notReady: true,
    buttonText: "Enviar ao MES",
    ws
});

export default function App() {
  
  const [userData, setUserData]      = useState(),
        [weights, setWeights]        = useState({p1: [], p2: [], p3: [], p4: []}), //weight storage
        [rows, setRows]              = useState(tableInit), //table storage
        [current, setCurrent]        = useState({Row: 1, Column: 1, Completed: []}), //table coord storage
        [notReady, setNotReady]      = useState(true), //button status
        [buttonText, setButtonText]  = useState("Enviar ao MES"); //button status

  const exportData = {
    userData,
    setUserData,
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
    ws
  }
  
  return (
    <>
      <header>
        <p>Coleta de Dados — Balança Lab. 🧪</p>
      </header>
      <AppContext.Provider value={exportData}>
        <Outlet />
      </AppContext.Provider>
      <p id="cop"> © 2023, joaotorvitor. All rights reserved.</p>
      {/* <Routes>
        <Route
          path='/'
          element={<Home ws={ws} userData={userData} setUserData={setUserData}/>}
        />
        <Route
          path='table'
          element={<Table ws={ws} userData={userData}/>}
        />
      </Routes> */}

    </>
  )
}
