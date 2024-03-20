import { useState } from "react";
import axios from "axios";
import { toast, Bounce } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

axios.defaults.withCredentials = true

export const useDeleteData = () => {

    const [loading, setLoading] = useState(false)
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

    const deleteData = async (url) => {
      try {
          setLoading(true)
          let response = await axios.delete(url);
          notify(response.data?.message);
          setLoading(false)
        } catch (error) {
          
          console.log(error.message);
      }
  }

  return {deleteData, loading}

}