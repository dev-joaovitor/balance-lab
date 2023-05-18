/* eslint-disable no-unused-vars */
import { createContext, useContext, useEffect, useState } from 'react';
import { Outlet } from 'react-router-dom'
import Home from './pages/Home';
import Table from './pages/Table';
import TableContextProvider from './contexts/TableContext';
import HomeContextProvider from './contexts/HomeContext';

const ws = new WebSocket("ws://localhost:6969/");

export const AppContext = createContext({
  userData: {},
  ws,
});

export default function App() {
  const [userData, setUserData] = useState({});
  const [connected, setConnected] = useState(false);

  ws.onopen = () => setConnected(true);
  ws.onclose = () => setConnected(false);

  const exportData = {
    setUserData,
    userData,
    ws
  }

  return (
    <>
      <header>
        <p>
          <img id="lab-scale-img" src="/lab-scale-by-vectorsmarket15.png" alt="laboratory-scale-weight"/>
          Coleta de Dados — Balança Lab.</p>
      </header>
      <AppContext.Provider value={exportData}>
        <TableContextProvider>
          <HomeContextProvider>
            <Outlet />
          </HomeContextProvider>
        </TableContextProvider>
      </AppContext.Provider>
      <div className="connection-container">
        <p id="connection">Conexão:</p>
        <div id={connected ? "on" : "off"}></div>
      </div>
      <p id="copyright"> © 2023, joaotorvitor. All rights reserved. =D</p>
    </>
  )
}
