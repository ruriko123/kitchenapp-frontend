import request from '../axiosconfig/axios';

const checkISAdmin = async() => {

    try {
        let result  =await request.get("/checkAdminLogin");
            return result?.data?.status ||undefined;
    } catch (error) {
        return false;
    }

}

export default checkISAdmin