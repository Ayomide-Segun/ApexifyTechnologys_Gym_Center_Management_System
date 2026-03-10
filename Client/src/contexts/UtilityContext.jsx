import { createContext, useState } from "react";
import { useNavigate } from "react-router-dom";

export const UtilityContext = createContext();
export function UtilityContextProvider({children}) {
    const navigate = useNavigate();
    const [openSidebar, setOpenSidebar] = useState(false);
    const [openAuthenticatePanel, setOpenAuthenticatePanel] = useState(false)

    return(
        <UtilityContext.Provider
            value={{
                navigate,
                openSidebar,
                setOpenSidebar,
                openAuthenticatePanel,
                setOpenAuthenticatePanel
            }}
        >
            {children}
        </UtilityContext.Provider>
    )
}