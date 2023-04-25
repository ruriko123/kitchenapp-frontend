import React, {useState, useEffect, useContext} from 'react';
import {useRouter} from 'next/router';
import ScrollToTop from "react-scroll-to-top";
import "../../styles/form.module.css"
import request from '../../../axiosconfig/axios';
import checkISAdmin from '../../../checkAdminStatus/checkAdmin';
import {ToastContainer, toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import RestaurantUpdateModal from '../../../Components/RestaurantUpdateModal';





export default function updateOutlet() {

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
    let [thirdPartiesData,
        setthirdPartiesData] = useState([]);

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

        if (thirdPartiesData.length === 0) {
            request
                .get(`/${activeInactive}`)
                .then((e : any) => {
                    console.log(e
                        ?.data)
                    setthirdPartiesData(e
                        ?.data);
                })
                .catch(async (e) => {
                    initialToastError(e
                        ?.response
                            ?.data
                                ?.error);
                                setthirdPartiesData([]);
                })

        }

    }, []);


    const refreshThirdParties = async ()=>{
        request
                .get(`/${activeInactive}`)
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
                                setthirdPartiesData([]);
                });
    };
    
    const MakeActive = async(id : string | number) => {
        request
            .post("/restaurantActive", {id: id})
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
        .post("/restaurantInActive", {id: id})
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
    const [toggleStatus, settoggleStatus] = useState("INACTIVE");
    const toggleActiveinactive = async (e:any)=>{
        let togglestate = e?.target?.checked;
        togglestate?settoggleStatus("INACTIVE"):settoggleStatus("ACTIVE");
        let currentStatus;
        togglestate?currentStatus="getInactiveRestaurant":currentStatus="getActiveRestaurant";
        setactiveInactive(currentStatus);
        
        request
                .get(`/${currentStatus}`)
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
                                setthirdPartiesData([]);
                });
    }

    return (
        <div
            className="d-flex justify-content-center align-items-center align-content-center mt-auto">
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
                        className="text-transparent bg-clip-text bg-gradient-to-r to-emerald-600 from-sky-400">Restaurant</span>
                </h1>
                <h1 className="flex items-center text-5xl font-extrabold dark:text-white">
                    <span
                        className="bg-blue-100 text-blue-800 text-2xl font-semibold mr-2 px-2.5 py-0.5 rounded dark:bg-blue-200 dark:text-blue-800 ml-2">Click to update</span>
                </h1>
                <div className="d-flex justify-content-end">
                    <input className="mr-2 mt-[0.3rem] h-3.5 w-8 appearance-none rounded-[0.4375rem] bg-neutral-300 before:pointer-events-none before:absolute before:h-3.5 before:w-3.5 before:rounded-full before:bg-transparent before:content-[''] after:absolute after:z-[2] after:-mt-[0.1875rem] after:h-5 after:w-5 after:rounded-full after:border-none after:bg-neutral-100 after:shadow-[0_0px_3px_0_rgb(0_0_0_/_7%),_0_2px_2px_0_rgb(0_0_0_/_4%)] after:transition-[background-color_0.2s,transform_0.2s] after:content-[''] checked:bg-primary checked:after:absolute checked:after:z-[2] checked:after:-mt-[3px] checked:after:ml-[1.0625rem] checked:after:h-5 checked:after:w-5 checked:after:rounded-full checked:after:border-none checked:after:bg-primary checked:after:shadow-[0_3px_1px_-2px_rgba(0,0,0,0.2),_0_2px_2px_0_rgba(0,0,0,0.14),_0_1px_5px_0_rgba(0,0,0,0.12)] checked:after:transition-[background-color_0.2s,transform_0.2s] checked:after:content-[''] hover:cursor-pointer focus:outline-none focus:ring-0 focus:before:scale-100 focus:before:opacity-[0.12] focus:before:shadow-[3px_-1px_0px_13px_rgba(0,0,0,0.6)] focus:before:transition-[box-shadow_0.2s,transform_0.2s] focus:after:absolute focus:after:z-[1] focus:after:block focus:after:h-5 focus:after:w-5 focus:after:rounded-full focus:after:content-[''] checked:focus:border-primary checked:focus:bg-primary checked:focus:before:ml-[1.0625rem] checked:focus:before:scale-100 checked:focus:before:shadow-[3px_-1px_0px_13px_#3b71ca] checked:focus:before:transition-[box-shadow_0.2s,transform_0.2s] dark:bg-neutral-600 dark:after:bg-neutral-400 dark:checked:bg-primary dark:checked:after:bg-primary dark:focus:before:shadow-[3px_-1px_0px_13px_rgba(255,255,255,0.4)] dark:checked:focus:before:shadow-[3px_-1px_0px_13px_#3b71ca]" type="checkbox" role="switch" id="flexSwitchChecked" defaultChecked onClick={toggleActiveinactive} />
                    <label className="inline-block pl-[0.15rem] hover:cursor-pointer" htmlFor="flexSwitchChecked">{toggleStatus}</label>
                </div>
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
                                {activeInactive==="getInactiveRestaurant" &&
                                
                                <th>Active</th>
                                }
                                {activeInactive==="getActiveRestaurant" &&
                                
                                <th>Inactive</th>
                                }

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
                                    }} className="table-danger">{info.Name}</td>
                                        <td onClick={() => {
                                        updateThirdParty(info)
                                    }} className="table-danger">{info.Email}</td>
                                        <td onClick={() => {
                                        updateThirdParty(info)
                                    }} className="table-danger">{info.Phone}</td>
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
                                        
                                        {activeInactive==="getInactiveRestaurant" &&
                                
                                        <td className="bg-success">
                                            <button
                                                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full"
                                                onClick={(e) => MakeActive(info.id)}>
                                                Active
                                            </button>
                                        </td>
                                
                                }
                                        {activeInactive==="getActiveRestaurant" &&
                                
                                        <td className="bg-danger">
                                            <button
                                                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full"
                                                onClick={(e) => MakeInActive(info.id)}>
                                                Inactive
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

                {ThirdPartyClicked &&
                    <div className='modal-customer-edit'>
                        <RestaurantUpdateModal
                            reloadTable={refreshThirdParties}
                            restaurantData={currentClickedTable}
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

