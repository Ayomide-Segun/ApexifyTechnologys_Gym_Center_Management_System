import {Routes, Route} from 'react-router-dom';
import { Dashboard } from "./screens/Dashboard";
import { useEffect, useState } from 'react';
import { Members } from './screens/Members';
import axios from 'axios';

function App() { 
    const [users, setUsers] = useState(() => {
        const saved = localStorage.getItem('users');
        return saved ? JSON.parse(saved) : null;
    });

    useEffect(()=> {
            axios.get('http://127.0.0.1:5000/api/all-users')
            .then(res =>setUsers(res.data) )
            .catch((error) => console.log(error))
    }, [])

    useEffect(() => {
        console.log(users)
    }, [users])
    useEffect(() => {
        localStorage.setItem('users', JSON.stringify(users))
    }, [users])
    return(
        <>
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
            </Routes>
        </>
    )
}

export default App;