import "./Table.css";
import React, { useContext, useInsertionEffect } from "react"
import TableHead from "../components/table/TableHead";
import TableBody from "../components/table/TableBody";
import TableButtons from "../components/table/TableButtons";
import Conformity from "../components/table/Conformity";

export default function Table() {
  //change the body class to individual page styles
  useInsertionEffect(() => {
    // console.clear();
    document.body.classList.add("table-page");
    
    return () => {
      document.body.classList.remove("table-page");
    };
  }, []);

  return (
    <>
      <div className="container">
        <table>
          <TableHead />
          <TableBody />
        </table>
      </div>

      <p id="observation">[ Clique no título da coluna (em azul) para deletá-la ou no peso que deseja excluir individualmente ]</p>

      <Conformity />

      <p id="observation">[ Após enviar os dados, aguarde 1 minuto antes de fazer qualquer coisa ]</p>
      
      <div className="send-btn-container">
        <TableButtons />
      </div>
    </>
  )
}