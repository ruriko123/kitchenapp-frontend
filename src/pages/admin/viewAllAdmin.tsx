import React, {useState, useEffect, useContext} from 'react';
import {useRouter} from 'next/router';
import ScrollToTop from "react-scroll-to-top";
import "../../styles/form.module.css"
import request from '../../../axiosconfig/axios';
import checkISAdmin from '../../../checkAdminStatus/checkAdmin';
import {ToastContainer, toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Nav from '../../../Components/nav';
import Select from 'react-select';

export default function viewAllAdmin() {

    const customStyles = {
        option: (base : any, {data, isDisabled, isFocused, isSelected} : any) => {
            return {
                ...base,
                backgroundColor: isFocused
                    ? "gray"
                    : "black"
            };
        }
    };

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

    const initialToastError = (toastValue : string) => toast.error(toastValue, {
        position: "top-right",
        autoClose: 1000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: true,
        progress: undefined,
        theme: "colored",
        toastId: "initialtoast-error-id"
    });

    const router = useRouter();
    let [adminData,
        setadminData] = useState([]);

    const [adminNamearray,
        setadminNamearray] = useState([]);

    useEffect(() => {
        const check = async() => {
            let checkdata = await checkISAdmin();
            if (!checkdata || checkdata === false) {
                await router.push("/login")
            }
        };

        check();

        if (adminData.length === 0) {
            request
                .get("/viewAllAdmin")
                .then((e : any) => {
                    console.log(e
                        ?.data)
                    setadminData(e
                        ?.data);
                    let adminData = e
                        ?.data || [];
                    let adminNamearray : any = [];
                    for (let x in adminData) {
                        let restaurantName = adminData[x]
                            ?.userName;
                        let adminObject = {
                            value: restaurantName,
                            label: restaurantName
                        };
                        adminNamearray.push(adminObject);
                    };

                    adminNamearray.unshift({value: "ALL", label: "ALL"});
                    setadminNamearray(adminNamearray);
                })
                .catch((e) => {
                    initialToastError(e
                        ?.response
                            ?.data
                                ?.error);
                })

        }

    }, []);

    const refreshThirdParties = async() => {
        request
            .get("/viewAllAdmin")
            .then((e : any) => {
                console.log(e
                    ?.data)
                setadminData(e
                    ?.data);
                    let adminData = e
                    ?.data || [];
                let adminNamearray : any = [];
                for (let x in adminData) {
                    let restaurantName = adminData[x]
                        ?.userName;
                    let adminObject = {
                        value: restaurantName,
                        label: restaurantName
                    };
                    adminNamearray.push(adminObject);
                };

                adminNamearray.unshift({value: "ALL", label: "ALL"});
                setadminNamearray(adminNamearray);
            })
            .catch((e) => {
                notifyerror(e
                    ?.response
                        ?.data
                            ?.error);
            });
    };

    const MakeActive = async(id : string | number) => {
        request
            .post("/adminActive", {id: id})
            .then((e) => {
                refreshThirdParties();
                notifysuccess(e
                    ?.data
                        ?.success);
            })
            .catch((e) => {
                notifyerror(e
                    ?.response
                        ?.data
                            ?.error);
            })
    };
    const [selectedAdmin,
        setselectedAdmin] = useState("ALL");
    const changeSelectedAdmin = async(e:any)=>{
            setselectedAdmin(e?.value);
        };

    const MakeInActive = async(id : string | number) => {
        request
            .post("/adminInActive", {id: id})
            .then((e) => {
                refreshThirdParties();
                notifysuccess(e
                    ?.data
                        ?.success);
            })
            .catch((e) => {
                notifyerror(e
                    ?.response
                        ?.data
                            ?.error);
            });
    };

    const deleteAdmin = async(id : string | number) => {
        request
            .post("/deleteAdmin", {id: id})
            .then((e) => {
                refreshThirdParties();
                notifysuccess(e
                    ?.data
                        ?.success);
            })
            .catch((e) => {
                notifyerror(e
                    ?.response
                        ?.data
                            ?.error);
            })
    };

    return (
        <div
            className="d-flex justify-content-center align-items-center align-content-center mt-auto">
            <ScrollToTop/>
            <Nav/>
            <ToastContainer/>

            <div
                className='container-fluid container'
                style={{
                width: '100vw'
            }}>
                <h1
                    className="d-flex justify-content-center align-items-center mb-4 text-3xl font-extrabold text-gray-900 dark:text-white md:text-5xl lg:text-6xl">
                    <span
                        className="text-transparent bg-clip-text bg-gradient-to-r to-emerald-600 from-sky-400">Admin Accounts</span>
                </h1>

                <Select
                     className="basic-single"
                     classNamePrefix="select"
                    styles={customStyles}
                    instanceId = "select-box"
                    defaultValue={{
                    value: "ALL",
                    label: "ALL"
                }}
                name="color"
                    options={adminNamearray}
                    onChange={(e:any)=>{changeSelectedAdmin(e)}}
                    />
                <div className='table-responsive text-nowrap'>
                    <table className="table table-striped">
                        <thead className="thead-dark">
                            <tr>
                                <th>S.N</th>
                                <th>UserName</th>
                                <th>isActive</th>
                                <th>Active</th>
                                <th>Inactive</th>
                                <th>Delete</th>

                            </tr>
                        </thead>
                        <tbody>
                            {adminData && adminData.filter((value:any) => {
            if(selectedAdmin==="" || selectedAdmin==="ALL"){
                return value.userName === value.userName;
            } else {

                return value.userName === selectedAdmin;
            }
          }).map((info : any, index) => {
                                return (
                                    <tr key={index} tabIndex={index} className='cilcikable-tr '>
                                        <th className="table-danger" scope="row">{index + 1}</th>
                                        <td className="table-danger">{info
                                                ?.userName || ""}</td>
                                        <td className="table-danger">{info
                                                ?.isActive
                                                    ? "TRUE"
                                                    : "FALSE"}</td>
                                        <td className="bg-success">
                                            <button
                                                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full"
                                                onClick={(e) => MakeActive(info.id)}>
                                                Active
                                            </button>
                                        </td>
                                        <td className="bg-danger">
                                            <button
                                                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full"
                                                onClick={(e) => MakeInActive(info.id)}>
                                                Inactive
                                            </button>
                                        </td>

                                        {!info
                                            ?.isMainAdmin && <td className="bg-warning">
                                                <button
                                                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full"
                                                    onClick={(e) => deleteAdmin(info.id)}>
                                                    Delete
                                                </button>
                                            </td>
}
                                    </tr>
                                )
                            })
}
                        </tbody>
                    </table>
                </div>

            </div>

        </div>

    )
}
