import { useContext, useEffect } from "react";
import { DataContext } from "../contexts/DataContext";
import { UtilityContext } from "../contexts/utilityContext";
import { FaPlus } from "react-icons/fa";

export function Classes (){
    const {classes} = useContext(DataContext);
    const {setAddClassClicked} = useContext(UtilityContext);
    useEffect(() => {
        setAddClassClicked(false);
    }, [])
    return(
        <>
            <div
                className="flex justify-end"
            >
                <button
                    className="bg-secondary text-white flex items-center rounded-lg text-xs sm:text-sm md:text-lg px-[10px] py-[6px]"
                    onClick={() => setAddClassClicked(true)}
                >
                    <FaPlus />
                    Add class
                </button>
            </div>
            
            <div
                className="bg-primary rounded-lg p-[10px] mt-[15px]"
            >
                {
                    classes?.map((cls) => {
                        const {_id, name, trainer, capacity, time, days, session} = cls;
                        let timeOfDay;
                        if(session === "morning"){
                            timeOfDay = "am"
                        }else {
                            timeOfDay = "pm"
                        }
                        return <div
                            key = {_id}
                            className="bg-tableColor rounded lg  text-white p-[10px] w-auto sm:w-[40%]"
                        >
                            <div>
                            <div
                                className="flex justify-between items-center my-[7px]"
                            >
                                <h1
                                    className="text-[24px] md:text-[30px] font-bold uppercase"
                                >
                                    {name}
                                </h1>
                                <p>{time}{timeOfDay}</p>
                            </div>
                            <div
                                className="flex justify-between items-center my-[7px]"
                            >
                                <p
                                    className="font-bold"
                                >
                                    {trainer.username}
                                </p>
                                <p>Capacity: {capacity}</p>
                            </div> 
                            </div>
                            
                            <p
                                className="flex justify-center mx-[3%]"
                            >
                                {
                                    days?.map((d, index) => 
                                        <span
                                            key={index}
                                            className="bg-secondary px-[3%] mx-[2%] sm:px-[1%] text-sm"
                                        >
                                            {d}
                                        </span>
                                    )
                                }

                                </p>
                        </div>
                    }
                        
                    )
                }
                
            </div>
        </>
        
    )
}