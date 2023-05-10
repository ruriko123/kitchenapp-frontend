import * as React from 'react';
import {Button} from 'react-bootstrap';
import {useRouter} from 'next/router';
import Link from 'next/link';
import checkISAdmin from '../../checkAdminStatus/checkAdmin';
import request from '../../axiosconfig/axios';
import Nav from '../../Components/nav';




export default function Profile() {
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
        <div className="profile">
           

            {
                <div className = "container" > <div
                className="m-2 btn-group-vertical d-flex align-content-center align-items-center"
                role="group"
                aria-label="Basic example">
                <Link href="/admin">
                    <button
                        type="button"
                        onClick={(e) => handlerouteClick(e, "/admin")}
                        className="text-gray-900 bg-gradient-to-r from-lime-200 via-lime-400 to-lime-500 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-lime-300 dark:focus:ring-lime-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2">Admin</button>
                </Link>
                <Link href="/restaurant">
                    <button
                        type="button"
                        onClick={(e) => handlerouteClick(e, "/restaurant")}
                        className="focus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900">Restaurant</button>
                </Link>
                <Link href="/thirdparty">
                    <button
                        type="button"
                        onClick={(e) => handlerouteClick(e, "/thirdparty")}
                        className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800">ThirdParty</button>
                </Link>

                <Link href="/notifications/massnotification">
                    <button
                        type="button"
                        onClick={(e) => handlerouteClick(e, "/notifications/massnotification")}
                        className="focus:outline-none text-white bg-purple-700 hover:bg-purple-800 focus:ring-4 focus:ring-purple-300 font-medium rounded-lg text-sm px-5 py-2.5 mb-2 dark:bg-purple-600 dark:hover:bg-purple-700 dark:focus:ring-purple-900">Mass Notification</button>
                </Link>
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
