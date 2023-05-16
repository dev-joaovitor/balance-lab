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

  const exportData = {
    setUserData,
    userData,
    ws
  }

  return (
    <>
      <header>
        <p>Coleta de Dados — Balança Lab. 🧪</p>
      </header>
      <AppContext.Provider value={exportData}>
        <TableContextProvider>
          <HomeContextProvider>
            <Outlet />
          </HomeContextProvider>
        </TableContextProvider>
      </AppContext.Provider>
      <p id="cop"> © 2023, joaotorvitor. All rights reserved.</p>
    </>
  )
}
