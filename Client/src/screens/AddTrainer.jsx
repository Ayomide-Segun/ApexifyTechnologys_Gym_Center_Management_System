import { useEffect, useState, useContext } from "react"
import { DataContext } from "../contexts/DataContext";


export function AddTrainer(){
    const {specializations, handleSubmit, trainerDetails, setTrainerDetails} = useContext(DataContext);
    const inputArray = ["username", "email", "phone", "trainings", "session"]
    
    const sessions = ["", "morning", "evening"];



    useEffect(() => {
        console.log(trainerDetails)
    }, [trainerDetails])

    return(
        <div
            className="text-gray-50 h-screen"
        >
            <p
                className="text-gray-500  ml-[10px]"
            >
               &#187;<a href="/trainers">Trainers</a> / <a href="/trainers/add-trainer">Add trainer</a>
            </p>
            <form
                className="mx-[15px] md:mx-[100px] my-[15px]"
                onSubmit={(e) => handleSubmit(e, trainerDetails)}
            >
                {inputArray.map((i, index) => 
                    <div
                        key={index}
                        className="flex  items-center w-full mb-[25px] md:mb-[30px] text-primary "
                    >
                        <p
                           className="w-[25%] md:w-[10%] text-white" 
                        >
                            {i}
                        </p>
                        {
                            (i === "username" || i === "email" || i === "phone") ?
                            <input
                                type={i === "username" || i === "phone" ?
                                    "text" :
                                    "email"
                                }
                                required
                                name={i}
                                id={i}
                                value={trainerDetails[i]}
                                onChange={(e)=> {
                                    const value = e.target.value
                                    setTrainerDetails(prev => ({
                                        ...prev,
                                        [i]: value
                                    }));
                                }}
                                className="bg-white  sm:h-[50px] md:h-[55px] border-2 border-solid border-primary p-[5px] rounded-lg w-full"
                            />:
                            (i === "trainings") ?
                            <div
                                className="w-full flex items-center gap-[20px]"
                            >
                                {specializations?.map((s) => (
                                    <label
                                        key={s._id}
                                        className="flex justify-center items-center p-[5px] bg-white text-primary h-[50px] md:h-[55px] rounded-lg w-full"
                                    >
                                        <input
                                            required
                                            type="checkbox"
                                            name={i}
                                            id={i}
                                            value={s._id}
                                            className="mr-2 border-2 border-solid border-primary"
                                            checked={trainerDetails.trainings.includes(s._id)}
                                            onChange={(e) => {
                                                const value = e.target.value;
                                                setTrainerDetails(prev => ({
                                                    ...prev,
                                                    trainings: e.target.checked
                                                    ? [...prev.trainings, value] // add
                                                    : prev.trainings.filter(t => t !== value) // remove
                                                }));
                                            }}     
                                        />
                                        {s.name}
                                    </label>
                                    
                                ))}
                            </div>
                             :
                            <select
                                required
                                name={i}
                                id={i}
                                className="bg-white  sm:h-[50px] md:h-[55px] border-2 border-solid border-primary inset-shadow-sm inset-shadow-indigo-500 p-[5px] rounded-lg w-full"
                                onChange={(e) => {
                                    setTrainerDetails(
                                        prev => ({
                                            ...prev,
                                            [i]: e.target.value    
                                        })

                                    )
                                }}
                            >
                                {
                                    sessions?.map((s, index) => 
                                        <option
                                            key={index} 
                                            value={s}
                                        >{s}</option>
                                    )
                                }
                            </select> 
                        }
                    </div>
                )}
                <div
                    className=" ml-[25%] md:ml-[10%] flex justify-center"
                >
                   <input
                        type="submit"
                        value="Submit"
                        className="bg-secondary py-[3%] md:py-[2%] px-[10%] rounded-lg"
                    /> 
                </div>
                  
            </form>
        </div>
    )
}