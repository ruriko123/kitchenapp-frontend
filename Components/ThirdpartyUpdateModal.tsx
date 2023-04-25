import React, {FC} from "react";
interface Props {
    reloadTable : any,
    thirdparty : any,
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

const ThirdpartyUpdateModal : FC < Props > = ({successToast,errorToast,reloadTable, thirdparty, closemodal}) => {
    const [companyName,
        setcompanyName] = useState("");
    const [address,
        setAddress] = useState("");
    const [Email,
        setEmail] = useState("");
    const [Phone,
        setPhone] = useState("");
    const [altPhone,
        setaltPhone] = useState("");
    const [show,
        setshow] = useState(false);
    const [vatno,
        setvatno] = useState("");

    useEffect(() => {
        if (thirdparty) {
            setshow(true);
            setAddress(thirdparty
                ?.Address || "");
            setEmail(thirdparty
                ?.Email || "");
            setPhone(thirdparty
                ?.Phone || "");
            setaltPhone(thirdparty
                ?.AltPhone || "");
            setvatno(thirdparty
                ?.vat || "");
            setcompanyName(thirdparty
                ?.CompanyName || "");
        }
    }, []);
    const changeCompanyName = (e : any) => {
        setshowupdateButton(false);
        setcompanyName(e.target.value);
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
    const updateThirdPartyData = async() => {
        request.post(`/thirdPartyupdate`, {
            Address: address,
            Email: Email,
            Phone: Phone,
            AltPhone: altPhone,
            Pan: vatno,
            CompanyName: companyName,
            id:thirdparty.id
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
            })

    }

    const changeShow = () => {
        setshow(false);
        closemodal();
        return;
    }
    return (

        <Modal isOpen={show} toggle={changeShow} className="modalcontainer">
            <ModalHeader toggle={changeShow}>Modal title</ModalHeader>
            <ModalBody>
                <Form className="">
                    <FormGroup className="mb-3 customer-edit-fileds">
                        <Label>Name :</Label>
                        <FormControl
                            type="text"
                            placeholder={companyName}
                            defaultValue={companyName}
                            onChange={changeCompanyName}
                            autoFocus/>
                        <Label>Phone :</Label>
                        <FormControl
                            type="phone"
                            placeholder={Phone}
                            defaultValue={Phone}
                            onChange={changePhone}
                            autoFocus/>
                        <Label>Email :</Label>
                        <FormControl
                            type="email"
                            placeholder={Email}
                            defaultValue={Email}
                            onChange={changeEmail}
                            autoFocus/>
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
                            autoFocus/>
                        <Label>Vat No :</Label>
                        <FormControl
                            type="text"
                            placeholder={vatno}
                            defaultValue={vatno}
                            onChange={changevat}
                            autoFocus/>
                    </FormGroup>
                </Form>
            </ModalBody>
            <ModalFooter>
                {showupdateButton && <Button color="primary" onClick={updateThirdPartyData}>Update</Button>
}
                <Button color="secondary" onClick={changeShow}>Cancel</Button>
            </ModalFooter>
        </Modal>

    )
}

export default ThirdpartyUpdateModal