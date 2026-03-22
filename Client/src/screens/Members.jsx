import { Sidebar } from "../components/Sidebar";
import { Header } from "../components/Header";
import { useContext, useEffect, useState } from "react";
import { UtilityContext } from "../contexts/utilityContext";
import { DataContext } from "../contexts/DataContext";
import { FaPlus, FaEye, FaPen, FaEyeSlash } from "react-icons/fa";
import { MdDelete } from "react-icons/md";

export function Members() {
    const  { openAuthenticatePanel, showRow, setShowRow, search } = useContext(UtilityContext);
    const { payments, displayedMembers, handleDelete, handleSearch} = useContext(DataContext);
    const tableHeader = ["Username", "Member ID", "Package", "Join Date", "Expiry Date", "Amount", "Status", "Action"]
    

    return(
        <>
             <div
                    className="px-[20px] w-full text-white mt-[10px] h-screen"
                >
                    {
                        openAuthenticatePanel && <Authenticate/>
                    }
                    <div>
                        <p>
                            Member List
                        </p>
                        <input 
                            type="search" 
                            name="search-bar" 
                            id="search-bar"
                            value = {search}
                            placeholder="Search here ..."
                            className="bg-primary rounded-lg w-[60%] outline-none text-white px-[10px] h-[30px] mb-[15px]"
                            onChange={(e) =>{
                                const value = e.target.value;
                                handleSearch(value)
                            }}
                        />    
                        <div
                            className="bg-primary w-full rounded-lg"
                        >
                            <table>

                            </table>
                        </div>
                    </div>
                    
                </div>
                
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
                        {displayedMembers?.map((member) => {
                            const {_id, username, gymId, subscription} = member;
                            const userPaymentDetails = payments?.find(p => p.member?._id === member._id);
                            const join_date_raw = userPaymentDetails?.createdAt
                            ? new Date(userPaymentDetails.createdAt)
                            : null;

                            let join_date = "-";
                            let expiry_date = "-";

                            if (join_date_raw && !isNaN(join_date_raw)) {
                                join_date = join_date_raw.toISOString().split('T')[0];
                                const tempDate = new Date(join_date_raw); // use the Date object directly
                                tempDate.setMonth(tempDate.getMonth() + (userPaymentDetails?.quantity || 0));
                                expiry_date = tempDate.toISOString().split('T')[0];
                            }
                            const showLogic = showRow.id === member._id && showRow.visibility === false

                            return <tr
                                key={member._id}
                                className="m-auto even:bg-tableColor"
                            >
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
                                    {showLogic ? '' : subscription?.name}
                                </td>
                                <td
                                    className="px-[5px] md:px-[25px]  py-[5px]"
                                >
                                    {showLogic ? '' : join_date}
                                </td>
                                <td
                                    className="px-[5px] md:px-[25px] py-[5px]"
                                >
                                    {showLogic ? '' : expiry_date}
                                </td>
                                <td
                                    className="px-[5px] md:px-[25px]  py-[5px]"
                                >
                                    <span>{showLogic ? '' : '$'}</span>{showLogic ? '' : subscription.price}
                                </td>
                                <td
                                    className="px-[5px] md:px-[25px]  py-[5px]"
                                >
                                    {showLogic ? '' : userPaymentDetails?.status}
                                </td>
                                <td
                                    className="px-[5px] md:px-[25px] h-auto  py-[5px]"
                                >
                                    <div
                                        className="flex gap-[7px] sm:gap-[10px] justify-center items-center text-[12px] sm:text-[15px] md:text-[25px]"
                                    >
                                        
                                        {
                                            showRow.id === member._id && showRow.visibility === false ?
                                            <FaEyeSlash
                                                color="blue"
                                                
                                                onClick={()=> setShowRow({
                                                    id: member._id,
                                                    visibility: true    
                                                })}
                                            /> :
                                            <FaEye
                                                color="blue"
                                                
                                                onClick={()=> setShowRow({
                                                    id: member._id,
                                                    visibility: false
                                                })}
                                            />
                                        }
                                        <MdDelete
                                            color="red"
                                            onClick={(e) => handleDelete(e, _id)}
                                            
                                        />
                                    </div>
                                    
                                </td>
                                                        
                            </tr>
                        })}
                    </tbody>
                        
                </table>
        </>             


            
    )
}
