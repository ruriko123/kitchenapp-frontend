import React, {useState, useEffect, useContext} from 'react';
import {useRouter} from 'next/router';
import ScrollToTop from "react-scroll-to-top";
import "@basecss/form.module.css";
import checkISAdmin from '@checkadmin/checkAdmin';
import {ToastContainer, toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Nav from '@components/nav';
import request from '@axiosrequest/axios';
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

    const [selectedOperatingLocation,
        setselectedOperatingLocation] = useState("ALL");
    const changeselectedOperatingLocation = async(e : any) => {
        setselectedOperatingLocation(e
            ?.value);
    };

    const [title,
        settitle] = useState("");
    const [subject,
        setsubject] = useState("");
    const changetitle = async(e : any) => {
        settitle(e?.target
            ?.value);
    };
    const changesubject = async(e : any) => {
        setsubject(e?.target
            ?.value);
    };
    const clearSubject = () => {
        setsubject("");
    };
    const clearTitle = () => {
        settitle("");
    };

    const handlesendButtonClick = async(e : any) => {
        e.preventDefault();
        if (!title) {
            notifyerror("Title is required.");
            return;
        };
        if (!subject) {
            notifyerror("Subject is required.");
            return;
        };
        if (!selectedOperatingLocation) {
            notifyerror("Operating location not selected.");
            return;
        };
        let reqJson = {
            title: title,
            subject: subject,
            preferredlocation: selectedOperatingLocation
        };
        console.log(reqJson)

        request
        .post("/sendMassNotification",reqJson)
        .then((e : any) => {
            notifysuccess(e?.data?.success);
            clearSubject();
            clearTitle();
        })
        .catch((e) => {
            initialToastError(e
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
                        className="text-transparent bg-clip-text bg-gradient-to-r to-emerald-600 from-sky-400">Send mass notifications.</span>
                </h1>

                <label
                    className='font-weight-bold lead m-2 fw-semibold'
                    htmlFor="operatinglocations">Operating location</label>

                <Select
                    className="basic-single"
                    classNamePrefix="select"
                    styles={customStyles}
                    instanceId="select-box"
                    defaultValue={{
                    value: "ALL",
                    label: "ALL"
                }}
                    id="operatinglocations"
                    name="color"
                    options={operatingLocationName}
                    onChange={(e : any) => {
                    changeselectedOperatingLocation(e)
                }}/>

                <form>
                    <div className="form-group ">

                        <label
                            className='font-weight-bold lead m-2 fw-semibold'
                            htmlFor="titleinputfield">Title</label>

                        <div className="input-group mb-3">
                            <input
                                value={title||""}
                                onChange={(e) => {
                                changetitle(e);
                            }}
                                required
                                id="titleinputfield"
                                className="form-control form-control-lg"
                                type="text"
                                placeholder="Enter the title"/>
                            <div className="input-group-prepend">
                                <button
                                    onClick={clearTitle}
                                    className="btn btn-outline-secondary"
                                    type="button">X</button>
                            </div>
                        </div>

                        <label
                            className='font-weight-bold lead m-2 fw-semibold'
                            htmlFor="exampleFormControlTextarea1">Subject</label>

                        <div className="input-group">
                            <textarea
                                className="form-control"
                                id="exampleFormControlTextarea1"
                                rows={3}
                                onChange={(e) => {
                                changesubject(e)
                            }}
                                value={subject||""}
                                required
                                />
                                <div className="input-group-append">
                                <span className="input-group-text"><button
                                    onClick={clearSubject}
                                    className="btn btn-outline-secondary"
                                    type="button">X</button></span>
                            </div>
                        </div>

                        <div className="m-3 d-flex justify-center col-auto my-1">
                            <button
                                onClick={handlesendButtonClick}
                                type="button"
                                className=" text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-full text-sm p-2.5 text-center inline-flex items-center mr-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 ">
                                <svg
                                    aria-hidden="true"
                                    className="w-4 h-4"
                                    fill="currentColor"
                                    viewBox="0 0 20 20"
                                    xmlns="http://www.w3.org/2000/svg"><path
                                    fillRule="evenodd"
                                    d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
                                    clipRule="evenodd"/></svg>
                                <span className="sr-only">Send</span>
                            </button>
                        </div>

                    </div>
                </form>
            </div>
        </div>
    )
}
