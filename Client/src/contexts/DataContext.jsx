import { createContext, useEffect, useState } from "react";
import api from "../api/axios";
import { UtilityContext } from "./utilityContext";
import { useContext } from "react";

export const DataContext = createContext();
export function DataContextProvider({children}) {

    const {setAddTrainerClicked} = useContext(UtilityContext);
    const [users, setUsers] = useState(null);
    const [payments, setPayments] = useState(null);
    const [displayedMembers, setDisplayedMembers] = useState(() => {
        const saved = localStorage.getItem("displayedMembers");
        return saved ? JSON.parse(saved) : []
    })
    const [classes, setClasses] = useState(null);

    useEffect(() => {
        if(!users || !payments) return;
        const members = users?.filter((user) => 
            payments?.some(
                (payment)=> payment.member._id === user._id && user.role === "member"
            )
            
        )
        setDisplayedMembers(members)
    }, [users, payments])

    
    
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

    const [classDetails, setClassDetails] = useState(() => {
        const saved = localStorage.getItem("classDetails");
        return saved ? JSON.parse(saved) : {
            name: "",
            trainer: "",
            training: "",
            capacity: "",
            training: "",
            session: "",
            time: "",
            days: []
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
 
    async function addUser(e, userDetails){
        e.preventDefault();
        
        try {
            const res = await api.post('/register', userDetails);
            alert('Trainer registered successfully');
            setUsers(prev => [
                ...prev,
                res.data
            ]);
            localStorage.removeItem("trainerDetails")
            setAddTrainerClicked(false);
        } catch (error) {
            console.log(error.response?.data.message || 'something went wrong')
            alert('Failed to add trainer')
        }
    }
    
    async function addClass(e, details){
        e.preventDefault();
        const submitData = {
            ...details,
            capacity: Number(details.capacity)
        };

        try {
            const res = await api.post('/add-class', details);
            alert('Class created successfully');
            setClasses(prev => [
                ...prev,
                res.data
            ]);
            localStorage.removeItem("classDetails")
            setAddClassClicked(false);
        } catch (error) {
            console.log(error.response?.data.message || 'something went wrong')
            alert('Failed to add class')
        }
    }


    async function handleSearch(value){
        const term = value.trim().toLowerCase();

        if(!term){
            setDisplayedMembers(members)
            return;
        }

        const filteredMembers = members
        .filter((m) => {   
            return(
                m.username?.toLowerCase().startsWith(term)||
                m.gymId?.toLowerCase().startsWith(term)
            )
        })
        .sort((a, b) => a.username.localeCompare(b.username))
        setDisplayedMembers(filteredMembers)
    }

    useEffect(() => {
        localStorage.setItem("displayedMembers", JSON.stringify(displayedMembers))
    }, [displayedMembers])

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

    useEffect(() => {
        api.get('all-classes')
        .then((res) => {
            setClasses(res.data);
        })
        .catch(err => console.log(err))
    }, [classes])


    return(
        <DataContext.Provider
            value={{
                users,
                setUsers,
                payments,
                setPayments,
                displayedMembers,
                trainers,
                subscriptions,
                setSubscriptions,
                handleUpdate,
                handleDelete,
                specializations,
                setSpecializations,
                trainerDetails,
                setTrainerDetails,
                addUser,
                handleSearch,
                classes,
                setClasses,
                classDetails,
                setClassDetails,
                addClass
            }}
        >
            {children}
        </DataContext.Provider>
    )
}