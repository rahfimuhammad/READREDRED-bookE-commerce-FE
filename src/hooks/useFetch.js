import { useState, useEffect } from "react";
import axios from "axios";

axios.defaults.withCredentials = true

export const useGetProducts = (url, dependencies) => {

    const [data, setData] = useState([])
    const [loading, setLoading] = useState(false)

    const fetchData = async () => {
      try {
          setLoading(true)
          let response = await axios.get(url);
          setData(response.data);
          setLoading(false)
        } catch (error) {
          
          console.log(error.message);
      }
  }

    useEffect(() => {
      fetchData();
  }, [url, dependencies]);

  const refetch = () => {
    fetchData()
  }

  return {fetchData, data, loading, refetch}

}

export const useGetBoolean = (url, dependencies ) => {

    const [boolean, setBoolean] = useState(null)
    const [loading, setLoading] = useState(false)

    const checkData = async () => {
      try {
        setLoading(true)
        let response = await axios.get(url);
        setBoolean(response.data);
        setLoading(false)
      } catch (error) {
        console.error(error.message);
      }
  }

    useEffect(() => {
      checkData();
  }, [url, dependencies]);

  const refetch = () => {
    checkData()
  }

  return {boolean, refetch, loading}

}