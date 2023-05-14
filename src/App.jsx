/* eslint-disable no-unused-vars */
import { useEffect, useState } from 'react';
import { Route, Routes } from 'react-router-dom'
import Home from './pages/Home';
import Table from './pages/Table';

const ws = new WebSocket("ws://localhost:6969/");

export default function App() {
  
  const [userData, setUserData] = useState();

  return (
    <>
      <header>
        <p>Coleta de Dados — Balança Lab. 🧪</p>
      </header>
      <Routes>
        <Route
          path='/'
          element={<Home ws={ws} userData={userData} setUserData={setUserData}/>}
        />
        <Route
          path='table'
          element={<Table ws={ws} userData={userData}/>}
        />
      </Routes>

      <p id="cop"> © 2023, joaotorvitor. All rights reserved.</p>
    </>
  )
}
