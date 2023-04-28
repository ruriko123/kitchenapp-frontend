import React, {FC} from "react";
interface Props {
    reloadTable : any,
    restaurantData : any,
    closemodal : any,
    errorToast : any,
    successToast : any
};
import {useState} from 'react';
import {useEffect} from 'react';
import request from '../axiosconfig/axios';
import {
    Button,
    Modal,
    ModalHeader,
    ModalBody,
    ModalFooter,
    Form,
    FormGroup,
    Label,
    FormText
} from 'reactstrap';
import {FormControl} from "react-bootstrap";
import TimePicker from 'react-time-picker';
import 'react-time-picker/dist/TimePicker.css';
import 'react-clock/dist/Clock.css';
import Select from 'react-select';

const RestaurantUpdateModal : FC < Props > = ({successToast, errorToast, reloadTable, restaurantData, closemodal}) => {
    const [name,
        setname] = useState("");
    const [address,
        setAddress] = useState("");
    const [Phone,
        setPhone] = useState("");
    const [Email,
        setEmail] = useState("");
    const [altPhone,
        setaltPhone] = useState("");
    const [show,
        setshow] = useState(false);
    const [vatno,
        setvatno] = useState("");
    const [details,
        setdetails] = useState("");
    const [logo,
        setlogo] = useState("");
    const [coverImage,
        setcoverImage] = useState("");
    const [contactPerson,
        setcontactPerson] = useState("");
    const [commission,
        setcommission] = useState("");
    const [slogan,
        setslogan] = useState("");
    const [isResproclient,
        setisResproclient] = useState(true);
    const [baseURL,
        setbaseURL] = useState("");
    const [isPopular,
        setisPopular] = useState(false);
    

    // const [openingTime, setopeningTime] = useState(""); const [closingTime,
    // setclosingTime] = useState("");

    const [openingtimeValue,
        setopeningtimeValue] = useState('');
    const [closingtimeValue,
        setclosingtimeValue] = useState('');
    const [long,
        setlong] = useState('');
    const [lat,
        setlat] = useState('');
    const [operatingLocations,
        setoperatingLocations] = useState([]);
        const [defaultOperatingLocation,
            setdefaultOperatingLocation] =  useState < any[] > ([]);
            const [selectedoperatingLocation,
                setselectedoperatingLocation] = useState("");    
    useEffect(() => {
        if (restaurantData) {
            setshow(true);
            setAddress(restaurantData
                ?.Address || "");
            setEmail(restaurantData
                ?.Email || "");
            setPhone(restaurantData
                ?.Phone || "");
            setaltPhone(restaurantData
                ?.AltPhone || "");
            setvatno(restaurantData
                ?.Pan || "");
            setname(restaurantData
                ?.Name || "");
            setdetails(restaurantData
                ?.details || "");
            setlogo(restaurantData
                ?.logo || "");
            setcoverImage(restaurantData
                ?.coverimage || "");
            setcontactPerson(restaurantData
                ?.contactPerson || "");
            setslogan(restaurantData
                ?.slogan || "");
            setisResproclient(restaurantData
                ?.isResproclient || "");
            setbaseURL(restaurantData
                ?.baseURL || "");
            setopeningtimeValue(restaurantData
                ?.openingTime || "")
            setclosingtimeValue(restaurantData
                ?.closingTime || "");
            setcommission(restaurantData
                ?.commission || "");
            setlong(restaurantData
                ?.long || "");
            setlat(restaurantData
                ?.lat || "");
            setisPopular(restaurantData
                ?.isPopular || false);
            let defaultlocationarray = [{value:restaurantData
                ?.operatingLocation,label:restaurantData
                ?.operatingLocation}];
            setdefaultOperatingLocation(defaultlocationarray)
            setselectedoperatingLocation(restaurantData
                ?.operatingLocation);
        };
    }, []);

    const changeLong = (e : any) => {
        setshowupdateButton(false);
        setlong(e.target.value);
        setshowupdateButton(true);
    };

    const changeLat = (e : any) => {
        setshowupdateButton(false);
        setlat(e.target.value);
        setshowupdateButton(true);
    };

    const changecommission = (e : any) => {
        setshowupdateButton(false);
        setcommission(e.target.value);
        setshowupdateButton(true);
    };

    const changebaseURL = (e : any) => {
        setshowupdateButton(false);
        setbaseURL(e.target.value);
        setshowupdateButton(true);
    };

    const changeisResproclient = (e : any) => {
        // console.log(e?.target?.checked);
        setshowupdateButton(false);
        setisResproclient(e
            ?.target
                ?.checked);
        setshowupdateButton(true);
    };
    const changeisPopular = (e : any) => {
        // console.log(e?.target?.checked);
        setshowupdateButton(false);
        setisPopular(e
            ?.target
                ?.checked);
        setshowupdateButton(true);
    };

    const changeslogan = (e : any) => {
        setshowupdateButton(false);
        setslogan(e.target.value);
        setshowupdateButton(true);
    };

    const changecontactPerson = (e : any) => {
        setshowupdateButton(false);
        setcontactPerson(e.target.value);
        setshowupdateButton(true);
    };

    const changecoverImage = (e : any) => {
        setshowupdateButton(false);
        setcoverImage(e.target.value);
        setshowupdateButton(true);
    };

    const changelogo = (e : any) => {
        setshowupdateButton(false);
        setlogo(e.target.value);
        setshowupdateButton(true);
    };

    const changedetails = (e : any) => {
        setshowupdateButton(false);
        setdetails(e.target.value);
        setshowupdateButton(true);
    };

    const changename = (e : any) => {
        setshowupdateButton(false);
        setname(e.target.value);
        setshowupdateButton(true);

    };

    const changePhone = (e : any) => {
        setshowupdateButton(false);
        setPhone(e.target.value);
        setshowupdateButton(true);

    };
    const changeEmail = (e : any) => {
        setshowupdateButton(false);
        setEmail(e.target.value);
        setshowupdateButton(true);

    };
    const changeaddress = (e : any) => {
        setshowupdateButton(false);
        setAddress(e.target.value);
        setshowupdateButton(true);

    };
    const changealtPhone = (e : any) => {
        setshowupdateButton(false);
        setaltPhone(e.target.value);
        setshowupdateButton(true);

    };

    const changevat = (e : any) => {
        setshowupdateButton(false);
        setvatno(e.target.value);
        setshowupdateButton(true);
    };

    const handleOptionChange = async(e : any, a : any) => {
        setshowupdateButton(false);
        setselectedoperatingLocation(e?.value);
        setshowupdateButton(true);
    };


    const [showupdateButton,
        setshowupdateButton] = useState(false);
    const updaterestaurantDataData = async() => {
        request
            .post(`/updateRestaurantinfo`, {
            Address: address,
            Email: Email,
            Phone: Phone,
            AltPhone: altPhone,
            Pan: vatno,
            Name: name,
            id: restaurantData.id,
            details: details,
            logo: logo,
            coverimage: coverImage,
            contactPerson: contactPerson,
            commission: commission,
            slogan: slogan,
            baseURL: baseURL,
            openingTime: openingtimeValue,
            closingTime: closingtimeValue,
            isResproclient: isResproclient,
            long: long,
            lat: lat,
            operatingLocation:selectedoperatingLocation,
            isPopular: isPopular
        })
            .then(async(response : any) => {
                successToast(response
                    ?.data
                        ?.success);
                reloadTable()
                closemodal();
                changeShow();
            })
            .catch((e : any) => {
                errorToast(e
                    ?.response
                        ?.data
                            ?.error);
            });

    };

    const changeShow = () => {
        setshow(false);
        closemodal();
        return;
    };

    //http://localhost:5000/getOperatingLocations
    useEffect(() => {
        request
            .get('/getOperatingLocations')
            .then((e) => {
                let operatinglocationarray = e
                    ?.data;
                    console.log(operatinglocationarray);
                let locationoptionsarray:any = [];
                for(let i in operatinglocationarray){
                    let locationdata = operatinglocationarray[i];
                    if(locationdata?.isActive){
                        let locationName= locationdata?.LocationName;
                        let locationobject = { value: locationName, label: locationName }
                        locationoptionsarray.push(locationobject);
                    };
                };

                setoperatingLocations(locationoptionsarray);
            })
            .catch((e) => {
                errorToast(e
                    ?.response
                        ?.data
                            ?.error);
            })

    }, [])

    return (

        <Modal isOpen={show} toggle={changeShow} className={"this.props.className"}>
            <ModalHeader toggle={changeShow}>Modal title</ModalHeader>
            <ModalBody>
                <Form>
                    <FormGroup className="mb-3 customer-edit-fileds">
                        <Label>Name :</Label>
                        <FormControl
                            type="text"
                            placeholder={name}
                            defaultValue={name}
                            onChange={changename}/>
                        <Label>Phone :</Label>
                        <FormControl
                            type="phone"
                            placeholder={Phone}
                            defaultValue={Phone}
                            onChange={changePhone}/>
                        <Label>Email :</Label>
                        <FormControl
                            type="email"
                            placeholder={Email}
                            defaultValue={Email}
                            onChange={changeEmail}/>
                        <Label>Address :</Label>
                        <FormControl
                            type="text"
                            placeholder={address}
                            defaultValue={address}
                            onChange={changeaddress}
                            autoFocus/>
                        <Label>Alternate phone number :</Label>
                        <FormControl
                            type="phone"
                            placeholder={altPhone}
                            defaultValue={altPhone}
                            onChange={changealtPhone}/>
                        <Label>Vat No :</Label>
                        <FormControl
                            type="text"
                            placeholder={vatno}
                            defaultValue={vatno}
                            onChange={changevat}/>
                        <Label>details :</Label>
                        <FormControl
                            type="text"
                            placeholder={details}
                            defaultValue={details}
                            onChange={changedetails}
                            maxLength={100}
                            />
                        <Label>Logo :</Label>
                        <FormControl
                            type="text"
                            placeholder={logo}
                            defaultValue={logo}
                            onChange={changelogo}/>
                        <Label>Cover Image :</Label>
                        <FormControl
                            type="text"
                            placeholder={coverImage}
                            defaultValue={coverImage}
                            onChange={changecoverImage}/>
                        <Label>Contact Person :</Label>
                        <FormControl
                            type="text"
                            placeholder={contactPerson}
                            defaultValue={contactPerson}
                            onChange={changecontactPerson}/>
                        <Label>Commission :</Label>
                        <FormControl
                            type="text"
                            placeholder={commission}
                            defaultValue={commission}
                            onChange={changecommission}/>
                        <Label>Slogan :</Label>
                        <FormControl
                            type="text"
                            placeholder={slogan}
                            defaultValue={slogan}
                            onChange={changeslogan}/>
                        <Label>Latitude :</Label>
                        <FormControl
                            type="text"
                            placeholder={lat}
                            defaultValue={lat}
                            onChange={changeLat}/>
                        <Label>Longitude :</Label>
                        <FormControl
                            type="text"
                            placeholder={long}
                            defaultValue={long}
                            onChange={changeLong}/>
                        <Label>baseURL :</Label>
                        <FormControl
                            type="text"
                            placeholder={baseURL}
                            defaultValue={baseURL}
                            onChange={changebaseURL}/>
                    </FormGroup>
                </Form>
                <div
                    className="d-flex flex-column d-flex justify-content-between d-flex align-items-center">
                    {defaultOperatingLocation && defaultOperatingLocation.length>0 &&
                    
                    <div className="d-flex justify-content-center">
                        
                        <Select defaultValue={defaultOperatingLocation||{value:"KATHMANDU",label:"KATHMANDU"}} options={operatingLocations} onChange={(e : any, a : any) => {
                    handleOptionChange(e, a)
                }}/>
                    </div>
                    }

                    <div className="d-flex justify-content-end">
                        <input
                            className="mr-2 mt-[0.3rem] h-3.5 w-8 appearance-none rounded-[0.4375rem] bg-neutral-300 before:pointer-events-none before:absolute before:h-3.5 before:w-3.5 before:rounded-full before:bg-transparent before:content-[''] after:absolute after:z-[2] after:-mt-[0.1875rem] after:h-5 after:w-5 after:rounded-full after:border-none after:bg-neutral-100 after:shadow-[0_0px_3px_0_rgb(0_0_0_/_7%),_0_2px_2px_0_rgb(0_0_0_/_4%)] after:transition-[background-color_0.2s,transform_0.2s] after:content-[''] checked:bg-primary checked:after:absolute checked:after:z-[2] checked:after:-mt-[3px] checked:after:ml-[1.0625rem] checked:after:h-5 checked:after:w-5 checked:after:rounded-full checked:after:border-none checked:after:bg-primary checked:after:shadow-[0_3px_1px_-2px_rgba(0,0,0,0.2),_0_2px_2px_0_rgba(0,0,0,0.14),_0_1px_5px_0_rgba(0,0,0,0.12)] checked:after:transition-[background-color_0.2s,transform_0.2s] checked:after:content-[''] hover:cursor-pointer focus:outline-none focus:ring-0 focus:before:scale-100 focus:before:opacity-[0.12] focus:before:shadow-[3px_-1px_0px_13px_rgba(0,0,0,0.6)] focus:before:transition-[box-shadow_0.2s,transform_0.2s] focus:after:absolute focus:after:z-[1] focus:after:block focus:after:h-5 focus:after:w-5 focus:after:rounded-full focus:after:content-[''] checked:focus:border-primary checked:focus:bg-primary checked:focus:before:ml-[1.0625rem] checked:focus:before:scale-100 checked:focus:before:shadow-[3px_-1px_0px_13px_#3b71ca] checked:focus:before:transition-[box-shadow_0.2s,transform_0.2s] dark:bg-neutral-600 dark:after:bg-neutral-400 dark:checked:bg-primary dark:checked:after:bg-primary dark:focus:before:shadow-[3px_-1px_0px_13px_rgba(255,255,255,0.4)] dark:checked:focus:before:shadow-[3px_-1px_0px_13px_#3b71ca]"
                            type="checkbox"
                            role="switch"
                            id="flexSwitchChecked"
                            defaultChecked={isResproclient}
                            onClick={(e) => changeisResproclient(e)}/>
                        <label
                            className="inline-block pl-[0.15rem] hover:cursor-pointer"
                            htmlFor="flexSwitchChecked">isResproclient</label>

                    </div>
                    <div className="d-flex justify-content-end">
                        <input
                            className="mr-2 mt-[0.3rem] h-3.5 w-8 appearance-none rounded-[0.4375rem] bg-neutral-300 before:pointer-events-none before:absolute before:h-3.5 before:w-3.5 before:rounded-full before:bg-transparent before:content-[''] after:absolute after:z-[2] after:-mt-[0.1875rem] after:h-5 after:w-5 after:rounded-full after:border-none after:bg-neutral-100 after:shadow-[0_0px_3px_0_rgb(0_0_0_/_7%),_0_2px_2px_0_rgb(0_0_0_/_4%)] after:transition-[background-color_0.2s,transform_0.2s] after:content-[''] checked:bg-primary checked:after:absolute checked:after:z-[2] checked:after:-mt-[3px] checked:after:ml-[1.0625rem] checked:after:h-5 checked:after:w-5 checked:after:rounded-full checked:after:border-none checked:after:bg-primary checked:after:shadow-[0_3px_1px_-2px_rgba(0,0,0,0.2),_0_2px_2px_0_rgba(0,0,0,0.14),_0_1px_5px_0_rgba(0,0,0,0.12)] checked:after:transition-[background-color_0.2s,transform_0.2s] checked:after:content-[''] hover:cursor-pointer focus:outline-none focus:ring-0 focus:before:scale-100 focus:before:opacity-[0.12] focus:before:shadow-[3px_-1px_0px_13px_rgba(0,0,0,0.6)] focus:before:transition-[box-shadow_0.2s,transform_0.2s] focus:after:absolute focus:after:z-[1] focus:after:block focus:after:h-5 focus:after:w-5 focus:after:rounded-full focus:after:content-[''] checked:focus:border-primary checked:focus:bg-primary checked:focus:before:ml-[1.0625rem] checked:focus:before:scale-100 checked:focus:before:shadow-[3px_-1px_0px_13px_#3b71ca] checked:focus:before:transition-[box-shadow_0.2s,transform_0.2s] dark:bg-neutral-600 dark:after:bg-neutral-400 dark:checked:bg-primary dark:checked:after:bg-primary dark:focus:before:shadow-[3px_-1px_0px_13px_rgba(255,255,255,0.4)] dark:checked:focus:before:shadow-[3px_-1px_0px_13px_#3b71ca]"
                            type="checkbox"
                            role="switch"
                            id="flexSwitchChecked"
                            defaultChecked={isPopular}
                            onClick={(e) => changeisPopular(e)}/>
                        <label
                            className="inline-block pl-[0.15rem] hover:cursor-pointer"
                            htmlFor="flexSwitchChecked">isPopular</label>
                    </div>

                    <Label>Opening Time :</Label>
                    <TimePicker
                        onChange={(e : any) => {
                        setopeningtimeValue(e);
                        setshowupdateButton(true);
                    }}
                        value={openingtimeValue}/>
                    <Label>Closing Time :</Label>
                    <TimePicker
                        onChange={(e : any) => {
                        setclosingtimeValue(e);
                        setshowupdateButton(true);
                    }}
                        value={closingtimeValue}/>
                </div>
            </ModalBody>
            <ModalFooter>
                {showupdateButton && <Button color="primary" onClick={updaterestaurantDataData}>Update</Button>
}
                <Button color="secondary" onClick={changeShow}>Cancel</Button>
            </ModalFooter>
        </Modal>

    )
}

export default RestaurantUpdateModal