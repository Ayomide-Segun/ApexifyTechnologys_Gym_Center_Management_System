import { useContext, useEffect, useState } from "react";
import { UtilityContext } from "../contexts/utilityContext";
import { DataContext } from "../contexts/DataContext";
import { FaPlus, FaEye, FaPen, FaEyeSlash } from "react-icons/fa";
import { MdDelete } from "react-icons/md";

export function Billings(){
    const  { openAuthenticatePanel, showRow, setShowRow, setAddTrainerClicked} = useContext(UtilityContext);
    const {trainers,payments} = useContext(DataContext);
    const tableHeader = ["Member", "Plan", "Amount", "Status", "Date"]

    useEffect(() => {
        setAddTrainerClicked(false)
    }, [])
    return(
        <>
            <div
                className="px-[20px] w-full text-white mt-[10px]"
            >
                {
                    openAuthenticatePanel && <Authenticate/>
                }
                <div>
                    <p>
                        Billing List
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
                    </div>
                    
                </div>
                
            </div>
            {payments ?
            <table 
                className="text-white text-[9px] sm:text-[12px] md:text-[20px] bg-primary w-full table-fixed"
            >  
                <thead>
                    <tr>
                        {tableHeader.map((title, index) =>
                        <th
                            key={index}
                            className="px-[5px] md:px-[25px] font-bold bg-tableColor uppercase text-start"
                        >
                            {title}
                        </th>
                        )}
                    </tr>
                </thead>
                <tbody>
                    {payments?.map((payment) => {
                        const {_id, member, subscription, createdAt, status} = payment;
                        const date = new Date(createdAt).toISOString().split('T')[0];
                        return <tr
                            key={_id}
                            className="m-auto even:bg-tableColor"
                        >
                            <td
                                className="px-[5px] md:px-[25px]  py-[5px]"
                            >
                                {member?.gymId}
                            </td>
                            <td
                                className="px-[5px] md:px-[25px]  py-[5px]"
                            >
                                {subscription?.name}
                            </td>
                            <td
                                className="px-[5px] md:px-[25px]  py-[5px]"
                            >
                                ${subscription?.price}
                            </td>
                            <td
                                className="px-[5px] md:px-[25px]  py-[5px]"
                            >
                                {status}
                            </td>
                            <td
                                className="px-[5px] md:px-[25px]  py-[5px]"
                            >
                                {date}
                            </td>                 
                        </tr>
                    })}
                </tbody>
                    
            </table>:
            <p
                    className="text-white ml-[15px]"
            >
                No trainers found ...
            </p>
            }
        </>            
        
    )
}