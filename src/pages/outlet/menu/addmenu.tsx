import React, {useState, useEffect, useContext} from 'react';
import {useRouter} from 'next/router';
import ScrollToTop from "react-scroll-to-top";
import "@basecss/form.module.css";
import checkISAdmin from '@checkadmin/checkAdmin';
import {ToastContainer, toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Select from 'react-select';
import * as XLSX from 'xlsx';
import Nav from '@components/nav';
import request from '@axiosrequest/axios';

export default function OutletMenu() {

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
    //getActiveRestaurant  getInactiveRestaurant
    const router = useRouter();
    let [restaurant,
        setrestaurant] = useState([]);

    let [activeInactive,
        setactiveInactive] = useState("getInactiveRestaurant");

    useEffect(() => {
        const check = async() => {
            let checkdata = await checkISAdmin();
            if (!checkdata || checkdata === false) {
                await router.push("/login")
            }
        };

        check();

        if (restaurant.length === 0) {
            request
                .get(`/${activeInactive}`)
                .then((e : any) => {
                    console.log(e
                        ?.data)
                    setrestaurant(e
                        ?.data);
                    let outletdata = e
                        ?.data || [];
                    let restaurantNamearray : any = [];
                    for (let x in outletdata) {
                        let restaurantName = outletdata[x]
                            ?.Name;
                        let restaurantNameobject = {
                            value: restaurantName,
                            label: restaurantName
                        };
                        restaurantNamearray.push(restaurantNameobject);
                    };

                    restaurantNamearray.unshift({value: "ALL", label: "ALL"});
                    setrestaurantNamearray(restaurantNamearray);
                })
                .catch(async(e) => {
                    initialToastError(e
                        ?.response
                            ?.data
                                ?.error);
                    setrestaurant([]);
                })

        }

    }, []);

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

    const [toggleStatus,
        settoggleStatus] = useState("INACTIVE");

    const [restaurantNamearray,
        setrestaurantNamearray] = useState([]);

    const toggleActiveinactive = async(e : any) => {
        let togglestate = e
            ?.target
                ?.checked;
        togglestate
            ? settoggleStatus("INACTIVE")
            : settoggleStatus("ACTIVE");
        let currentStatus;
        togglestate
            ? currentStatus = "getInactiveRestaurant"
            : currentStatus = "getActiveRestaurant";
        setactiveInactive(currentStatus);

        request
            .get(`/${currentStatus}`)
            .then((e : any) => {
                // console.log(e     ?.data)
                let outletdata = e
                    ?.data || [];
                let restaurantNamearray : any = [];
                for (let x in outletdata) {
                    let restaurantName = outletdata[x]
                        ?.Name;
                    let restaurantNameobject = {
                        value: restaurantName,
                        label: restaurantName
                    };
                    restaurantNamearray.push(restaurantNameobject);
                };

                restaurantNamearray.unshift({value: "ALL", label: "ALL"});
                setrestaurantNamearray(restaurantNamearray);
                setrestaurant(e
                    ?.data);
            })
            .catch((e) => {
                notifyerror(e
                    ?.response
                        ?.data
                            ?.error);
                setrestaurant([]);
                setrestaurantNamearray([]);
            });
    };

    const [selectedRestaurant,
        setselectedRestaurant] = useState("ALL")

    const changeSelectedRestaurant = async(e : any) => {
        setselectedRestaurant(e
            ?.value);
    };

    const handleExcelUpload = async(e : any, infoid : any,infoName : any) => {
        let id = infoid;
        let restaurantName = infoName;
        const file = e
            ?.target
                ?.files[0];

        if (!file) {
            return;
        };
        const data = await file.arrayBuffer();
        const workbook = XLSX.read(data);
        const worksheet = workbook.Sheets[workbook.SheetNames[0]];
        const jsonData = XLSX
            .utils
            .sheet_to_json(worksheet, {
                header: 1,
                defval: ""
            });
            console.log(id,restaurantName)
        request
            .post("/uploadMenu", {
            menudata: jsonData,
            restaurantID: id,
            restaurantName: restaurantName
        })
            .then((e) => {
                notifysuccess(e
                    ?.data
                        ?.success);

            })
            .catch((e : any) => {
                notifyerror(e
                    ?.response
                        ?.data
                            ?.error);
            });
            e.target.value = "";
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
                        className="text-transparent bg-clip-text bg-gradient-to-r to-emerald-600 from-sky-400">Restaurant</span>
                </h1>
                <h1 className="flex items-center text-5xl font-extrabold dark:text-white">
                    <span
                        className="bg-blue-100 text-blue-800 text-2xl font-semibold mr-2 px-2.5 py-0.5 rounded dark:bg-blue-200 dark:text-blue-800 ml-2">Click to update</span>
                </h1>
                <div className="d-flex justify-content-end">
                    <input
                        className="mr-2 mt-[0.3rem] h-3.5 w-8 appearance-none rounded-[0.4375rem] bg-neutral-300 before:pointer-events-none before:absolute before:h-3.5 before:w-3.5 before:rounded-full before:bg-transparent before:content-[''] after:absolute after:z-[2] after:-mt-[0.1875rem] after:h-5 after:w-5 after:rounded-full after:border-none after:bg-neutral-100 after:shadow-[0_0px_3px_0_rgb(0_0_0_/_7%),_0_2px_2px_0_rgb(0_0_0_/_4%)] after:transition-[background-color_0.2s,transform_0.2s] after:content-[''] checked:bg-primary checked:after:absolute checked:after:z-[2] checked:after:-mt-[3px] checked:after:ml-[1.0625rem] checked:after:h-5 checked:after:w-5 checked:after:rounded-full checked:after:border-none checked:after:bg-primary checked:after:shadow-[0_3px_1px_-2px_rgba(0,0,0,0.2),_0_2px_2px_0_rgba(0,0,0,0.14),_0_1px_5px_0_rgba(0,0,0,0.12)] checked:after:transition-[background-color_0.2s,transform_0.2s] checked:after:content-[''] hover:cursor-pointer focus:outline-none focus:ring-0 focus:before:scale-100 focus:before:opacity-[0.12] focus:before:shadow-[3px_-1px_0px_13px_rgba(0,0,0,0.6)] focus:before:transition-[box-shadow_0.2s,transform_0.2s] focus:after:absolute focus:after:z-[1] focus:after:block focus:after:h-5 focus:after:w-5 focus:after:rounded-full focus:after:content-[''] checked:focus:border-primary checked:focus:bg-primary checked:focus:before:ml-[1.0625rem] checked:focus:before:scale-100 checked:focus:before:shadow-[3px_-1px_0px_13px_#3b71ca] checked:focus:before:transition-[box-shadow_0.2s,transform_0.2s] dark:bg-neutral-600 dark:after:bg-neutral-400 dark:checked:bg-primary dark:checked:after:bg-primary dark:focus:before:shadow-[3px_-1px_0px_13px_rgba(255,255,255,0.4)] dark:checked:focus:before:shadow-[3px_-1px_0px_13px_#3b71ca]"
                        type="checkbox"
                        role="switch"
                        id="flexSwitchChecked"
                        defaultChecked
                        onClick={toggleActiveinactive}/>
                    <label
                        className="inline-block pl-[0.15rem] hover:cursor-pointer"
                        htmlFor="flexSwitchChecked">{toggleStatus}</label>
                </div>
                <Select
                    className="basic-single"
                    classNamePrefix="select"
                    styles={customStyles}
                    instanceId="select-box"
                    defaultValue={{
                    value: "ALL",
                    label: "ALL"
                }}
                    name="color"
                    options={restaurantNamearray}
                    onChange={(e : any) => {
                    changeSelectedRestaurant(e)
                }}/>
                <div className='table-responsive text-nowrap'>
                    <table className="table table-striped">
                        <thead className="thead-dark">
                            <tr>
                                <th>S.N</th>
                                <th>Name</th>
                                <th>Email</th>
                                <th>Phone</th>
                                <th>Address</th>
                                <th>isActive</th>
                                <th>added Date</th>
                                <th>Upload Menu</th>

                            </tr>
                        </thead>
                        <tbody>
                            {restaurant && restaurant.filter((value : any) => {
                                if (selectedRestaurant === "" || selectedRestaurant === "ALL") {
                                    return value.Name === value.Name;
                                } else {

                                    return value.Name === selectedRestaurant;
                                }
                            }).map((info : any, index) => {
                                return (
                                    <tr key={index} tabIndex={index} className='cilcikable-tr '>
                                        <th className="table-danger" scope="row">{index + 1}</th>
                                        <td className="table-danger">{info.Name}</td>
                                        <td className="table-danger">{info.Email}</td>
                                        <td className="table-danger">{info.Phone}</td>
                                        <td className="table-danger">{info.Address}</td>
                                        <td className="table-danger">{info.isActive
                                                ? "TRUE"
                                                : "FALSE"}</td>
                                        <td className="table-danger">{info.addedDate}</td>

                                        <td className="bg-secondary">
                                            <label htmlFor={`${info?.Name}${info?.id}`} className="btn btn-info">Upload</label>
                                            <input
                                                id={`${info?.Name}${info?.id}`}
                                                style={{
                                                display: "none"
                                            }}
                                                type="file"
                                                accept="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel"
                                                onChange={(e) => handleExcelUpload(e, info?.id,info?.Name)}
                                                required/>
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
