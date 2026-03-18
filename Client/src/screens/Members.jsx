import { Sidebar } from "../components/Sidebar";
import { Header } from "../components/Header";
import { useContext, useEffect, useState } from "react";
import { UtilityContext } from "../contexts/utilityContext";
import { DataContext } from "../contexts/DataContext";
import { FaPlus, FaEye, FaPen, FaEyeSlash } from "react-icons/fa";
import { MdDelete } from "react-icons/md";

export function Members() {
    const  { navigate, openAuthenticatePanel, setOpenAuthenticatePanel, openSidebar, setOpenSidebar } = useContext(UtilityContext);
    const {users, setUsers, payments, setPayments, members, subscriptions, handleDelete} = useContext(DataContext);
    const tableHeader = ["Username", "Member ID", "Package", "Joining Date", "Expiry Date", "Amount", "Status", "Action"]
    const [showRow, setShowRow] = useState({
        id: '',
        visibility: true
    });

    

    useEffect(()=>{
        console.log(showRow)
    }, [showRow])

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
                                onClick={() => navigate('/members/add-member')}
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
                        {members?.map((member) => {
                            const {_id, username, gymId, subscription} = member;
                            const userPaymentDetails = payments.find(p => p.member?._id === member._id);
                            const join_date = userPaymentDetails?.createdAt ? new Date(userPaymentDetails.createdAt).toISOString().split('T')[0] : "-";
                            let expiry_date = "-";
                            if (join_date) {
                                const tempDate = new Date(join_date);
                                tempDate.setMonth(tempDate.getMonth() + userPaymentDetails.quantity); // add 1 month
                                expiry_date = tempDate.toISOString().split('T')[0]; // format YYYY-MM-DDeatedAt ? new Date(userPaymentDetails.createdAt).toISOString().split('T')[0] : "-";
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
                                    {showLogic ? '' : userPaymentDetails.status}
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
                                        
                                        <FaPen
                                            color="yellow"
                                            onClick={() => navigate()}
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
                        
                </table>
        </>             


            
    )
}
