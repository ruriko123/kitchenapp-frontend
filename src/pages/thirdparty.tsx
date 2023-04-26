import * as React from 'react';
import {Button} from 'react-bootstrap';
import {useRouter} from 'next/router';
import Link from 'next/link';
import checkISAdmin from '../../checkAdminStatus/checkAdmin';
import request from '../../axiosconfig/axios';
import Nav from '../../Components/nav';

export default function thirdParty() {
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
        <div className="thirdparty">
<Nav/>
            {
                <div className = "container" > <div
                className="m-2 btn-group-vertical d-flex align-content-center align-items-center"
                role="group"
                aria-label="Basic example">
                <Link href="/thirdparty/addThirdparty">
                    <button
                        type="button"
                        onClick={(e) => handlerouteClick(e, "/thirdparty/addThirdparty")}
                        className="btn btn-warning m-1">Add third party</button>
                </Link>
                <Link href="/thirdparty/viewThirdparties">
                    <button
                        type="button"
                        onClick={(e) => handlerouteClick(e, "/thirdparty/viewThirdparties")}
                        className="btn btn-success m-1">View all third party</button>
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
