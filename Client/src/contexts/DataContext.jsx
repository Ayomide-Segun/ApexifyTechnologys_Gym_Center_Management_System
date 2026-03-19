import { createContext, useEffect, useState } from "react";
import api from "../api/axios";
import { UtilityContext } from "./utilityContext";
import { useContext } from "react";

export const DataContext = createContext();
export function DataContextProvider({children}) {

    const {setAddTrainerClicked} = useContext(UtilityContext);
    const [users, setUsers] = useState(null);
    const [payments, setPayments] = useState(null);
    const members = users?.filter((user) => {
        return payments?.find((payment)=> payment.member._id === user._id && user.role === "member")
    })
    const trainers = users?.filter((user) => user.role === "trainer")
    const [subscriptions, setSubscriptions] = useState(null);
    const [specializations, setSpecializations] = useState(null);

    const [trainerDetails, setTrainerDetails] = useState(() => {
        const saved = localStorage.getItem("trainerDetails");
        return saved ? JSON.parse(saved) : {
            name: "",
            email: "",
            role: "trainer",
            phone: "",
            trainings: [],
            session: ""
        }
    })
    
    async function handleUpdate(e, id, userDetails) {
        e.preventDefault();
        try {
            const res = api.patch(`/update-user/${id}`, userDetails);
            alert(res.data.message)
            setUsers(prev => 
                prev.map((p) =>
                    p._id === id ?
                    {...p, userDetails}:
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

    async function handleSubmit(e, userDetails){
        e.preventDefault();
        setAddTrainerClicked(false);
        try {
            const res = await api.post('/register', userDetails);
            alert('Trainer registered successfully');
            setUsers(prev => [
                ...prev,
                res.data
            ]);
            localStorage.removeItem("trainerDetails")

        } catch (error) {
            console.log(error.response?.data.message || 'something went wrong')
            alert('Failed to add trainer')
        }
    }

    useEffect(() => {
        localStorage.setItem("trainerDetails", JSON.stringify(trainerDetails))
    }, [trainerDetails])
   
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
    }, []);

    useEffect(()=>{
        api.get('/all-specializations')
        .then((res) => {
            setSpecializations(res.data);
        })
        .catch(error =>
            console.log(error)
        );
    }, []);


    return(
        <DataContext.Provider
            value={{
                users,
                setUsers,
                payments,
                setPayments,
                members,
                trainers,
                subscriptions,
                setSubscriptions,
                handleUpdate,
                handleDelete,
                specializations,
                setSpecializations,
                trainerDetails,
                setTrainerDetails,
                handleSubmit
            }}
        >
            {children}
        </DataContext.Provider>
    )
}