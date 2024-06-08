import {selectCurrentUser} from "./authSlice.js";
import {useSelector} from "react-redux";
import {useEffect, useState} from "react";
import NoMatch from "../../components/NoMatch.jsx";

export const RequireCompany = ({children}) => {
    let user = useSelector(selectCurrentUser);
    const [userType, setUserType] = useState(null);
    useEffect(() => {
        if (user) {
            setUserType(user.role);
        }
    }, [user]);

    if (userType === "company") {
        return children;
    }

    return <NoMatch />;
}