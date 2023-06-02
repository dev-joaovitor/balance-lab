import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AppContext } from "../../App";
import { HomeContext } from "../../contexts/HomeContext";
import { TableContext } from "../../contexts/TableContext";

export function IdInput() {
    const { userId, setUserId } = useContext(HomeContext);

    return (
        <label htmlFor="user-id" className="home-labels">
            Usuário *
            <input
            onChange={(e) => {
              const val = e.currentTarget.value;

              if (isNaN(val)) return alert("Apenas números!"), setUserId("");

              if (val.length > 8) return e.currentTarget.value = val.slice(0,8);

              setUserId(val);
            }}
            className="home-inputs"
            name="user-id" 
            id="user-id"
            placeholder="Digite seu ID"
            value={userId}
            required/>
        </label>
    )
}

export function BatchInput() {
    const { batchNo, setBatchNo } = useContext(HomeContext);

    return (
        <label htmlFor="batch-no" className="home-labels">
            Nº do Lote *
            <input
            onChange={(e) => {
              const val = e.currentTarget.value;

              if (isNaN(val)) return alert("Apenas números!"), setBatchNo("");

              setBatchNo(val);
            }}
            className="home-inputs"
            name="batch-no"
            id="batch-no"
            placeholder="Digite o número do lote"
            value={batchNo}
            required/>
        </label>
    )
}

export function DensityInput() {
    const { density, setDensity } = useContext(HomeContext);

    return (
        <label htmlFor="density" className="home-labels">
            Densidade da Água*
            <input
            onChange={(e) => {
              const val = e.currentTarget.value;

              if (isNaN(val)) return alert("Apenas números!"), setDensity("");

              setDensity(val);
            }}
            className="home-inputs"
            name="density"
            id="density"
            placeholder="Digite a densidade utilizada"
            value={density}
            required/>
        </label>
    )
}

export function LineSelect() {
    const { packLine, setPackLine } = useContext(HomeContext);

    const lines = [
        "ENCH 1 - 502",
        "ENCH 1 - 503", "ENCH 2 - 503",
        "ENCH 1 - 511",
        "ENCH 1 - 512", "ENCH 2 - 512",
        "ENCH 1 - 541", "ENCH 2 - 541",
      ];

    return (
        <select
          className="home-selects"
          onChange={(e) => {
            setPackLine(e.currentTarget.value);
          }}
          id="pack-line"
          value={packLine}
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
    )
}

export function VolumeSelect() {
    const { volume, setVolume } = useContext(HomeContext);

    const volumes = [
        "207ml", "237ml", "250ml", "269ml", "275ml",
        "300ml", "310ml", "313ml", "315ml", "330ml",
        "343ml", "350ml", "355ml", "385ml", "410ml",
        "473ml", "500ml", "550ml", "600ml", "630ml",
        "650ml", "1L", "1.1L", "1L (Gran BOH e Bud)"
      ];

    return (
        <select
          className="home-selects"
          onChange={(e) => {
            setVolume(e.currentTarget.value);
          }}
          id="volume"
          value={volume}
          required>
          
          <option
            value=""
            disabled
            hidden>
            Selecione o volume
          </option>

          {volumes.map((volume, idx) => (
            <option key={idx} value={volume}>{volume}</option>
            ))}

        </select>
    )
}

export function SaveData() {
    const { setUserData } = useContext(AppContext);
    const { setNotReady } = useContext(TableContext);
    const {
        notReady,
        userId,
        batchNo,
        density,
        packLine,
        volume,
      } = useContext(HomeContext);

      const navigate = useNavigate();

      const saveForm = () => { //saves the data and redirect to table page
        if (userId.length != 8) return alert("O ID deve conter 8 dígitos");
    
        setUserData({
          userId: parseFloat(userId),
          batchNo: parseFloat(batchNo),
          density: parseFloat(density),
          packLine,
          volume: (volume === "1L (Gran BOH e Bud)" ? 990 :
                   volume === "1L" ? 1000 :
                   volume === "1.1L" ? 1100 : parseFloat(volume)),
        });
        
        setNotReady(false);

        return navigate("/table");
      }

    return (
        <button
            type="button"
            className="save-home-form-btn"
            onClick={saveForm}
            disabled={notReady}>
            Salvar Dados
        </button>
    )
}