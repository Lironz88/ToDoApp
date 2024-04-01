import React from "react";
import { useNavigate } from 'react-router-dom';
import "./Page404.css";
import image404 from "../../assets/404.webp";

function Page404(): JSX.Element {
    const navigate = useNavigate();

    const goToMainPage = () => {
        navigate('/'); 
    }

    return (
        <div className="Page404">
            <img src={image404} alt="Page Not Found" style={{ maxWidth: '50vw', height: 'auto' }} onClick={goToMainPage} />
        </div>
    );
}

export default Page404;
