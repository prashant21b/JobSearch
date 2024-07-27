import { createContext, useState, useEffect } from "react";

const UserContext = createContext();

export const UserProvider = ({ children }) => {
    const [state, setState] = useState({
        user: {},
        token: ""
    });

    useEffect(() => {
        const authData = localStorage.getItem("Auth");
        if (authData) {
            setState(JSON.parse(authData));
        }
    }, []);

    return (
        <UserContext.Provider value={[state, setState]}>
            {children}
        </UserContext.Provider>
    );
};

export default UserContext;
