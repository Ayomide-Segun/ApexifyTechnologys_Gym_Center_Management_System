import { useSearchParams } from "react-router-dom";
import { useState, useEffect, useContext } from "react";
import api from "../api/axios";
import { VscCopilotSuccess } from "react-icons/vsc";
import { UtilityContext } from "../contexts/utilityContext";
import { DataContext } from "../contexts/DataContext";
import {clsx} from 'clsx';

export function Success() {
    const [params] = useSearchParams();
    const [session, setSession] = useState(null);
    const {navigate, setClickedSidebarOption} = useContext(UtilityContext);
    const {users, payments} = useContext(DataContext);


    useEffect(()=>{
        const sessionId = params.get('session_id'); // grab session_id from query
        const details = payments.find((payment) => payment.transactionId === sessionId) 
        api.patch(`update-payment/${details._id}`, {status: "successful"})
        .then(res => console.log(res.message))
        .catch(err  => console.log(console.error))
        
        if(sessionId){
            api.get(`checkout-session/${sessionId}`)
            .then((res) => {
                setSession(res.data)
                console.log(res.data)
            })
            .catch((error) => console.log(error))
        }
    }, [params])


    return(
        <div
            className="flex flex-col h-screen  justify-center items-center"
        >
            <VscCopilotSuccess
                color="#0D8421"
                size={150}
            />
            <h1
                className={clsx(
                    "text-[40px] font-bold",
                    !session && "mb-[25px]"
                )}
            >
                Congratulations
            </h1>
            {
                session &&
                <p className="mb-[25px] text-[18px]">
                    You paid ${session?.amount / 100} for {session?.product_name}
                </p> 
            }
            <button
                className="bg-[#0D8421] text-white py-[10px] px-[40px]"
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