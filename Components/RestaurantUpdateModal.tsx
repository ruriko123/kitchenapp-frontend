import React, {FC} from "react";
interface Props {
    reloadTable : any,
    restaurantData : any,
    closemodal : any,
    errorToast:any,
    successToast:any
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

const RestaurantUpdateModal : FC < Props > = ({successToast,errorToast,reloadTable, restaurantData, closemodal}) => {
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
    const [details, setdetails] = useState("");
    const [logo, setlogo] = useState("");
    const [coverImage, setcoverImage] = useState("");
    const [contactPerson, setcontactPerson] = useState("");
    const [commission, setcommission] = useState("");
    const [slogan, setslogan] = useState("");
    const [isResproclient, setisResproclient] = useState(true);
    const [baseURL, setbaseURL] = useState("");
    const [openingTime, setopeningTime] = useState("");
    const [closingTime, setclosingTime] = useState("");







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
            setdetails(restaurantData?.details||"");
            setlogo(restaurantData?.logo||"");
            setcoverImage(restaurantData?.coverimage||"");
            setcontactPerson(restaurantData?.contactPerson||"");
            setslogan(restaurantData?.slogan||"");
            setisResproclient(restaurantData?.isResproclient||"");
            setbaseURL(restaurantData?.baseURL||"");
            setopeningTime(restaurantData?.openingTime||"");
            setclosingTime(restaurantData?.closingTime||"");
            setcommission(restaurantData?.commission||"")
        };
    }, []);


    const changecommission = (e : any) => {
        setshowupdateButton(false);
        setcommission(e.target.value);
        setshowupdateButton(true);
    };

    const changeclosingTime = (e : any) => {
        setshowupdateButton(false);
        setclosingTime(e.target.value);
        setshowupdateButton(true);
    };

    const changeopeningTime = (e : any) => {
        setshowupdateButton(false);
        setopeningTime(e.target.value);
        setshowupdateButton(true);
    };


    const changebaseURL = (e : any) => {
        setshowupdateButton(false);
        setbaseURL(e.target.value);
        setshowupdateButton(true);
    };



    const changeisResproclient = (e : any) => {
        setshowupdateButton(false);
        setisResproclient(e.target.value);
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

    const [showupdateButton,
        setshowupdateButton] = useState(false);
    const updaterestaurantDataData = async() => {
        request.post(`/updateRestaurantinfo`, {
            Address: address,
            Email: Email,
            Phone: Phone,
            AltPhone: altPhone,
            Pan: vatno,
            Name: name,
            id:restaurantData.id,
            details:details,
            logo:logo,
            coverimage:coverImage,
            contactPerson:contactPerson,
            commission:commission,
            slogan:slogan,
            baseURL:baseURL,
            openingTime:openingTime,
            closingTime:closingTime

        })
            .then(async(response : any) => {
                successToast(response?.data?.success);
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
                            onChange={changename}
                            />
                        <Label>Phone :</Label>
                        <FormControl
                            type="phone"
                            placeholder={Phone}
                            defaultValue={Phone}
                            onChange={changePhone}
                            />
                        <Label>Email :</Label>
                        <FormControl
                            type="email"
                            placeholder={Email}
                            defaultValue={Email}
                            onChange={changeEmail}
                            />
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
                            onChange={changealtPhone}
                            />
                        <Label>Vat No :</Label>
                        <FormControl
                            type="text"
                            placeholder={vatno}
                            defaultValue={vatno}
                            onChange={changevat}
                            />
                        <Label>details :</Label>
                        <FormControl
                            type="text"
                            placeholder={details}
                            defaultValue={details}
                            onChange={changedetails}
                            />
                        <Label>Logo :</Label>
                        <FormControl
                            type="text"
                            placeholder={logo}
                            defaultValue={logo}
                            onChange={changelogo}
                            />
                        <Label>Cover Image :</Label>
                        <FormControl
                            type="text"
                            placeholder={coverImage}
                            defaultValue={coverImage}
                            onChange={changecoverImage}
                            />
                        <Label>Contact Person :</Label>
                        <FormControl
                            type="text"
                            placeholder={contactPerson}
                            defaultValue={contactPerson}
                            onChange={changecontactPerson}
                            />
                        <Label>Commission :</Label>
                        <FormControl
                            type="text"
                            placeholder={commission}
                            defaultValue={commission}
                            onChange={changecommission}
                            />
                        <Label>Slogan :</Label>
                        <FormControl
                            type="text"
                            placeholder={slogan}
                            defaultValue={slogan}
                            onChange={changeslogan}
                            />
                        {/* <Label>isRespro Client? :</Label>
                        <FormControl
                            type="boolean"
                            placeholder={isResproclient}
                            defaultValue={isResproclient}
                            onChange={changeslogan}
                            autoFocus/> */}
                        <Label>baseURL :</Label>
                        <FormControl
                            type="text"
                            placeholder={baseURL}
                            defaultValue={baseURL}
                            onChange={changebaseURL}
                            />

                        <Label>Opening Time :</Label>
                        <FormControl
                            type="text"
                            placeholder={openingTime}
                            defaultValue={openingTime}
                            onChange={changeopeningTime}
                            />
                        <Label>Closing Time :</Label>
                        <FormControl
                            type="text"
                            placeholder={closingTime}
                            defaultValue={closingTime}
                            onChange={changeclosingTime}
                            />
                    </FormGroup>
                </Form>
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