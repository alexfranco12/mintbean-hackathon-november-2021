import { useState, useEffect } from 'react';
import axios from 'axios';

const { REACT_APP_ENV, REACT_APP_BACKEND, REACT_APP_HEROKU_BACKEND } = process.env;
axios.defaults.baseURL = (
  REACT_APP_ENV === "development" 
    ? REACT_APP_BACKEND : REACT_APP_HEROKU_BACKEND
)

const useAxios = ( config ) => {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const fetchData = async ( config, source, isMounted ) => {
    setLoading(true)
    
    try {
      const res = await axios.request({
        cancelToken: source.token,
        ...config
      });
      if (isMounted) {
        setData(res.data)
        setError(null)
      }
    } catch (err) {
      if (isMounted) {
        setError(err);
        setData([])
      }
    } finally {
      isMounted && setLoading(false);
    }
  };

  useEffect(() => {
    const source = axios.CancelToken.source();
    let isMounted = true;

    fetchData(config, source, isMounted);

    const cleanUp = () => {
      isMounted = false;
      source.cancel();
    }

    return cleanUp;

  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return { data, error, loading };
};

export default useAxios;