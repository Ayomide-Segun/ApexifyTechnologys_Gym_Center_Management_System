import {MdSmsFailed } from "react-icons/md";
import { UtilityContext } from "../contexts/utilityContext";
import { useContext } from "react";

export function Cancel(){
    const {navigate, setClickedSidebarOption} = useContext(UtilityContext);
        
    return(
    <div
        className="flex flex-col h-screen  justify-center items-center"
        >
            <MdSmsFailed
                color="#CE0F0F"
                size={150}
            />
            <h1
                className="text-[40px] font-bold"
            >
                Payment canceled
            </h1>
            <p
                className="text-[16px] mb-[25px]"
            >
                This payment was cancelled and did not go through. 
            </p>
            
            <button
                className="bg-[#CE0F0F] text-white py-[10px] px-[40px]"
                onClick={() => {
                    navigate('/')
                    setClickedSidebarOption('Dashboard')
                }}
            >
                Close
            </button>

        </div>
    )
}