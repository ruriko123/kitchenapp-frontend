import * as React from 'react';
import Button from 'react-bootstrap/Button';
import {useSession} from "next-auth/react";
import {getSession, signOut} from "next-auth/react"
import {useRouter} from 'next/router';

export default function SignOut() {
    const router = useRouter();
    const {data: session, status} = useSession();

    React.useEffect(() => {
        if (status === "authenticated") {
            signOut({redirect: false});
        } else if (status === "unauthenticated") {
            router.push("/login");
        }
    }, [status])
    const handleSignOut = async(e : any) => {

        await signOut();

        router.push('/')
    }
    return (
        <div className="singout">
            <Button onClick={handleSignOut}>
                Sign Out
            </Button>
        </div>
    );
}