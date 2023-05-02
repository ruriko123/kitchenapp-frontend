import React, {useState, useEffect, useContext} from 'react';
import {useRouter} from 'next/router';
import ScrollToTop from "react-scroll-to-top";
import "../../styles/form.module.css"
import request from '../../../axiosconfig/axios';
import checkISAdmin from '../../../checkAdminStatus/checkAdmin';
import {ToastContainer, toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ThirdpartyUpdateModal from '../../../Components/ThirdpartyUpdateModal';
import Nav from '../../../Components/nav';
import Select from 'react-select';

export default function AddThirdParty() {

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
    let [thirdPartiesData,
        setthirdPartiesData] = useState([]);

    const [thirdPartiesNameArray,
        setthirdPartiesNameArray] = useState([]);
    useEffect(() => {
        const check = async() => {
            let checkdata = await checkISAdmin();
            if (!checkdata || checkdata === false) {
                await router.push("/login")
            }
        };

        check();

        if (thirdPartiesData.length === 0) {
            request
                .get("/getThirdParties")
                .then((e : any) => {
                    console.log(e
                        ?.data)
                    setthirdPartiesData(e
                        ?.data);

                    let thirdPartyData = e
                        ?.data || [];
                    let thirdPartyNameArray : any = [];
                    for (let x in thirdPartyData) {
                        let thirdPartynametemp = thirdPartyData[x]
                            ?.CompanyName;
                        let adminObject = {
                            value: thirdPartynametemp,
                            label: thirdPartynametemp
                        };
                        thirdPartyNameArray.push(adminObject);
                    };

                    thirdPartyNameArray.unshift({value: "ALL", label: "ALL"});
                    setthirdPartiesNameArray(thirdPartyNameArray);
                    console.log(thirdPartyNameArray)
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
            .get("/getThirdParties")
            .then((e : any) => {
                console.log(e
                    ?.data)
                setthirdPartiesData(e
                    ?.data);
                    let thirdPartyData = e
                    ?.data || [];
                let thirdPartyNameArray : any = [];
                for (let x in thirdPartyData) {
                    let thirdPartynametemp = thirdPartyData[x]
                        ?.CompanyName;
                    let adminObject = {
                        value: thirdPartynametemp,
                        label: thirdPartynametemp
                    };
                    thirdPartyNameArray.push(adminObject);
                };

                thirdPartyNameArray.unshift({value: "ALL", label: "ALL"});
                setthirdPartiesNameArray(thirdPartyNameArray);
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
            .post("/thirdPartyactive", {id: id})
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
            .post("/thirdPartyInactive", {id: id})
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

    const [ThirdPartyClicked,
        setThirdPartyClicked] = useState(false)
    const [currentClickedTable,
        setcurrentClickedTable] = useState({});
    const closemodal = () => {
        setThirdPartyClicked(false);
    };

    const updateThirdParty = async(clickedTable : any) => {
        await setcurrentClickedTable(clickedTable);
        setThirdPartyClicked(true);
    };


    const [selectedThirdPartywithName,
        setselectedThirdPartywithName] = useState("ALL");
    const changeselectedThirdPartywithName = async(e:any)=>{
            setselectedThirdPartywithName(e?.value);
        };

    return (
        <div
            className="d-flex justify-content-center align-items-center align-content-center mt-auto">
            <Nav/>
            <ScrollToTop/>
            <ToastContainer/>

            <div
                className='container-fluid '
                style={{
                width: '100vw'
            }}>
                <h1
                    className="d-flex justify-content-center align-items-center mb-4 text-3xl font-extrabold text-gray-900 dark:text-white md:text-5xl lg:text-6xl">
                    <span
                        className="text-transparent bg-clip-text bg-gradient-to-r to-emerald-600 from-sky-400">Third Parties</span>
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
                    options={thirdPartiesNameArray}
                    onChange={(e:any)=>{changeselectedThirdPartywithName(e)}}
                    />
                <div></div>

                <div className='table-responsive text-nowrap'>
                    <table className="table table-striped">
                        <thead className="thead-dark">
                            <tr>
                                <th>S.N</th>
                                <th>Company Name</th>
                                <th>Email</th>
                                <th>Phone</th>
                                <th>Alternate Phone</th>
                                <th>Pan</th>
                                <th>Address</th>
                                <th>isActive</th>
                                <th>added Date</th>
                                <th>added By</th>
                                <th>Active</th>
                                <th>Inactive</th>

                            </tr>
                        </thead>
                        <tbody>
                            {thirdPartiesData && thirdPartiesData.filter((value:any) => {
            if(selectedThirdPartywithName==="" || selectedThirdPartywithName==="ALL"){
                return value.CompanyName === value.CompanyName;
            } else {

                return value.CompanyName === selectedThirdPartywithName;
            }
          }).map((info : any, index) => {
                                return (
                                    <tr key={index} tabIndex={index} className='cilcikable-tr '>
                                        <th
                                            onClick={() => {
                                            updateThirdParty(info)
                                        }}
                                            className="table-danger"
                                            scope="row">{index + 1}</th>
                                        <td
                                            onClick={() => {
                                            updateThirdParty(info)
                                        }}
                                            className="table-danger">{info.CompanyName}</td>
                                        <td
                                            onClick={() => {
                                            updateThirdParty(info)
                                        }}
                                            className="table-danger">{info.Email}</td>
                                        <td
                                            onClick={() => {
                                            updateThirdParty(info)
                                        }}
                                            className="table-danger">{info.Phone}</td>
                                        <td
                                            onClick={() => {
                                            updateThirdParty(info)
                                        }}
                                            className="table-danger">{info.AltPhone || ""}</td>
                                        <td
                                            onClick={() => {
                                            updateThirdParty(info)
                                        }}
                                            className="table-danger">{info.Pan}</td>
                                        <td
                                            onClick={() => {
                                            updateThirdParty(info)
                                        }}
                                            className="table-danger">{info.Address}</td>
                                        <td
                                            onClick={() => {
                                            updateThirdParty(info)
                                        }}
                                            className="table-danger">{info.isActive
                                                ? "TRUE"
                                                : "FALSE"}</td>
                                        <td
                                            onClick={() => {
                                            updateThirdParty(info)
                                        }}
                                            className="table-danger">{info.addedDate}</td>
                                        <td
                                            onClick={() => {
                                            updateThirdParty(info)
                                        }}
                                            className="table-danger">{info.addedBy}</td>
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
                                    </tr>
                                )
                            })
}
                        </tbody>
                    </table>
                </div>

                {ThirdPartyClicked && <div className='modal-customer-edit'>
                    <ThirdpartyUpdateModal
                        reloadTable={refreshThirdParties}
                        thirdparty={currentClickedTable}
                        closemodal={closemodal}
                        errorToast={notifyerror}
                        successToast={notifysuccess}/>

                </div>
}

            </div>

        </div>

    )
}
