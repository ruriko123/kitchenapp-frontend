import React, {useState, useEffect, useContext} from 'react';
import {useRouter} from 'next/router';
import Link from 'next/link';
import request from '../../axiosconfig/axios';
import {ToastContainer, toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function Home() {

    const notify = (toastValue : string) => toast.error(toastValue, {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored"
    });

    const router = useRouter();
    const [Username,
        setUsername] = useState("");
    const [Password,
        setPassword] = useState("");

    const handleUsername = (e : any) => {
        setUsername(e.target
            ?.value);
    };
    const handlePassword = (e : any) => {
        setPassword(e.target
            ?.value);
    };
    const handleLogin = async(e : any) => {
        e.preventDefault();
        let userdata = {
            username: Username,
            password: Password
        };
        request
            .post("/adminlogin", userdata)
            .then(function (response) {
                router.push("/profile");
            })
            .catch(function (e) {
                notify(e
                    ?.response
                        ?.data
                            ?.error);
            });

    };

    return (
        <div className="app">
            <div className="container">
                <ToastContainer/>
                <p className="heading">Admin Login</p>
                <div className="box">
                    <p>Username</p>
                    <div>
                        <input
                            required
                            onChange={handleUsername}
                            className='form-control'
                            type="text"
                            autoComplete="on"
                            placeholder="Enter your Username"/>
                    </div>
                </div>
                <div className="box">
                    <p>Password</p>
                    <div>
                        <input
                            required
                            onChange={handlePassword}
                            className='form-control'
                            type="text"
                            autoComplete="on"
                            placeholder="Enter your password"/>
                    </div>
                </div>
                <button onClick={handleLogin} className="loginBtn form-control">Login</button>
            </div>

        </div>

    )
}
