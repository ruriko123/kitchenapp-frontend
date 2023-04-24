import React, {useState, useEffect, useContext} from 'react';
import {useRouter} from 'next/router';
import ScrollToTop from "react-scroll-to-top";
import "../../styles/form.module.css"
import axios from "axios";
import request from '../../../axiosconfig/axios';
import checkISAdmin from '../../../checkAdminStatus/checkAdmin';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


export default function AddThirdParty() {


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



    const [baseURL,
        setbaseURL] = useState("");
    const [email,
        setEmail] = useState("");
    const [altPhone,
        setAltPhone] = useState("");
    const [pan,
        setPan] = useState("");
    const [address,
        setAddress] = useState("");
    const [name,
        setName] = useState("");
    const [phone,
        setPhone] = useState("");
    const handlebaseURL = (e : any) => {
        setbaseURL(e.target
            ?.value);
    };
    const handleemail = (e : any) => {
        setEmail(e.target
            ?.value);
    };
    const handlealtPhone = (e : any) => {
        setAltPhone(e.target
            ?.value);
    };
    const handlepan = (e : any) => {
        setPan(e.target
            ?.value);
    };
    const handleaddress = (e : any) => {
        setAddress(e.target
            ?.value);
    };
    const handlename = (e : any) => {
        setName(e.target
            ?.value);
    };
    const handlephone = (e : any) => {
        setPhone(e.target
            ?.value);
    };
    const handleThirdPartyAdd = async(e : any) => {
        e.preventDefault();
        let json = {
            Name: name,
            Address: address,
            Phone: phone,
            Pan: pan,
            AltPhone: altPhone,
            Email: email,
            baseURL: baseURL
        };
        request.post("/addThirdparty", json)
       .then((e:any)=>{
        console.log(e?.data?.success)
        notifysuccess(e?.data?.success);
        }).catch((e)=>{
            notifyerror(e
                ?.response
                    ?.data
                        ?.error);
        });


        // const res = await fetch(url, {
        //     method: 'POST',
        //     body: JSON.stringify(json),
        //     credentials: 'include',
        //     headers: {
        //         "Content-Type": "application/json"
        //     }
        // })
        // console.log(res);
    };

    return (
        <div className="container-fluid d-flex justify-content-center align-items-center align-content-center mt-auto">
            <ScrollToTop/>
            <ToastContainer />
            <div className='container-fluid container'>
                <form  >
                <div className="d-flex justify-content-center align-items-center align-content-center mt-auto">
                        <span>Register Third party</span>

                    </div>
                    <div className="form-group">
                        <label htmlFor="exampleInputEmail1">Name</label>
                        <input
                            type="text"
                            className="form-control "
                            placeholder="Enter Name"
                            onChange={(e)=>handlename(e)}
                            required/>
                    </div>
                    <div className="form-group ">
                        <label htmlFor="exampleInputPassword1">Address</label>
                        <input
                            type="text"
                            className="form-control "
                            placeholder="Address"
                            onChange={(e)=>handleaddress(e)}
                            required/>
                    </div>
                    <div className="form-group ">
                        <label htmlFor="exampleInputPassword1">Phone</label>
                        <input
                            type="Phone"
                            className="form-control"
                            placeholder="Phone"
                            onChange={(e)=>handlephone(e)}
                            required/>
                    </div>
                    <div className="form-group">
                        <label htmlFor="exampleInputPassword1">Alternate Phone</label>
                        <input
                            type="Phone"
                            className="form-control"
                            placeholder="Phone"
                            onChange={(e)=>handlealtPhone(e)}
                            />
                    </div>
                    <div className="form-group">
                        <label htmlFor="exampleInputPassword1">Tax number</label>
                        <input
                            type="text"
                            className="form-control"
                            placeholder="Tax number"
                            onChange={(e)=>handlepan(e)}
                            />
                    </div>
                    <div className="form-group">
                        <label htmlFor="exampleInputPassword1">Email</label>
                        <input
                            type="email"
                            className="form-control"
                            placeholder="email"
                            onChange={(e)=>handleemail(e)}
                            required/>
                    </div>
                    <div className="form-group ">
                        <label htmlFor="exampleInputPassword1">BaseURL</label>
                        <input
                            type="url"
                            className="form-control "
                            placeholder="BaseURL"
                            onChange={(e)=>handlebaseURL(e)}
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
