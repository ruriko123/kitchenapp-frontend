import React, {useState, useEffect, useContext} from 'react';
import {useRouter} from 'next/router';
import ScrollToTop from "react-scroll-to-top";
import "../../styles/form.module.css"
import request from '../../../axiosconfig/axios';
import checkISAdmin from '../../../checkAdminStatus/checkAdmin';
import {ToastContainer, toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import RestaurantUpdateModal from '../../../Components/RestaurantUpdateModal';
import RestaurantThirdPartyLinkModal from '../../../Components/RestaurantThirdPartyLinkModal';
import Nav from '../../../Components/nav';
import Select from 'react-select';

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

    const refreshOutlets = async() => {
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
            .catch((e) => {
                notifyerror(e
                    ?.response
                        ?.data
                            ?.error);
                setrestaurant([]);
            });
    };

    const MakeActive = async(id : string | number) => {
        request
            .post("/restaurantActive", {id: id})
            .then((e) => {
                refreshOutlets();
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
            .post("/restaurantInActive", {id: id})
            .then((e) => {
                refreshOutlets();
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

    const [outletClicked,
        setoutletClicked] = useState(false);
    
    const [currentClickedTable,
        setcurrentClickedTable] = useState({});
    const closemodal = () => {
        setoutletClicked(false);
    };

    const updateOutlet = async(clickedTable : any) => {
        await setcurrentClickedTable(clickedTable);
        setoutletClicked(true);
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

    const [thirdPartyLinksClicked,
        setThirdPartyLinksClicked] = useState(false)
    const [current3pLinkClickedID,
        setcurrent3pLinkClickedID] = useState({});
    const close3plinkModal = () => {
        setThirdPartyLinksClicked(false);
    };

    const [selectedRestaurant,
        setselectedRestaurant] = useState("ALL")

    const thirdPartyLinkClicked = async(clickedOutletID : any, outletName : any) => {
        console.log({id: clickedOutletID, name: outletName})
        await setcurrent3pLinkClickedID({id: clickedOutletID, name: outletName});
        setThirdPartyLinksClicked(true);
    };
    const changeSelectedRestaurant = async(e : any) => {
        setselectedRestaurant(e
            ?.value);
    }

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
                        className="text-transparent bg-clip-text bg-gradient-to-r to-emerald-600 from-sky-400">Restaurants</span>
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
                                {activeInactive === "getInactiveRestaurant" && <th>Active</th>
}
                                {activeInactive === "getActiveRestaurant" && <th>Inactive</th>
}
                                <th>Third Parties</th>

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
                                        <th
                                            onClick={() => {
                                            updateOutlet(info)
                                        }}
                                            className="table-danger"
                                            scope="row">{index + 1}</th>
                                        <td
                                            onClick={() => {
                                            updateOutlet(info)
                                        }}
                                            className="table-danger">{info.Name}</td>
                                        <td
                                            onClick={() => {
                                            updateOutlet(info)
                                        }}
                                            className="table-danger">{info.Email}</td>
                                        <td
                                            onClick={() => {
                                            updateOutlet(info)
                                        }}
                                            className="table-danger">{info.Phone}</td>
                                        <td
                                            onClick={() => {
                                            updateOutlet(info)
                                        }}
                                            className="table-danger">{info.Address}</td>
                                        <td
                                            onClick={() => {
                                            updateOutlet(info)
                                        }}
                                            className="table-danger">{info.isActive
                                                ? "TRUE"
                                                : "FALSE"}</td>
                                        <td
                                            onClick={() => {
                                            updateOutlet(info)
                                        }}
                                            className="table-danger">{info.addedDate}</td>

                                        {activeInactive === "getInactiveRestaurant" && <td className="bg-success">
                                            <button
                                                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full"
                                                onClick={(e) => MakeActive(info.id)}>
                                                Active
                                            </button>
                                        </td>
}
                                        {activeInactive === "getActiveRestaurant" && <td className="bg-danger">
                                            <button
                                                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full"
                                                onClick={(e) => MakeInActive(info.id)}>
                                                Inactive
                                            </button>
                                        </td>
}

                                        <td className="bg-warning">
                                            <button
                                                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full"
                                                onClick={(e) => thirdPartyLinkClicked(info
                                                ?.id, info
                                                ?.Name)}>
                                                Update
                                            </button>
                                        </td>
                                    </tr>
                                )
                            })
}
                        </tbody>
                    </table>
                </div>

                {thirdPartyLinksClicked && <div className='modal-customer-edit'>
                    <RestaurantThirdPartyLinkModal
                        reloadTable={refreshOutlets}
                        restaurantData={current3pLinkClickedID}
                        closemodal={close3plinkModal}
                        errorToast={notifyerror}
                        successToast={notifysuccess}/>

                </div>
}

                {outletClicked && <div className='modal-customer-edit'>
                    <RestaurantUpdateModal
                        reloadTable={refreshOutlets}
                        restaurantData={currentClickedTable}
                        closemodal={closemodal}
                        errorToast={notifyerror}
                        successToast={notifysuccess}/>

                </div>
}

            </div>

        </div>

    )
}
