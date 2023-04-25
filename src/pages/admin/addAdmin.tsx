import React, {useState, useEffect, useContext} from 'react';
import {useRouter} from 'next/router';
import ScrollToTop from "react-scroll-to-top";
import "../../styles/form.module.css"
import axios from "axios";
import request from '../../../axiosconfig/axios';
import checkISAdmin from '../../../checkAdminStatus/checkAdmin';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


export default function AddAdmin() {


    const notifyerror = (toastValue : string) => toast.error(toastValue, {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored"
    });
    const notifysuccess = (toastValue : string) => toast.success(toastValue, {
        position: "top-right",
        autoClose: 3500,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored"
    });

    
    useEffect(() => {
        const check = async ()=>{
            let checkdata = await checkISAdmin();
            if (!checkdata || checkdata===false){
                await router.push("/login")
            }
        };
        check();
    }, [])
    
    
    const router = useRouter();



    const [name,
        setName] = useState("");
    const [password,
        setpassword] = useState("");
 
    const handlename = (e : any) => {
        setName(e.target
            ?.value);
    };
    const handlepassword = (e : any) => {
        setpassword(e.target
            ?.value);
    };
    const handleThirdPartyAdd = async(e : any) => {
        e.preventDefault();
        let json = {
            username: name,
            password:password,
            PermissionType:"ADMIN"
           
        };
        request.post("/addAdmin", json)
       .then((e:any)=>{
        
        notifysuccess(e?.data?.success);
        }).catch((e)=>{
            notifyerror(e
                ?.response
                    ?.data
                        ?.error);
        });

    };

    return (
        <div className="container-fluid d-flex justify-content-center align-items-center align-content-center mt-auto">
            <ScrollToTop/>
            <ToastContainer />
            <div className='container-fluid container'>
                <form  >
                <div className="d-flex justify-content-center align-items-center align-content-center mt-auto">
                        <span>Add Admin</span>
                    </div>
                    <div className="form-group">
                        <label htmlFor="exampleInputEmail1">UserName</label>
                        <input
                            type="text"
                            className="form-control "
                            placeholder="Enter UserName"
                            onChange={(e)=>handlename(e)}
                            required/>
                    </div>
                    <div className="form-group ">
                        <label htmlFor="exampleInputPassword1">Password</label>
                        <input
                            type="password"
                            className="form-control "
                            placeholder="password"
                            onChange={(e)=>handlepassword(e)}
                            required/>
                    </div>
                    <div className="form-group ">
                <button onClick={handleThirdPartyAdd} className="loginBtn form-control mt-3">Submit</button>
    </div>
                </form>
            </div>

        </div>

    )
}
