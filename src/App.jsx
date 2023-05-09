import { Outlet } from 'react-router-dom'

export default function App() {
  const lines = [502, 503, 511, 512, 541];

  return (
    <>
      <header>
        <p>Coleta de Dados — Balança</p>
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
      </header>
      <Outlet />
    </>
  )
}
