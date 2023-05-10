/* eslint-disable no-unused-vars */
import { Outlet } from 'react-router-dom'
import { Link } from 'react-router-dom';


export default function App() {
  
  return (
    <>
      <header>
        <p>Coleta de Dados — Balança</p>
        
            <ul>
              <li><Link to="/">Home</Link></li>
              <li><Link to="/table">Table</Link></li>
            </ul>
      </header>
      <Outlet />
    </>
  )
}
