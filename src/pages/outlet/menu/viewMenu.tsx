import React, {useState, useEffect, useRef} from 'react';
import {useRouter} from 'next/router';
import ScrollToTop from "react-scroll-to-top";
import "@basecss/form.module.css";
import checkISAdmin from '@checkadmin/checkAdmin';
import {ToastContainer, toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Select from 'react-select';
import Nav from '@components/nav';
import request from '@axiosrequest/axios';
import {DownloadTableExcel} from 'react-export-table-to-excel';

export default function updateOutlet() {
    const tableRef = useRef(null);

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
    //getActivemenu  getInactivemenu
    const router = useRouter();
    let [menu,
        setmenu] = useState([]);
    const [restaurantSelectList,
        setrestaurantSelectList] = useState([]);
    const [menuNamearray,
        setmenuNamearray] = useState([]);

    const [selectedRestaurant,
        setselectedRestaurant] = useState("");

    const [selectedItem,
        setselectedItem] = useState("ALL");
    useEffect(() => {
        const check = async() => {
            let checkdata = await checkISAdmin();
            if (!checkdata || checkdata === false) {
                await router.push("/login")
            }
        };

        check();

        request
            .get("/getRestaurantNameList")
            .then((e : any) => {
                console.log(e.data);
                setrestaurantSelectList(e.data)
            })
            .catch((e : any) => {
                initialToastError(e
                    ?.response
                        ?.data
                            ?.error || "");
            })

    }, []);

    useEffect(() => {
        if (selectedRestaurant && selectedRestaurant
            ?.length > 0) {
            console.log(selectedRestaurant)
            request
                .post(`/menu`, {restaurantID: selectedRestaurant})
                .then((e : any) => {
                    console.log(e
                        ?.data)
                    setmenu(e
                        ?.data);
                    let outletdata = e
                        ?.data || [];
                    let menuNamearray : any = [];
                    for (let x in outletdata) {
                        let menuName = outletdata[x]
                            ?.ItemName;
                        let menuNameobject = {
                            value: menuName,
                            label: menuName
                        };
                        menuNamearray.push(menuNameobject);
                    };
                    menuNamearray.unshift({value: "ALL", label: "ALL"});
                    setmenuNamearray(menuNamearray);
                })
                .catch(async(e) => {
                    initialToastError(e
                        ?.response
                            ?.data
                                ?.error || "");
                    setmenu([]);
                });

        };
    }, [selectedRestaurant]);





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
                .post(`/menu`, {restaurantID: selectedRestaurant})
                .then((e : any) => {
                    console.log(e
                        ?.data)
                    setmenu(e
                        ?.data);
                    let outletdata = e
                        ?.data || [];
                    let menuNamearray : any = [];
                    for (let x in outletdata) {
                        let menuName = outletdata[x]
                            ?.ItemName;
                        let menuNameobject = {
                            value: menuName,
                            label: menuName
                        };
                        menuNamearray.push(menuNameobject);
                    };
                    menuNamearray.unshift({value: "ALL", label: "ALL"});
                    setmenuNamearray(menuNamearray);
                })
                .catch(async(e) => {
                    initialToastError(e
                        ?.response
                            ?.data
                                ?.error || "");
                    setmenu([]);
                });

    };

    const MakeActive = async(id : string | number) => {
        console.log({itemID: id})
        request
            .post("/menuItemActive", {itemID: id})
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
        console.log({itemID: id})
        request
            .post("/menuItemInActive", {itemID: id})
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

    const MakeTaxable = async(id : string | number) => {
        request
            .post("/menuItemTaxable", {itemID: id})
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
    const MakeUnTaxable = async(id : string | number) => {
        request
            .post("/menuItemUnTaxable", {itemID: id})
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

    const changeSelectedRestaurant = async(e : any) => {
        setselectedRestaurant(e
            ?.value);
    };

    const changeselectedItem = async(e : any) => {
        setselectedItem(e
            ?.value);
            setcostPrice(0);
            setsellingPrice(0);
            setsellingPricewithTax(0);
            setdescription("");

    };
    const [costPrice,
        setcostPrice] = useState(0);
    const [sellingPrice,
        setsellingPrice] = useState(0);
    const [sellingPricewithTax,
        setsellingPricewithTax] = useState(0);
    const [description,
        setdescription] = useState("");
    const [showUpdateButton,
        setshowUpdateButton] = useState(false);

    const handleItemChange = async(e : any, id : any, type : any) => {

        let value = e
            ?.target
                ?.value;
        setshowUpdateButton(true);
        if (type === "costPrice") {
            setcostPrice(value);
        };
        if (type === "sellingPrice") {
            setsellingPrice(value);
        };
        if (type === "sellingPricewithTax") {
            setsellingPricewithTax(value);
        };
        if (type === "description") {
            setdescription(value);
        };

    };


    const savechanges = async (itemid:any)=>{
        console.log(itemid,costPrice,sellingPrice,sellingPricewithTax,description)
        
        
        let menuupdatedata:any = {};
        menuupdatedata["itemid"]=itemid;
        if(costPrice && !(costPrice===0)){
            menuupdatedata["costPrice"]=costPrice
        };
        if(sellingPrice && !(sellingPrice===0)){
            menuupdatedata["sellingPrice"]=sellingPrice
        };
        if(sellingPricewithTax && !(sellingPricewithTax===0)){
            menuupdatedata["sellingPricewithTax"]=sellingPricewithTax
        };
        if(description && !(description==="")){
            menuupdatedata["description"]=description
        };

        request.post("/updateMenuItem",menuupdatedata).then((e:any)=>{
            notifysuccess(e
                ?.data
                    ?.success);
                    refreshOutlets();
        }).catch((e:any)=>{
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
                        className="text-transparent bg-clip-text bg-gradient-to-r to-emerald-600 from-sky-400">menu</span>
                </h1>

                <Select
                    className="basic-single"
                    classNamePrefix="select"
                    styles={customStyles}
                    instanceId="select-box"
                    defaultValue={{
                    value: "ALL",
                    label: "SELECT AN OUTLET"
                }}
                    name="color"
                    options={restaurantSelectList}
                    onChange={(e : any) => {
                    changeSelectedRestaurant(e)
                }}/> {selectedRestaurant && selectedRestaurant
                    ?.length > 0 && <div className="afterrestaurantselected">
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
                            options={menuNamearray}
                            onChange={(e : any) => {
                            changeselectedItem(e)
                        }}/>

                        <div className='table-responsive text-nowrap'>
                            <h1
                                className="flex float-right items-center text-5xl font-extrabold dark:text-white">
                                <DownloadTableExcel
                                    filename="users table"
                                    sheet="users"
                                    currentTableRef={tableRef.current}>

                                    <button
                                        className='m-3 focus:outline-none text-white bg-purple-700 hover:bg-purple-800 focus:ring-4 focus:ring-purple-300 font-medium rounded-lg text-sm px-5 py-2.5 mb-2 dark:bg-purple-600 dark:hover:bg-purple-700 dark:focus:ring-purple-900'>
                                        Export excel
                                    </button>

                                </DownloadTableExcel>
                            </h1>
                            <table ref={tableRef} className="table table-striped">
                                <thead className="thead-dark">
                                    <tr>
                                        <th>S.N</th>
                                        <th>Category</th>
                                        <th>Item Name</th>
                                        <th>Cost Price</th>
                                        <th>Selling Price</th>
                                        <th>Selling Price Tax</th>
                                        <th>description</th>
                                        <th>Taxable</th>
                                        <th>isActive</th>
                                        {!(selectedItem==="ALL")&&
                                        <th>update</th>
                                        }
                                    </tr>
                                </thead>
                                <tbody>
                                    {menu && menu.filter((value : any) => {
                                        if (selectedItem === "" || selectedItem === "ALL") {
                                            return value.ItemName === value.ItemName;
                                        } else {

                                            return value.ItemName === selectedItem;
                                        }
                                    }).map((info : any, index) => {
                                        return (
                                            <tr key={index} tabIndex={index} className='cilcikable-tr '>
                                                <th className="table-danger" scope="row">{index + 1}</th>
                                                <td className="table-danger">{info.Category}</td>
                                                <td className="table-danger">{info.ItemName}</td>
                                                <td className="table-danger">
                                                    <input
                                                        name="costPrice"
                                                        id={"costPrice" + `${info
                                                        ?.IDMenu}`}
                                                        value={costPrice === 0
                                                        ? info.costPrice
                                                        : costPrice}
                                                        type="text"
                                                        onChange={(e) => {
                                                        handleItemChange(e, info
                                                            ?.IDMenu, "costPrice")
                                                    }}
                                                        defaultValue={info.costPrice || ""}
                                                        placeholder="Cost Price"
                                                        disabled={(selectedItem==="ALL")}
                                                        />

                                                </td>
                                                <td className="table-danger">
                                                    <input
                                                        name="Selling Price"
                                                        id={"Selling Price" + `${info
                                                        ?.IDMenu}`}
                                                        value={sellingPrice === 0
                                                        ? info.sellingPrice
                                                        : sellingPrice}
                                                        defaultValue={info.sellingPrice || ""}
                                                        type="text"
                                                        onChange={(e) => {
                                                        handleItemChange(e, info
                                                            ?.IDMenu, "sellingPrice")
                                                    }}
                                                        placeholder="Selling Price"
                                                        disabled={(selectedItem==="ALL")}/>
                                                </td>
                                                <td className="table-danger">
                                                    <input
                                                        name="sellingPricewithTax"
                                                        id={"sellingPricewithTax" + `${info
                                                        ?.IDMenu}`}
                                                        value={sellingPricewithTax === 0
                                                        ? info.sellingPricewithTax
                                                        : sellingPricewithTax}
                                                        defaultValue={info.sellingPricewithTax || ""}
                                                        type="text"
                                                        onChange={(e) => {
                                                        handleItemChange(e, info
                                                            ?.IDMenu, "sellingPricewithTax")
                                                    }}
                                                    disabled={(selectedItem==="ALL")}
                                                        placeholder="Selling Price with tax"/>

                                                </td>
                                                <td className="table-danger">
                                                    <input
                                                        name="description"
                                                        id={"description" + `${info
                                                        ?.IDMenu}`}
                                                        value={description === ""
                                                        ? info.description
                                                        : description}
                                                        defaultValue={info.description || ""}
                                                        type="text"
                                                        onChange={(e) => {
                                                        handleItemChange(e, info
                                                            ?.IDMenu, "description")
                                                    }}
                                                    disabled={(selectedItem==="ALL")}
                                                        placeholder="Description"/>

                                                </td>
                                                <td className="table-danger">{info.Taxable
                                                        ? <button
                                                                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full"
                                                                onClick={(e) => MakeUnTaxable(info
                                                                ?.IDMenu)}>
                                                                Make untaxable
                                                            </button>

                                                        : <button
                                                            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full"
                                                            onClick={(e) => MakeTaxable(info
                                                            ?.IDMenu)}>
                                                            Make taxable
                                                        </button>}</td>
                                                <td className="table-danger">{info
                                                        ?.isActive
                                                            ? <button
                                                                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full"
                                                                    onClick={(e) => MakeInActive(info
                                                                    ?.IDMenu)}>
                                                                    Make InActive
                                                                </button>

                                                            : <button
                                                                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full"
                                                                onClick={(e) => MakeActive(info
                                                                ?.IDMenu)}>
                                                                Make Active
                                                            </button>}</td>

                                                            {!(selectedItem==="ALL")&& <td className="table-danger">{showUpdateButton
                                                            ? <button
                                                                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full"
                                                                    onClick={(e) => savechanges(info
                                                                    ?.IDMenu)}>
                                                                    Save changes
                                                                </button>

                                                            : <button
                                                                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full">
                                                                No changes made.
                                                            </button>
                                                            }</td>
                                                        }

                                            </tr>

                                        )
                                    })
}
                                </tbody>
                            </table>
                        </div>
                    </div>
}

            </div>

        </div>

    )
}
