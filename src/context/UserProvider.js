import React, { useContext } from "react";
import axios from "axios";
import useLocalStorage from "../hooks/useLocalStorage.js";

const UserContext = React.createContext()

export const useUser = () => {
    return useContext(UserContext)
}

export const UserProvider = ({ children }) => {

    const [token, setToken] = useLocalStorage('token')
    const [user, setUser] = useLocalStorage('user', [])
    const [role, setRole] = useLocalStorage('role')

    const saveUser = (role, token) => {
        
        setRole(role)
        setToken(token)
    }

    const deleteSession = () => {

        setToken()
        setUser()
        setRole()
    }

    const isLogin = async () => {
        try {
            let response = await axios.get('http://localhost:2000/me');
            setToken(response.data?.id);
            setUser(response.data)

        } catch (error) {
            console.log('Error fetching user:', error);
        }
    }

    const refetchUser = () => {
        isLogin()
    }

    const value = {
        isLogin,
        refetchUser,
        saveUser,
        deleteSession,
        token: token,
        user: user,
        role: role,
    }

    return (
        <UserContext.Provider value={value}>
            {children}
        </UserContext.Provider>
    );
}