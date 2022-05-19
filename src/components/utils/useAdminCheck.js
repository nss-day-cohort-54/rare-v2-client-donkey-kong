import React, {useEffect, useState} from "react";
import { getSingleUser } from "../users/UserManager";

const useAdminCheck = () => {
    const currentUser = parseInt(localStorage.getItem('userId'))
    const [adminCheck2, setAdminCheck] = useState([])
    useEffect(
        () => {
            getSingleUser(currentUser)
                .then(r => setAdminCheck(r.user.isStaff))
        },
        []
    )
    return { adminCheck2 } 
    
}

export default useAdminCheck