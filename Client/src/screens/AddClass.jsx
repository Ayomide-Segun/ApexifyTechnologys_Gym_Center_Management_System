import { useEffect, useState, useContext } from "react"
import { DataContext } from "../contexts/DataContext";


export function AddClass(){
    const {specializations, addClass, classDetails, setClassDetails, trainers} = useContext(DataContext);
    const inputArray = ["name", "trainer", "capacity", "training", "days", "session", "time"]
    
    const sessions = ["", "morning", "evening"];
    const days = ["monday", "tuesday", "wednesday", "thursday", "friday", "saturday", "sunday"];
    const times = classDetails?.session === "morning" ?
        ["", "6:00", "8:00", "10:00"] : 
        classDetails?.session === "evening" ?
        ["", "4:00", "5:00", "6:00", "8:00"] :
        []

    useEffect(() => {
        console.log(classDetails)
    }, [classDetails])

    return(
        <div
            className="text-gray-50 "
        >
            <p
                className="text-gray-500  ml-[10px]"
            >
               &#187; <a href="/classes">Classes</a> / <a href="/classes/add-class">Add class</a>
            </p>
            <form
                className="mx-[15px] md:mx-[100px] my-[15px]"
                onSubmit={(e) => addClass(e, classDetails)}
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
                            (i === "name" || i === "capacity") ?
                            <input
                                type={i === "name" ?
                                    "text" :
                                    "number"
                                }
                                required
                                name={i}
                                id={i}
                                value={classDetails[i]}
                                onChange={(e)=> {
                                    const value = e.target.value
                                    setClassDetails(prev => ({
                                        ...prev,
                                        [i]: value
                                    }));
                                }}
                                className="bg-white  sm:h-[50px] md:h-[55px] border-2 border-solid border-primary p-[5px] rounded-lg w-full"
                            />:
                            (i === "training") ?
                            <div
                                className="w-full flex items-center gap-[20px]"
                            >
                                <select
                                    required
                                    name={i}
                                    id={i}
                                    value={classDetails[i]}
                                    className="bg-white  sm:h-[50px] md:h-[55px] border-2 border-solid border-primary inset-shadow-sm inset-shadow-indigo-500 p-[5px] rounded-lg w-full"
                                    onChange={(e) => {
                                        setClassDetails(
                                            prev => ({
                                                ...prev,
                                                [i]: e.target.value    
                                            })

                                        )
                                    }}
                                >
                                    <option value=""></option>
                                    {
                                        specializations?.map((s, index) => {
                                            if(!s) return null;
                                            return (<option
                                                key={s._id || index} 
                                                value={s._id}
                                            >{s.name}</option>)
                                        })
                                    }
                                </select>
                            </div> :
                            (i === "days")?
                            <div
                                    className="w-[80%] grid grid-cols-3 flex items-center gap-[20px]"
                            >
                                {
                                    days.map((day, index) => (
                                        <label
                                            key={index}
                                        >
                                            <input
                                            required
                                                type="checkbox"
                                                className="mr-[5px]"
                                                name={i}
                                                id={i}
                                                value={day}
                                                checked={classDetails.days.includes(day)}
                                                onChange={(e) => {
                                                    const value = e.target.value;
                                                    setClassDetails(prev => ({
                                                        ...prev,
                                                        days: e.target.checked
                                                        ? [...prev.days, value] // add
                                                        : prev.days.filter(d => d !== value) // remove
                                                    }));
                                                }}
                                            />
                                            {day}
                                        </label>
                                        
                                    ))
                                }
                                
                            </div>:
                            (i === "time") ? 
                            <div
                                className="w-full flex items-center gap-[20px]"
                            >
                                <select
                                    required
                                    name={i}
                                    id={i}
                                    value={classDetails[i]}
                                    className="bg-white  sm:h-[50px] md:h-[55px] border-2 border-solid border-primary inset-shadow-sm inset-shadow-indigo-500 p-[5px] rounded-lg w-full"
                                    onChange={(e) => {
                                        setClassDetails(
                                            prev => ({
                                                ...prev,
                                                [i]: e.target.value    
                                            })

                                        )
                                    }}
                                >
                                    {
                                        (i === "days" ? days : times).map((item, index) => 
                                            <option
                                                key={index}
                                                value={item}
                                            >
                                                {item}
                                            </option>
                                        )
                                    }
                                    
                                </select>
                            </div>:
                            (i === "trainer") ?
                            <div
                                className="w-full flex items-center gap-[20px]"
                            >
                                <select
                                    required
                                    name={i}
                                    id={i}
                                    value={classDetails[i]}
                                    className="bg-white  sm:h-[50px] md:h-[55px] border-2 border-solid border-primary inset-shadow-sm inset-shadow-indigo-500 p-[5px] rounded-lg w-full"
                                    onChange={(e) => {
                                        setClassDetails(
                                            prev => ({
                                                ...prev,
                                                [i]: e.target.value    
                                            })

                                        )
                                    }}
                                >
                                    <option value=""></option>
                                    {
                                        trainers?.map((t) => 
                                            <option
                                                key={t._id} 
                                                value={t._id}
                                            >{t.username}</option>
                                        )
                                    }
                                </select>
                            </div> :
                            <select
                                required
                                name={i}
                                id={i}
                                value={classDetails[i]}
                                className="bg-white  sm:h-[50px] md:h-[55px] border-2 border-solid border-primary inset-shadow-sm inset-shadow-indigo-500 p-[5px] rounded-lg w-full"
                                onChange={(e) => {
                                    setClassDetails(
                                        prev => ({
                                            ...prev,
                                            [i]: e.target.value,
                                            time: ""    
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