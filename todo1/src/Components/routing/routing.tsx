import { Route, Routes } from "react-router-dom";
import "./routing.css";
import Login from "../AuthArea/Login/Login";
import LandingPage from "../TaskArea/LandingPage/LandingPage";
import AddTask from "../TaskArea/AddTask/AddTask";
import AddUser from "../AuthArea/AddCustomer/AddUser";
import GetUserDetails from "../AuthArea/GetUserDetails/GetUserDetails";
import UpdateUser from "../AuthArea/UpdateUser/UpdateUser";
import EditTask from "../TaskArea/EditTask/EditTask";
import Page404 from "../layout/Page404/Page404";

function Routing(): JSX.Element {
    return (
        <div className="routing">
			<Routes>
            <Route path="/Login" element={<Login/>}/>    
            <Route path="/Main" element={<LandingPage/>}/>   
            <Route path="*" element={<Page404/>}/> 
            <Route path="/" element={<Login/>}/>
            <Route path="/AddTask" element={<AddTask/>}/>
            <Route path="/AddUser" element={<AddUser/>}/> 
            <Route path="/Details" element={<GetUserDetails/>}/> 
            <Route path="/userUpdate" element={<UpdateUser/>}/>   
            <Route path="/taskUpdate" element={<EditTask/>}/>   
            </Routes>
        </div>
    );
}

export default Routing;
