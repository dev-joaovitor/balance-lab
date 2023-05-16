/* eslint-disable react/prop-types */
import { createContext, useState } from "react";

export const HomeContext = createContext({
    notReady: true,
    userId: null,
    batchNo: null,
    density: null,
    packLine: null,
    volume: null,
});

export default function HomeContextProvider({ children }) {
    const [notReady, setNotReady] = useState(true), //send button status
          [userId, setUserId]     = useState(""), //stores userid
          [batchNo, setBatchNo]   = useState(""), //stores batchno
          [density, setDensity]   = useState(""), //stores density
          [packLine, setPackLine] = useState(""), //stores packaging line
          [volume, setVolume]     = useState(""); //stores volum

    const exportData = {
        notReady,
        setNotReady,
        userId,
        setUserId,
        batchNo,
        setBatchNo,
        density,
        setDensity,
        packLine,
        setPackLine,
        volume,
        setVolume,
    };
    
    return (
        <HomeContext.Provider value={exportData}>
            {children}
        </HomeContext.Provider>
    )
}