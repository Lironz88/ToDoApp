import Login from "../../AuthArea/Login/Login";
import { Outlet } from "react-router";
import Routing from "../../routing/routing";
import "./Main.css";

function Main(): JSX.Element {
    return (
        <div className="Main">
          <Routing/>
          <Outlet/>
        </div>
    );
}

export default Main;
