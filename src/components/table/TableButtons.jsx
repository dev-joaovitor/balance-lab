import { useContext } from "react";
import { AppContext } from "../../App";
import { TableContext } from "../../contexts/TableContext";
import { useNavigate } from "react-router";

export default function TableButtons() {
    const navigate = useNavigate();
    const { userData, ws } = useContext(AppContext);
    const {
        weights,
        notReady,
        setNotReady,
        buttonText,
        setButtonText,
      } = useContext(TableContext);

  //send the data collected to the backend
  const sendData = () => {
    if (notReady) return alert("Não foi possível enviar, verifique os campos!");

    setButtonText("Enviado!");
    ws.send(JSON.stringify({weights, userData}));
    setNotReady(true);
  }

  //back to the homepage forms
  const backHome = () => (setButtonText("Enviar ao MES"), navigate("/"));

    return (
        <>
        <button onClick={sendData} className="send-btn" disabled={notReady}>{buttonText}</button>
        <button onClick={backHome} className="back-btn">Voltar ao início</button>
        </>
    )
}