import { useContext } from "react";
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
        setNotReady,
    } = useContext(TableContext);

    const addWeight = (weight) => {
        weight = parseFloat(weight);
    
        //if table is finished, don"t accept more values
        if (current.Completed.length === 4) return alert("Tabela já finalizada, envie os dados!");
    
        //add weight to table only if there's not a data
        if (rows[current.Row][`weight${current.Column}`] !== "") {
          if (current.Completed.includes(current.Column)) {
            current.Column++;
          }
          
          try {
            current.Row = weights[`p${current.Column}`].length + 1;
          } catch (error) {
            return;
          }

          setCurrent(current);
        }
        rows[current.Row][`weight${current.Column}`] = weight;
        
        //store the weights in the array
        weights[`p${current.Column}`].push(weight);
        setWeights(weights);
    
        //store the table values
        setRows([...rows]);
    
        //average logic
        rows[21][`weight${current.Column}`] = (weights[`p${current.Column}`]
                                              .reduce((acc, cur) => acc + cur, 0)/current.Row)
                                              .toFixed(2);
    
        //water columns are limited by 6 rows
        if (!(current.Column % 2) && current.Row === 6) {
          rows.map((row, idx) => {
            idx > 6 && idx < 21 && (row[`weight${current.Column}`] = "~");
          });
          current.Row = 20;
          setCurrent(current);
        }
    
        //row 20 means the end of a column
        if (current.Row === 20) {
          current.Completed.push(current.Column);
          current.Row = 1;
          current.Column++;
          setCurrent(current);
          
          if (current.Completed.length === 4) return setNotReady(false);
          return;
        }
    
        //new row
        current.Row++;
        return setCurrent(current);
      }


      //websockets listener
      ws.onmessage = (msg) => {
        if (current.Completed.length === 4) return;
        addWeight(msg.data);
      };


    return (
        <tbody>
        {
          rows.slice(1).map((row, idx) => (
            <tr key={idx} className={current.Row === row.title ? "current-row" : ""}>
              <td>{row.title}</td>
              <td className={current.Column === 1 ? "current-column" : ""}>{row.weight1}</td>
              <td className={current.Column === 2 ? "current-column" : ""}>{row.weight2}</td>
              <td className={current.Column === 3 ? "current-column" : ""}>{row.weight3}</td>
              <td className={current.Column === 4 ? "current-column" : ""}>{row.weight4}</td>
            </tr>
          ))
        }
      </tbody>
    )
}