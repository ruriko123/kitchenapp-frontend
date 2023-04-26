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
                })
                .catch((e) => {
                    initialToastError(e
                        ?.response
                            ?.data
                                ?.error);
                })

        }

    }, []);


    const refreshThirdParties = async ()=>{
        request
                .get("/getThirdParties")
                .then((e : any) => {
                    console.log(e
                        ?.data)
                    setthirdPartiesData(e
                        ?.data);
                        
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
                notifysuccess(e?.data?.success);
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
            notifysuccess(e?.data?.success);
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
                <h1 className="flex items-center text-5xl font-extrabold dark:text-white">
                    <span
                        className="bg-blue-100 text-blue-800 text-2xl font-semibold mr-2 px-2.5 py-0.5 rounded dark:bg-blue-200 dark:text-blue-800 ml-2">Click to update</span>
                </h1>
               <div>
            
                </div>


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
                            {thirdPartiesData && thirdPartiesData.map((info : any, index) => {
                                return (
                                    <tr
                                        key={index}
                                        tabIndex={index}
                                                                                className='cilcikable-tr '>
                                        <th onClick={() => {
                                        updateThirdParty(info)
                                    }} className="table-danger" scope="row">{index + 1}</th>
                                        <td onClick={() => {
                                        updateThirdParty(info)
                                    }} className="table-danger">{info.CompanyName}</td>
                                        <td onClick={() => {
                                        updateThirdParty(info)
                                    }} className="table-danger">{info.Email}</td>
                                        <td onClick={() => {
                                        updateThirdParty(info)
                                    }} className="table-danger">{info.Phone}</td>
                                        <td onClick={() => {
                                        updateThirdParty(info)
                                    }} className="table-danger">{info.AltPhone || ""}</td>
                                        <td onClick={() => {
                                        updateThirdParty(info)
                                    }} className="table-danger">{info.Pan}</td>
                                        <td onClick={() => {
                                        updateThirdParty(info)
                                    }} className="table-danger">{info.Address}</td>
                                        <td onClick={() => {
                                        updateThirdParty(info)
                                    }} className="table-danger">{info.isActive
                                                ? "TRUE"
                                                : "FALSE"}</td>
                                        <td onClick={() => {
                                        updateThirdParty(info)
                                    }} className="table-danger">{info.addedDate}</td>
                                        <td onClick={() => {
                                        updateThirdParty(info)
                                    }} className="table-danger">{info.addedBy}</td>
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

                {ThirdPartyClicked &&
                    <div className='modal-customer-edit'>
                        <ThirdpartyUpdateModal
                            reloadTable={refreshThirdParties}
                            thirdparty={currentClickedTable}
                            closemodal={closemodal}
                            errorToast={notifyerror}
                            successToast={notifysuccess}
                            />

                    </div>
                }

            </div>

        </div>

    )
}
