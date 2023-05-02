import * as React from 'react';
import {Button} from 'react-bootstrap';
import {useRouter} from 'next/router';
import Link from 'next/link';
import Nav from '@components/nav';
import request from '../../../axiosconfig/axios';
import checkISAdmin from '@checkadmin/checkAdmin';
import * as XLSX from 'xlsx';

export default function menu() {
    const router = useRouter();

    React.useEffect(() => {
        const check = async() => {
            let checkdata = await checkISAdmin();
            if (!checkdata || checkdata === false) {
                await router.push("/login")
            }
        };
        check();
    }, [])

    const handlerouteClick = (e : any, path : string) => {
        // router.push(path);
    };

    const handleLogout = () => {
        request
            .post("/adminLogout")
            .then((e) => {
                router.push("/login");
            })
            .catch((e) => {
                console.log(e);
            })
    };


    const handleExcelUpload = async(e:any) => {

        const file = e?.target?.files[0];
    if(!file){
        return;
    };
    const data = await file.arrayBuffer();
    const workbook = XLSX.read(data);
    const worksheet = workbook.Sheets[workbook.SheetNames[0]];
    const jsonData = XLSX.utils.sheet_to_json(worksheet, {
        header: 1,
        defval: "",
    });

    //console.log(e.target.files[0]);
    //console.log(workbook);
    console.log(jsonData);
    };


    return (
        <div className="Adminpage">
            <Nav/>
            {
                <div className = "container" >
                <div className = "mt-3 btn-group-vertical d-flex align-content-center align-items-center" role = "group" aria-label = "Basic example">


                <label htmlFor="exampleInputimage1">Upload Menu</label>
                        <input
                            type="file"
                            accept="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel"
                            onChange={(e)=>handleExcelUpload(e)}
                            required/>




                <Link href = "/admin/operatinglocations/viewOperatingLocations" > <button
                type="button"
                onClick={(e) => handlerouteClick(e, "/admin/operatinglocations/viewOperatingLocations")}
                className="text-white bg-gradient-to-r from-teal-400 via-teal-500 to-teal-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-teal-300 dark:focus:ring-teal-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2">View all locations</button> </Link>


                </div>

                <div className = "mt-3 btn-group-vertical d-flex align-content-center align-items-center" role = "group" aria-label = "Basic example"> 
                <button type="button" className="m-5"  onClick={handleLogout} >
                    Sign Out
                </button >
                </div>
                </div>
                }

        </div>

    );
};
