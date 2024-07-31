import { useEffect } from "react";
import {useNavigate, useLocation } from "react-router-dom";
import { Link } from "react-router-dom";

export default function ErrorPage() {
    const navigate = useNavigate();
    const location = useLocation();


  

    return (
        <>
           
            <div
                className="bg-white d-flex flex-column justify-content-center align-items-center"
                style={{ width: "100%", height: "100vh" }}
            >
                <div className="container text-center">
                   
                    <div>
                        <h1>404</h1>
                        <p>Ooooooops!</p>
                        <p>
                            <b className="text-nowrap">Page Not Found</b>
                        </p>
                        <p className="gray-text">
                            This page does not exist or was removed. We suggest you go back
                            to the Home.
                        </p>
                        <Link
                            to="/home"
                            className="btn bg-user text-purple rounded-pill mx-auto error_container__btn"
                        >
                            <b>Return to Dashboard</b>
                        </Link>
                    </div>
                </div>
            </div>
        </>
    );
}
