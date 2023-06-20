import { useContext, useEffect } from "react";
import { AppContext } from "../../App";
import { TableContext } from "../../contexts/TableContext";

export default function TableBody() {
    const { ws } = useContext(AppContext);
    const {
        weights,
        setWeights,
        rows,
        setRows,
        current,
        setCurrent,
        notReady,
        setNotReady,
        setButtonText,
    } = useContext(TableContext);

    useEffect(() => {
      if (current.Completed.length !== 4 && !notReady) setNotReady(true);
      if (!notReady) setButtonText("Enviar ao MES");
    })

    const addWeight = (weight) => {
        weight = parseFloat(weight);
    
        //if table is finished, don"t accept more values
        if (current.Completed.length === 4) return alert("Tabela já finalizada, envie os dados!");
    
        //row 20 means the end of a column
        if (current.Row > 20) {
          current.Completed.push(current.Column);
          current.Row = 1;
          current.Column++;

          if (current.Completed.length === 4) return setNotReady(false);
          
          return setCurrent(current);;
        }

        //water columns are limited by 6 rows
        if (!(current.Column % 2) && current.Row > 6) {
          rows.map((row, idx) => {
            idx > 6 && idx < 21 && (row[`weight${current.Column}`] = "~");
          });
          current.Completed.push(current.Column);
          current.Row = 1;
          current.Column++;
          
          if (current.Completed.length === 4) return setNotReady(false);

          return setCurrent(current);;
        }

        //add weight to table only if there's not a data
        if (rows[current.Row][`weight${current.Column}`]) {
          if (current.Completed.includes(current.Column)) current.Column++;
          
          try {
            current.Row = weights[`p${current.Column}`].length + 1;
          } catch (error) { return };

          return setCurrent(current);
        }
        
        rows[current.Row][`weight${current.Column}`] = weight;
        
        //store the weights in the array
        // try {
        //   weights[`p${current.Column}`][current.Row - 1] = weight;
        //   setWeights(weights);
        // } catch (err) { return; }
        
        try {
          weights[`p${current.Column}`][current.Row - 1] = weight;
          setWeights(weights);
        } catch (err) { 
          return;
        }
    
        //store the table values
        setRows([...rows]);
    
        //new row
        current.Row++;
        return setCurrent(current);
      }
      
      // individual cell delete
      const deleteCell = (col, row) => {
        row += 1;
        
        rows[row][`weight${col}`] = "";
        setRows(rows);

        weights[`p${col}`][row - 1] = "";
        setWeights(weights);

        current.Completed = current.Completed.filter(e => e !== col);
        current.Row = row;
        current.Column = col;
        return setCurrent(current);
      };

      //websockets listener
      ws.onmessage = (msg) => {
        if (current.Completed.length === 4) return;
        addWeight(msg.data);
      };

    return (
        <>
          <tbody>
          {
            rows.slice(1).map((row, idx) => (
              <tr key={idx} onClick={() => console.log({weights, current})} className={current.Row === row.title ? "current-row" : ""}>
                <td>{row.title}</td>
                <td onClick={() => deleteCell(1, idx)} className={current.Column === 1 ? "current-column" : ""}>{row.weight1}</td>
                <td onClick={() => deleteCell(2, idx)} className={current.Column === 2 ? "current-column" : ""}>{row.weight2}</td>
                <td onClick={() => deleteCell(3, idx)} className={current.Column === 3 ? "current-column" : ""}>{row.weight3}</td>
                <td onClick={() => deleteCell(4, idx)} className={current.Column === 4 ? "current-column" : ""}>{row.weight4}</td>
              </tr>
            ))
          }
        </tbody>
      </>
    )
}