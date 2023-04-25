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
            setactiveInactive] = useState("getActiveRestaurant");

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
                .catch((e) => {
                    // console.log(e);
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

    const toggleActiveinactive = async (e:any)=>{
        console.log(e)
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

