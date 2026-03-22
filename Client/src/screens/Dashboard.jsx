import { Sidebar } from "../components/Sidebar";
import { Header } from "../components/Header";
import { useContext } from "react";
import { UtilityContext } from "../contexts/utilityContext";
import { Authenticate } from "../components/Authenticate";

export function Dashboard() {
    const {openAuthenticatePanel} = useContext(UtilityContext);

    return(
        <>
                <div
                    className="flex  gap-[30px]"
                >
                    <div
                        className="bg-primary w-[70%] sm:flex justify-between items-center"
                    >
                        <div
                            className="p-[20px] flex-col "
                        >
                            <p
                                className="text-gray-500 text-sm"
                            >
                                January 11, 2024
                            </p>
                            <p
                                className="sm:text-lg md:text-xl font-bold"
                            >
                                Welcome Back, Emon
                            </p>
                            <h1
                                className=" sm:text-2xl md:text-3xl font-bold"
                            >
                                Ready to set up your club's Loyalty card?
                            </h1>
                            <button
                                className="bg-secondary sm:py-[10px] sm:px-[20px] md:px-[30px] mt-[20px] rounded-lg"
                            >
                                Set Up
                            </button>
                        </div>
                        <img 
                            src="work-out.png" 
                            alt="man working out"
                            className="w-[160px] md:w-[400px]"
                        />
                    </div>
                    <div
                        className="bg-primary w-[30%]"
                    >
                        <p>
                            Member Activity
                        </p>
                    </div>
                </div>
                <div>
                    <div></div>
                    <div></div>
                    <div></div>
                </div>
        </>
        
    )
}