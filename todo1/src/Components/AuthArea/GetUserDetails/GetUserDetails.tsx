import jwtAxios from "../../../service/jwtAxios"; // Adjust the import path as necessary
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { UserModel } from "../../../models/UserModel";
import SingleUser from "../SingleUser/SingleUser";
import { Button } from "@mui/material";
import notify from "../../../service/NotificationService";
import { ErrMsg } from "../../../service/NotificationService";
import { store } from "../../../redux/store";
import globals from "../../../service/globals";

function GetUserDetails(): JSX.Element {
    const navigate = useNavigate();
    const [customer, setCustomer] = useState<UserModel | null>(null);

    useEffect(() => {
        const fetchUserDetails = async () => {
            if (store.getState().authState.userType !== "CUSTOMER") {
                notify.error(ErrMsg.NO_LOGIN);
                navigate("/login");
                return;
            }

            try {
                const response = await jwtAxios(globals.urls.getCustomerDetails); 
                setCustomer(response.data);
            } catch (error) {
                notify.error(ErrMsg.FAILED_USER_DETAILS);
            }
        };

        fetchUserDetails();
    }, [navigate]);

    const goHome = () => {
        navigate("/Main");
    };

    return (
        <div className="GetCustomersDetails">
            <h1>My details</h1><hr/>
            {customer ? <SingleUser key={customer.id} user={customer} /> : <p>Loading details...</p>}
            <br/><br/>
            <Button variant="contained" color="error" onClick={goHome}>Back</Button>
        </div>
    );
}

export default GetUserDetails;