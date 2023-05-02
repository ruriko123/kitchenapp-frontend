import React, {useState, useEffect, useContext} from 'react';
import {useRouter} from 'next/router';
import ScrollToTop from "react-scroll-to-top";
import "../../../styles/form.module.css";
import checkISAdmin from '@checkadmin/checkAdmin';
import {ToastContainer, toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Nav from '@components/nav';
import request from '../../../../axiosconfig/axios';
import Select from 'react-select';

export default function viewAllOperatingLocations() {

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
    let [operatingLocationData,
        setoperatingLocationData] = useState([]);

    const [operatingLocationName,
        setoperatingLocationName] = useState([]);

    useEffect(() => {
        const check = async() => {
            let checkdata = await checkISAdmin();
            if (!checkdata || checkdata === false) {
                await router.push("/login")
            }
        };

        check();

        if (operatingLocationData.length === 0) {
            request
                .get("/getOperatingLocations")
                .then((e : any) => {
                    console.log(e
                        ?.data)
                    setoperatingLocationData(e
                        ?.data);
                    let operatingLocationData = e
                        ?.data || [];
                    let operatingLocationNameArray : any = [];
                    for (let x in operatingLocationData) {
                        let restaurantName = operatingLocationData[x]
                            ?.LocationName;
                        let adminObject = {
                            value: restaurantName,
                            label: restaurantName
                        };
                        operatingLocationNameArray.push(adminObject);
                    };

                    operatingLocationNameArray.unshift({value: "ALL", label: "ALL"});
                    setoperatingLocationName(operatingLocationNameArray);

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
            .get("/getOperatingLocations")
            .then((e : any) => {
                console.log(e
                    ?.data)
                setoperatingLocationData(e
                    ?.data);
                let operatingLocationData = e
                    ?.data || [];
                let operatingLocationNameArray : any = [];
                for (let x in operatingLocationData) {
                    let restaurantName = operatingLocationData[x]
                        ?.LocationName;
                    let adminObject = {
                        value: restaurantName,
                        label: restaurantName
                    };
                    operatingLocationNameArray.push(adminObject);
                };

                operatingLocationNameArray.unshift({value: "ALL", label: "ALL"});
                setoperatingLocationName(operatingLocationNameArray);
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
            .post("/activeOperatingLocation", {id: id})
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

    const MakeInActive = async(id : string | number) => {
        request
            .post("/InactiveOperatingLocation", {id: id})
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

    const deleteoperatingLocation = async(id : string | number) => {
        request
            .post("/deleteOperatingLocation", {id: id})
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



    const [selectedOperatingLocation,
        setselectedOperatingLocation] = useState("ALL");
    const changeselectedOperatingLocation = async(e:any)=>{
            setselectedOperatingLocation(e?.value);
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
                        className="text-transparent bg-clip-text bg-gradient-to-r to-emerald-600 from-sky-400">Operating Locations</span>
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
                    options={operatingLocationName}
                    onChange={(e:any)=>{changeselectedOperatingLocation(e)}}
                    />
                <div className='table-responsive text-nowrap'>
                    <table className="table table-striped">
                        <thead className="thead-dark">
                            <tr>
                                <th>S.N</th>
                                <th>Location</th>
                                <th>URL</th>
                                <th>isActive</th>
                                <th>Active</th>
                                <th>Inactive</th>
                                <th>Delete</th>

                            </tr>
                        </thead>
                        <tbody>
                            {operatingLocationData && operatingLocationData.filter((value:any) => {
            if(selectedOperatingLocation==="" || selectedOperatingLocation==="ALL"){
                return value.LocationName === value.LocationName;
            } else {

                return value.LocationName === selectedOperatingLocation;
            }
          }).map((info : any, index) => {
                                return (
                                    <tr key={index} tabIndex={index} className='cilcikable-tr '>
                                        <th className="table-danger" scope="row">{index + 1}</th>
                                        <td className="table-danger">{info
                                                ?.LocationName || ""}</td>
                                        <td className="table-danger">
                                            <a
                                                target="_blank"
                                                href={info
                                                ?.IMAGEURL || "#"}>Link</a>
                                        </td>
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

                                        <td className="bg-warning">
                                            <button
                                                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full"
                                                onClick={(e) => deleteoperatingLocation(info.id)}>
                                                Delete
                                            </button>
                                        </td>

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
