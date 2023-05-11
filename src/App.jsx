/* eslint-disable no-unused-vars */
import { useState } from 'react';
import { Route, Routes } from 'react-router-dom'
import Home from './pages/Home';
import Table from './pages/Table';
import { Link } from 'react-router-dom';

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
          element={<Home userData={userData} setUserData={setUserData}/>}
        />
        <Route
          path='table'
          element={<Table userData={userData}/>}
        />
      </Routes>

      <p id="cop"> © 2023, joaotorvitor. All rights reserved.</p>
    </>
  )
}
