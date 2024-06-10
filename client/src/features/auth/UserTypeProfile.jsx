import {useSelector} from "react-redux";
import {selectCurrentUser} from "./authSlice.js";
import {useEffect, useState} from "react";
import {Profile as EmployeeProfile} from "../../pages/employee/Profile.jsx";
import {Profile as CompanyProfile} from "../../pages/employer/Profile.jsx";

export const UserTypeProfile = () => {
    let user = useSelector(selectCurrentUser);
    const [userType, setUserType] = useState(null);
    useEffect(() => {
        if (user) {
            setUserType(user.role);
        }
    }, [user]);

    if (userType === "company") {
        return <CompanyProfile/>;
    } else {
        return <EmployeeProfile/>;
    }
}