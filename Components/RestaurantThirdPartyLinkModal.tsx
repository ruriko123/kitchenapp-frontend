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
import {Button, Modal, ModalHeader, ModalBody, ModalFooter} from 'reactstrap';
import Select from 'react-select';
import makeAnimated from 'react-select/animated';
const animatedComponents = makeAnimated();

interface linkListtype {

    allThirdPartyNames : any,
    linkedParties : any
}

const RestaurantThirdPartyLinkModal : FC < Props > = ({successToast, errorToast, reloadTable, restaurantData, closemodal}) => {
    console.log(restaurantData)

    const [name,
        setname] = useState("");
    const [id,
        setid] = useState("");

    const [show,
        setshow] = useState(false);

    const [allOptions,
        setallOptions] = useState < any[] > ([]);
    const [defaultOptions,
        setdefaultOptions] = useState < any[] > ([]);
        const [defaultOptionNotexist,
            setdefaultOptionNotexist] = useState(true);

    
    const postlinktypedata = async(route : string, jsonobject : any) => {
        console.log(route, jsonobject)
        request
            .post(route, jsonobject)
            .then((e) => {
                console.log(e);
            })
            .catch((e : any) => {
                console.log(e);
            });
    };

    useEffect(() => {
        if (restaurantData) {
            setshow(true);
            setid(restaurantData
                ?.id || "");
            setname(restaurantData
                ?.name || "");

            request
                .post("/LinkedThirdParties", {
                id: restaurantData
                    ?.id,
                restaurantName: restaurantData
                    ?.name
            })
                .then((e : any) => {
                    let data : linkListtype = e
                        ?.data;
                    let linkedPartiesArray = data
                        ?.linkedParties;
                    linkedPartiesArray.length>0?setdefaultOptions(linkedPartiesArray):setdefaultOptionNotexist(false);
                    let allthirdparties = data
                        ?.allThirdPartyNames;
                    let entirelinkoptions : any = [];
                    if (allthirdparties || allthirdparties
                        ?.length > 0) {
                        let combinedarray = [
                            ...allthirdparties,
                            ...linkedPartiesArray
                        ];
                        entirelinkoptions = combinedarray.reduce((unique, o) => {
                            if (!unique.some((obj : any) => obj.label === o.label && obj.value === o.value)) {
                                unique.push(o);
                            }
                            return unique;
                        }, []);
                    };
                    setallOptions(entirelinkoptions);
                })
                .catch((e : any) => {
                    console.log(e);
                })
        };
    }, []);

    const handleOptionChange = async(e : any, a : any) => {
        let action = a
            ?.action;
        if (action) {
            if (action === "remove-value") {
                let removed = a
                    ?.removedValue.value;
                let jsonobject = {
                    RestaurantName: `${name}`,
                    id: id,
                    ThirdPartyName: `${removed}`
                };
                postlinktypedata("/unlinkThirdParty", jsonobject);
            } else if (action === "select-option") {
                let addedValue = a
                    ?.option
                        ?.value;
                let jsonobject = {
                    RestaurantName: `${name}`,
                    id: id,
                    ThirdPartyName: `${addedValue}`
                };
                postlinktypedata("/linkThirdParty", jsonobject);
            } else if (action === "clear") {
                let removedvalues = a
                    ?.removedValues;
                let jsonobject = {
                    RestaurantName: `${name}`,
                    id: id,
                    ThirdPartyNames: removedvalues
                };
                postlinktypedata("/clearlinkThirdParty", jsonobject);
            };
        };
    };

    const changeShow = () => {
        setshow(false);
        closemodal();
        return;
    };

    return (

        <Modal isOpen={show} toggle={changeShow} className={"this.props.className"}>
            <ModalHeader toggle={changeShow}>Link third parties</ModalHeader>
            <ModalBody>
                {defaultOptionNotexist && defaultOptions.length > 0 &&
                <Select closeMenuOnSelect={false} components={animatedComponents}
                defaultValue={defaultOptions || []}
                isMulti
                options={allOptions || []}
                onChange={(e : any, a : any) => {
                    handleOptionChange(e, a)
                }}/>
}
{!defaultOptionNotexist && !(defaultOptions.length > 0) && 
 <Select closeMenuOnSelect={false} components={animatedComponents}
 defaultValue={defaultOptions || []}
 isMulti
 options={allOptions || []}
 onChange={(e : any, a : any) => {
     handleOptionChange(e, a)
 }}/>

}

            </ModalBody>
            <ModalFooter>

                <Button color="secondary" onClick={changeShow}>Cancel</Button>
            </ModalFooter>
        </Modal>

    )
}

export default RestaurantThirdPartyLinkModal