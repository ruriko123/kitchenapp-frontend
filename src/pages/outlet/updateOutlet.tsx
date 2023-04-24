import React, {useState, useEffect} from 'react';
import {signIn, getProviders, useSession, getSession, signOut} from "next-auth/react";
import {useRouter} from 'next/router';
import {getToken} from "next-auth/jwt";
import ScrollToTop from "react-scroll-to-top";


export default function updateOutlet() {

    const router = useRouter();
    const {data: session, status} = useSession();

    useEffect(() => {

        if (status === "unauthenticated") {
            router.push("/login");
        };
        if (!Boolean(session)) {
            router.push('/login');
        };
    }, []);

    const [Username,
        setUsername] = useState("");
    const [Password,
        setPassword] = useState("");

    const handleUsername = (e : any) => {
        setUsername(e.target
            ?.value);
    };
    const handlePassword = (e : any) => {
        setPassword(e.target
            ?.value);
    };

    const handleLogin = async(e : any) => {
        e.preventDefault();
        await signIn("credentials", {
            redirect: true,
            username: Username,
            password: Password
        });
    };

    return (
        <div className="app">
            <ScrollToTop />
            <div className="container">
                <p className="heading">Admin Login</p>
                <div className="box">
                    <p>Username</p>
                    <div>
                        <input
                            required
                            onChange={handleUsername}
                            className='form-control'
                            type="text"
                            autoComplete="on"
                            placeholder="Enter your Username"/>
                    </div>
                </div>
                <div className="box">
                    <p>Password</p>
                    <div>
                        <input
                            required
                            onChange={handlePassword}
                            className='form-control'
                            type="text"
                            autoComplete="on"
                            placeholder="Enter your password"/>
                    </div>
                </div>
                <button onClick={handleLogin} className="loginBtn form-control">Login</button>
            </div>

        </div>

    )
}

export async function getServerSideProps(context : any) {
    const {query, req, res} = context;
    var error = ''
    if (Boolean(query.error)) {
        error = query.error
    }

    try {
        const secret = process.env.NEXTAUTH_SECRET
        const token = await getToken({req, secret})

        return {
            props: {
                providers: await getProviders(),
                loginError: error
            }
        };
    } catch (e) {
        return {
            props: {
                providers: await getProviders(),
                loginError: error
            }
        };
    }

}