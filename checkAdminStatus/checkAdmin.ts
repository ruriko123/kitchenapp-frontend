import request from '../axiosconfig/axios';

const checkISAdmin = async() => {
    console.log("here")
    try {
        let result  =await request.get("/checkAdminLogin");
            return result?.data?.status ||undefined;
    } catch (error) {
        console.log(error)
        return false;
    }

}

export default checkISAdmin