import {useSelector} from "react-redux";
import {selectCurrentUser} from "./authSlice.js";
import {Navigate} from "react-router-dom";

export const RequireAuth = ({children}) => {
    let user = useSelector(selectCurrentUser);

    if (!user) {
        return <Navigate to="/login" replace />;
    }

    return children;
}