import React, {useState, useEffect, useContext} from 'react';
import {useRouter} from 'next/router';
import ScrollToTop from "react-scroll-to-top";
import "../../styles/form.module.css"
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

    const router = useRouter();
    const [thirdPartiesData,
        setthirdPartiesData] = useState([]);
    useEffect(() => {
        const check = async ()=>{
            let checkdata = await checkISAdmin();
            if (!checkdata || checkdata===false){
                await router.push("/login")
            }
        };

        check();

        if (thirdPartiesData.length === 0) {
            request
                .get("/getThirdParties")
                .then((e:any) => {
                    setthirdPartiesData(e);
                })
                .catch((e) => {
                    // console.log(e);
                })

        }

    }, [])

    return (
        <div
            className="container-fluid d-flex justify-content-center align-items-center align-content-center mt-auto">
            <ScrollToTop/>
            <ToastContainer />

            <div className='container-fluid container'>
                rwar

            </div>

        </div>

    )
}
