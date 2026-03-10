import { MdOutlineDashboard } from "react-icons/md";
import {IoIosPeople, IoMdPerson, IoMdSettings} from 'react-icons/io';
import { GrPlan } from "react-icons/gr";
import { AiOutlineSchedule } from "react-icons/ai";
import { FaClipboardList } from "react-icons/fa";
import { BiSolidReport } from "react-icons/bi";
import {clsx} from 'clsx'
import { useEffect, useState } from "react";

export function Sidebar(props) {
    const {navigate, openSidebar} = props;
    const sidebarOptions = ["Dashboard", "Members", "Diet plans", "Class schedules", "Trainers", "Billing list", "Report", "Logout", "Settings"];
    const [clickedSidebarOption, setClickedSidebarOption] = useState(() => {
        const saved = localStorage.getItem('clickedSidebarOption');
        return saved ? JSON.parse(saved) : null
    })

    useEffect(() => {
        localStorage.setItem('clickedSidebarOption', JSON.stringify(clickedSidebarOption))
    }, [clickedSidebarOption])
    useEffect(()=>{
        if(clickedSidebarOption === "Dashboard"){
            navigate('/')
        } else if(clickedSidebarOption === "Members"){
            navigate('/members')
        }
    }, [clickedSidebarOption])

    return(
        <div
            className={clsx(
                openSidebar ? "block absolute sm:static mt-[80px] sm:mt-[0] " : "hidden sm:block",
                "bg-primary w-[35%] sm:w-[22%] md:w-[12%] px-[15px] text-sm sm:text-[15px] md:text-[17px] text-gray-100"
            )}
        >
            <img 
                src="logo.png"
                alt="Logo"
                className="w-[200px] hidden sm:block"
            />
            {
                sidebarOptions.map((option, index) =>
                <div
                    className={clsx(
                        option === "Logout" && "block sm:hidden",
                        "w-full h-[10px] sm:h-[30px] flex items-center py-[25px] pl-[10px]",
                        clickedSidebarOption === option && "bg-secondary text-white"
                    )}
                    key={index}
                    onClick={() => setClickedSidebarOption(option)}
                >
                    {
                        option === "Dashboard" ?
                        <MdOutlineDashboard/> :
                        option === "Members" ?
                        <IoIosPeople/> :
                        option === "Diet plans" ?
                        <GrPlan/> :
                        option === "Class schedules" ?
                        <AiOutlineSchedule /> :
                        option === "Trainers" ?
                        <IoMdPerson /> :
                        option === "Billing list" ?
                        <FaClipboardList /> :
                        option === "Report" ?
                        <BiSolidReport /> :
                        <IoMdSettings /> 
                    }
                    <p
                        className="ml-[5px]"
                    >
                        {option}
                    </p>
                    
                </div>
                )
            }
        </div>
    )
}