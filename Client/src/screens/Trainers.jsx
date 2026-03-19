import { Sidebar } from "../components/Sidebar";
import { Header } from "../components/Header";
import { useContext, useEffect, useState } from "react";
import { UtilityContext } from "../contexts/utilityContext";
import { DataContext } from "../contexts/DataContext";
import { FaPlus, FaEye, FaPen, FaEyeSlash } from "react-icons/fa";
import { MdDelete } from "react-icons/md";

export function Trainers(){
    const  { navigate, openAuthenticatePanel, showRow, setShowRow, setClickedSidebarOption, setAddTrainerClicked} = useContext(UtilityContext);
        const {trainers, handleDelete, handleUpdate} = useContext(DataContext);
        const tableHeader = ["","Username", "Member ID", "Join Date", "Class", "Action"]
        console.log(trainers);
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
                            className="bg-secondary flex items-center rounded-lg text-xs sm:text-sm md:text-lg px-[10px] py-[6px]"
                            onClick={() => {
                                setAddTrainerClicked(true)
                                navigate('/trainers/add-trainer')
                            }}
                        >
                            <FaPlus />
                            Add Trainer
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
            {trainers ?
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
                    {trainers?.map((trainer) => {
                        const {_id, username, gymId, createdAt, classroom} = trainer;
                        const join_date = new Date(createdAt).toISOString().split('T')[0];
                        const showLogic = showRow.id === trainer._id && showRow.visibility === false;

                        return <tr
                            key={trainer._id}
                            className="m-auto even:bg-tableColor"
                        >
                            <td>
                                {showLogic ? '' : <img 
                                    src="profile.webp"
                                    alt="Profile picture"
                                    className="w-[60px]"
                                />}
                            </td>
                            <td
                                className="px-[5px] md:px-[25px]  py-[5px]"
                            >
                                {showLogic ? '' : username}
                            </td>
                            <td
                                className="px-[5px] md:px-[25px]  py-[5px]"
                            >
                                {showLogic ? '' : gymId}
                            </td>
                            <td
                                className="px-[5px] md:px-[25px]  py-[5px]"
                            >
                                {showLogic ? '' : join_date}
                            </td>
                            <td
                                className="px-[5px] md:px-[25px]  py-[5px]"
                            >
                                {showLogic ? '' : classroom?.name}
                            </td>
                            <td
                                className="px-[5px] md:px-[25px] h-auto  py-[5px]"
                            >
                                <div
                                    className="flex gap-[7px] sm:gap-[10px] justify-center items-center text-[12px] sm:text-[15px] md:text-[25px]"
                                >
                                    
                                    {
                                        showLogic ?
                                        <FaEyeSlash
                                            color="blue"
                                            
                                            onClick={()=> setShowRow({
                                                id: trainer._id,
                                                visibility: true    
                                            })}
                                        /> :
                                        <FaEye
                                            color="blue"
                                            
                                            onClick={()=> setShowRow({
                                                id: trainer._id,
                                                visibility: false
                                            })}
                                        />
                                    }
                                    
                                    <FaPen
                                        color="yellow"
                                        onClick={() => navigate('/trainers/add-trainer')}
                                    />
                                    <MdDelete
                                        color="red"
                                        onClick={(e) => handleDelete(e, _id)}
                                        
                                    />
                                </div>
                                
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