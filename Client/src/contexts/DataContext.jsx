import { createContext, useEffect, useState } from "react";
import api from "../api/axios";

export const DataContext = createContext();
export function DataContextProvider({children}) {
    const [users, setUsers] = useState(null);
    const [payments, setPayments] = useState(null);
    const members = users?.filter((user) => {
        return payments?.find((payment)=> payment.member._id === user._id && user.role === "member")
    })
    const [subscriptions, setSubscriptions] = useState(null)
    
    async function handleUpdate(e, id, userDetails) {
        e.preventDefault();
        try {
            const res = api.patch(`/update-user/${id}`, userDetails);
            alert(res.data.message)
            setUsers(prev => 
                prev.map((p) =>
                    p._id === id ?
                    {...p, username: userDetails.username}:
                    p
                )
            )
        } catch (error) {
            console.error(error);
            alert(error.response?.data?.message || "Something went wrong")
        
        }
    }

    async function handleDelete(e, id) {
        e.preventDefault();
        if (!window.confirm("Are you sure you want to delete this user?")) return;
        try{
            const res = await api.delete(`/delete-user/${id}`);
            alert(res.data.message)
            setUsers(prev => 
                prev.filter(p => p._id !== id)
            )
        }catch(error){
             console.error(error);
            alert(error.response?.data?.message || "Something went wrong")
        }
    }

   
    useEffect(()=>{
        api.get('/all-users')
        .then((res) => {
            setUsers(res.data)
        })
        .catch((err) => console.log(err))
    }, []);

    useEffect(()=>{
        api.get('/all-payments')
        .then((res)=> {
            setPayments(res.data)
        })
        .catch(err => console.log(err))
    }, []);
    useEffect(()=>{
        api.get('/all-subscriptions')
        .then((res) => {
            setSubscriptions(res.data);
        })
        .catch(error =>
            console.log(error)
        );
    }, [])
    return(
        <DataContext.Provider
            value={{
                users,
                setUsers,
                payments,
                setPayments,
                members,
                subscriptions,
                setSubscriptions,
                handleUpdate,
                handleDelete
            }}
        >
            {children}
        </DataContext.Provider>
    )
}