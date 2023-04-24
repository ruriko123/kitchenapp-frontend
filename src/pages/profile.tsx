import * as React from 'react';
import {Button} from 'react-bootstrap';
import {useRouter} from 'next/router';
import Link from 'next/link';
import checkISAdmin from '../../checkAdminStatus/checkAdmin';





export default function Profile() {
    const router = useRouter();

    React.useEffect(() => {
        const check = async ()=>{
            let checkdata = await checkISAdmin();
            if (!checkdata || checkdata===false){
                await router.push("/login")
            }
        };
        check();
    }, [])
    

   
    const handlerouteClick = (e:any, path:string) => {
        // router.push(path);
      };



    return (
        <div className="container">

            {<div className="signout">
    
<div className="m-2 btn-group-vertical d-flex align-content-center align-items-center" role="group" aria-label="Basic example">
    <Link href="/thirdparty/addThirdparty">
  <button type="button" onClick={(e) => handlerouteClick(e, "/thirdparty/addThirdparty")} className="btn btn-warning m-1">Add third party</button>
    </Link>
    <Link href="/thirdparty/viewThirdparties">
  <button type="button" onClick={(e) => handlerouteClick(e, "/thirdparty/viewThirdparties")} className="btn btn-success m-1">View all third party</button>
  </Link>
  
</div>
<div className="mt-3 btn-group-vertical d-flex align-content-center align-items-center" role="group" aria-label="Basic example">
  <button type="button" onClick={(e) => handlerouteClick(e, "/outlet/updateOutlet")} className="btn btn-secondary m-1">Verify Outlets</button>
  <button type="button" onClick={(e) => handlerouteClick(e, "/outlet/viewOutlets")} className="btn btn-danger m-1">View Outlets</button>
                <Button className="m-5"  >
                    Sign Out
                </Button>
</div>

            </div>
}

        </div>

    );
};
