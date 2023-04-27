import React, {useState, useEffect, useContext} from 'react';
import {useRouter} from 'next/router';
import ScrollToTop from "react-scroll-to-top";
import "../../../styles/form.module.css";
import checkISAdmin from '@checkadmin/checkAdmin';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Nav from '@components/nav';
import request from '../../../../axiosconfig/axios';

export default function addOperatingLocations() {


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


    const handlename = (e : any) => {
        setName(e.target
            ?.value);
    };
   


    const handleImage = async(e : any) => {
        e.preventDefault();
        let formData = new FormData();
        formData.append("file", e?.target?.files[0], e?.target?.files[0]?.name);
        formData.append("locationName",name);

        let headers= { "Content-Type": "multipart/form-data" };
        request.post("/addOperatingLocation",formData, {headers:headers}).then((e)=>{
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
            <Nav/>
            <ToastContainer />
            <div className='container-fluid container'>
                <form>
                <div className="d-flex justify-content-center align-items-center align-content-center mt-auto">
                    </div>
                    <div className="form-group">
                        <label htmlFor="exampleInputEmail1">Location Name</label>
                        <input
                            type="text"
                            className="form-control "
                            placeholder="Enter Location Name"
                            onChange={(e)=>handlename(e)}
                            required/>
                    </div>
                    {!(name==="") && name.length>0 && 
                    
                    <div className="form-group ">
                        <label htmlFor="exampleInputimage1">Upload Image</label>
                        <input
                            type="file"
                            accept="image/*"
                            onChange={(e)=>handleImage(e)}
                            required/>
                    </div>
                    
                    }
                    <div className="form-group ">
    </div>
                </form>
            </div>

        </div>

    )
}
