import { Sidebar } from "../components/SideBar";
import { Header } from "../components/Header";
import { useContext, useEffect, useState } from "react";
import { UtilityContext } from "../contexts/utilityContext";
import { FaPlus } from "react-icons/fa";
import axios from 'axios'

export function Members() {
    const  { navigate, openAuthenticatePanel, setOpenAuthenticatePanel, openSidebar, setOpenSidebar } = useContext(UtilityContext);
    const [members, setMembers] = useState(null);

    

    return(
        <div
            className="sm:flex w-[100%] bg-background h-full"
        >
            <Sidebar
                navigate={navigate}
                openSidebar={openSidebar}
            />
            <div
                className="w-[100%] sm:w-[78%] md:w-[85%] sm:mt-[15px] sm:mx-[8px] md:mx-[15px]"
            >
                <Header
                    openSidebar={openSidebar}
                    setOpenSidebar={setOpenSidebar}
                    setOpenAuthenticatePanel={setOpenAuthenticatePanel}
                    openAuthenticatePanel={openAuthenticatePanel}
                />
                <div
                    className="px-[20px] w-full text-white mt-[10px]"
                >
                    {
                        openAuthenticatePanel && <Authenticate/>
                    }
                    <div>
                        <p>
                            Member List
                        </p>
                        <div
                            className="flex justify-between my-[15px] items-center"
                        >
                            <input 
                                type="search" 
                                name="search-bar" 
                                id="search-bar"
                                placeholder="Search here ..."
                                className="bg-primary rounded-lg w-[60%] outline-none text-white px-[10px] h-[30px]"
                            />
                            <button
                                className="bg-secondary flex items-center rounded-lg px-[10px] py-[6px]"
                            >
                                <FaPlus />
                                Add Member
                            </button>
                        </div>
                        <div
                            className="bg-primary w-full rounded-lg"
                        >
                            <table>

                            </table>
                        </div>
                    </div>
                    
                </div>
            </div>

        </div>
    )
}