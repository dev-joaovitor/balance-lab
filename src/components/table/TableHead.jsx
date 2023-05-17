import { useContext } from "react";
import { TableContext } from "../../contexts/TableContext";

export default function TableHead() {
    const {
        weights,
        setWeights,
        rows,
        setRows,
        current,
        setCurrent,
        setNotReady,
    } = useContext(TableContext);

    //delete a selected column
    const deleteColumn = (col) => {
        weights[`p${col}`] = [];
        setWeights(weights);

        rows.map((row, idx) => idx > 0 && (row["weight" + col] = ""));
        setRows([...rows]);

        current.Completed = current.Completed.filter(e => e !== col);
        current.Row = 1;
        current.Column = col;
        setCurrent(current);

        return setNotReady(true);
    }

    return (
        <thead>
        <tr>
          <th>Nº do Bico</th>
          <th onClick={() => deleteColumn(1)}>Amostra</th>
          <th onClick={() => deleteColumn(2)}>Amostra + Água</th>
          <th onClick={() => deleteColumn(3)}>Embalagem</th>
          <th onClick={() => deleteColumn(4)}>Embalagem + Água</th>
        </tr>
      </thead>
    )
}