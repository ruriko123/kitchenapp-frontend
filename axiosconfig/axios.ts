import axios from 'axios'

const request = axios.create({
  baseURL:   process.env.NEXT_PUBLIC_API_BACKENDURL ||"test",
  timeout: 20000,
  withCredentials: true,
});




export default request
