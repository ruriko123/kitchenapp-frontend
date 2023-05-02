import * as React from 'react';
import {Button} from 'react-bootstrap';
import {useRouter} from 'next/router';
import Link from 'next/link';
import checkISAdmin from '../../checkAdminStatus/checkAdmin';
import request from '../../axiosconfig/axios';
import Nav from '../../Components/nav';


export default function Restaurant() {
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
        <div className="restaurant">
            <Nav/>
            {
                <div className = "container" >
                    <div className = "mt-3 btn-group-vertical d-flex align-content-center align-items-center" role = "group" aria-label = "Basic example"> <Link href="/outlet/addOutlet">
                <button
                    type="button"
                    onClick={(e) => handlerouteClick(e, "/outlet/addOutlet")}
                    className="btn btn-danger m-1">Add Restaurant</button>

            </Link> <Link href = "/outlet/updateOutlet" > <button
                type="button"
                onClick={(e) => handlerouteClick(e, "/outlet/updateOutlet")}
                className="py-2.5 px-5 mr-2 mb-2 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700">View all Restaurants</button> </Link>

            <Link href = "/outlet/menu" > <button
                type="button"
                onClick={(e) => handlerouteClick(e, "/outlet/menu")}
                className="py-2.5 px-5 mr-2 mb-2 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700">Menu</button> </Link>
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
