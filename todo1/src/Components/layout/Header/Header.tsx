import LogoutButton from "../../AuthArea/LogoutButton/LogoutButton";
import "./Header.css";
import imageTodo from "../../assets/to-do-list.png";

function Header(): JSX.Element {
    return (
        <div className="Header">
            <img src={imageTodo} alt="todo" style={{ maxWidth: '5vw', height: 'auto' }} />
             Do your tasks!
            <LogoutButton/>
        </div>
    );
}

export default Header;
