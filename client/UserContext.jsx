import { createContext, useEffect, useState } from 'react'
import axios from 'axios';

export const UserContext = createContext({});

export function UserContextProvider({ children }) {
    const [user, setUser] = useState(null)
    const [ready, setReady] = useState(false);

    useEffect(() => {
        const fetchData = async () => {
            if (!user) {
                // console.log("hi");
                const {data} = await axios.get('/profile', {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                    },
                })

                setUser(data)
                setReady(true)
            }
        }
        fetchData()
    }, [])

    return (
        <UserContext.Provider value={{ user, setUser, ready}}>
            {children}
        </UserContext.Provider>
    )
}