import React from 'react';
import Link from 'next/link';
import request from '../axiosconfig/axios';
import {useRouter} from 'next/router';

function Nav() {
    const router = useRouter();
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

        <div className="fixed-top navbar navbar-default d-flex justify-content-end ">
            <div className="profile">

                <Link href="/profile">
                    <button
                        type="button"
                        className="py-2.5 px-5 mr-2 mb-2 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-full border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700">
                        Home
                    </button >
                </Link>
            </div>
            <div className="logout">

                <button
                    type="button"
                    onClick={handleLogout}
                    className="text-white bg-gradient-to-r from-pink-400 via-pink-500 to-pink-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-pink-300 dark:focus:ring-pink-800 shadow-lg shadow-pink-500/50 dark:shadow-lg dark:shadow-pink-800/80 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2">Logout</button>
            </div>

        </div>

    )
}

export default Nav