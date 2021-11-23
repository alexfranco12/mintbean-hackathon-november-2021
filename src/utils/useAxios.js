import { useState, useEffect } from 'react';
import axios from 'axios';

const { NODE_ENV, REACT_APP_BACKEND, REACT_APP_HEROKU_BACKEND } = process.env;
axios.defaults.baseURL = (
  NODE_ENV === "development" 
    ? REACT_APP_BACKEND : REACT_APP_HEROKU_BACKEND
)

const useAxios = ( params ) => {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const fetchData = async ( params ) => {
    setLoading(true)
    try {
      const res = await axios.request(params);
      setData(res.data);
      setError(null);
    } catch (err) {
      setError(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData(params);
  }, []);

  return { data, error, loading };
};

export default useAxios;