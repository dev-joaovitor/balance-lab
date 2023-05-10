/* eslint-disable no-unused-vars */
import { Outlet } from 'react-router-dom'
import { Link } from 'react-router-dom';


export default function App() {
  
  return (
    <>
      <header>
        <p>Coleta de Dados — Balança</p>
      </header>
      <Outlet />
      <p id="cop"> © 2023, joaotorvitor. All rights reserved.</p>
    </>
  )
}
