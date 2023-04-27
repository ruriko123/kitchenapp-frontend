import * as React from 'react';
import {Button} from 'react-bootstrap';
import {useRouter} from 'next/router';
import Link from 'next/link';
import checkISAdmin from '../../checkAdminStatus/checkAdmin';
import request from '../../axiosconfig/axios';
import Nav from '../../Components/nav';



export default function operatingLocations() {
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
    }

    return (
        <div className="Adminpage">
<Nav/>
            {
                <div className = "container" >
                <div className = "mt-3 btn-group-vertical d-flex align-content-center align-items-center" role = "group" aria-label = "Basic example">
                <Link href = "/admin/operatinglocations/addOperatingLocations" > <button
                type="button"
                onClick={(e) => handlerouteClick(e, "/admin/operatinglocations/addOperatingLocations")}
                className="text-white bg-gradient-to-r from-green-400 via-green-500 to-green-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-green-300 dark:focus:ring-green-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2">Add Locations</button> </Link>


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
