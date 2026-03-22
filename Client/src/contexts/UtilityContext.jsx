import { createContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export const UtilityContext = createContext();
export function UtilityContextProvider({children}) {
    const navigate = useNavigate();
    const [openSidebar, setOpenSidebar] = useState(false);
    const [openAuthenticatePanel, setOpenAuthenticatePanel] = useState(false)
    const [clickedSidebarOption, setClickedSidebarOption] = useState(() => {
            const saved = localStorage.getItem('clickedSidebarOption');
            return saved ? JSON.parse(saved) : "Dashboard"
    })
    const [showRow, setShowRow] = useState({
        id: '',
        visibility: true
    });
    const [addTrainerClicked, setAddTrainerClicked] = useState(() => {
        const saved = localStorage.getItem("addTrainerClicked");
        return saved ? JSON.parse(saved) : false
    })
    const [addClassClicked, setAddClassClicked] = useState(() => {
        const saved = localStorage.getItem("addClassClicked");
        return saved ? JSON.parse(saved) : false
    })
    const [search, setSearch] = useState('');
    const role = "admin"

    useEffect(() => {
        localStorage.setItem("addTrainerClicked", JSON.stringify(addTrainerClicked))
    }, [addTrainerClicked])

    useEffect(() => {
        localStorage.setItem("addClassClicked", JSON.stringify(addClassClicked))
    }, [addClassClicked])

    return(
        <UtilityContext.Provider
            value={{
                navigate,
                openSidebar,
                setOpenSidebar,
                openAuthenticatePanel,
                setOpenAuthenticatePanel,
                clickedSidebarOption,
                setClickedSidebarOption,
                showRow,
                setShowRow,
                addTrainerClicked,
                setAddTrainerClicked,
                addClassClicked,
                setAddClassClicked,
                search,
                setSearch,
                role
            }}
        >
            {children}
        </UtilityContext.Provider>
    )
}