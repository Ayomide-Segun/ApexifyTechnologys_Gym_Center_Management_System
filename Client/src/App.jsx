import {Routes, Route} from 'react-router-dom';
import { Dashboard } from "./screens/Dashboard";
import { useEffect, useState, useContext } from 'react';
import { Members } from './screens/Members';
import { Success } from './screens/Success';
import api from './api/axios';
import { Cancel } from './screens/Cancel';
import { Sidebar } from './components/Sidebar';
import { Header } from './components/Header';
import { UtilityContext } from "./contexts/utilityContext";
import { AddMember } from "./screens/AddMember"
import { Trainers } from './screens/Trainers';

function App() { 
        const  { navigate, openAuthenticatePanel, setOpenAuthenticatePanel, openSidebar, setOpenSidebar } = useContext(UtilityContext);
    
    return(
        <>
         <div
                    className="sm:flex w-[100%] bg-background h-screen"
                >
                    <Sidebar
                        navigate={navigate}
                        openSidebar={openSidebar}
                    />
                    <div
                        className="w-[100%] sm:w-[78%] md:w-[85%] sm:mt-[15px] sm:mx-[8px] md:mx-[15px]"
                    >
                        <Header
                            openSidebar={openSidebar}
                            setOpenSidebar={setOpenSidebar}
                            setOpenAuthenticatePanel={setOpenAuthenticatePanel}
                            openAuthenticatePanel={openAuthenticatePanel}
                        />
                        <Routes>
                            <Route
                                path='/'
                                element={
                                    <Dashboard/>
                                }
                            />
                            <Route
                                path='/members'
                                element={
                                    <Members/>
                                }
                            />
                            <Route
                                path='/success'
                                element={
                                    <Success/>
                                }
                            />
                            <Route
                                path='/cancel'
                                element={
                                    <Cancel/>
                                }
                            />
                            <Route
                                path='/trainers'
                                element={
                                    <Trainers/>
                                }
                            />
                            <Route
                                path='/members/add-member'
                                element={
                                    <AddMember/>
                                }
                            />
                        </Routes>
                        
                    </div>
                </div>
            
        </>
    )
}

export default App;