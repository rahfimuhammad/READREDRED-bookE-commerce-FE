import { useState } from "react";
import axios from "axios";
import { toast, Bounce } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

axios.defaults.withCredentials = true

export const usePostData = () => {

    const [loading, setLoading] = useState(false)
    const [response, setResponse] = useState()
    const notify = (message) => toast.success(message, {
        position: "top-center",
        autoClose: 1000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
        transition: Bounce,
        });

    const postData = async (url, data) => {
      try {
          setLoading(true)
          let response = await axios.post(url, data);
          setResponse(response?.data)
          notify(response.data?.message);
          setLoading(false)
        } catch (error) {
          
          console.log(error.message);
      }
      setLoading(false)
  }

  return {postData, response, loading}

}