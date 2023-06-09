/* eslint-disable react/prop-types */
import { createContext, useContext, useState } from "react";

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

export const TableContext = createContext({
    userData: null,
    weights: {p1: [], p2: [], p3: [], p4: []},
    rows: tableInit,
    current: {Row: 1, Column: 1, Completed: []},
    notReady: true,
    buttonText: "Enviar ao MES",
});

export default function TableContextProvider({ children }) {
    const [weights, setWeights]        = useState({p1: [], p2: [], p3: [], p4: []}), //weight storage
          [rows, setRows]              = useState(tableInit), //table storage
          [current, setCurrent]        = useState({Row: 1, Column: 1, Completed: []}), //table coord storage
          [notReady, setNotReady]      = useState(true), //button status
          [buttonText, setButtonText]  = useState("Enviar ao MES"); //button status

    const exportData = {
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
    };

    return (
        <TableContext.Provider value={exportData}>
            {children}
        </TableContext.Provider>
    )
}