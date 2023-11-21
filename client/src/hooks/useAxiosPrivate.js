import {axiosPrivate} from '../http/index';
import { useEffect, useContext } from 'react';
import { Context } from '../main';
import useRefreshToken from './useRefreshToken';

const useAxiosPrivate = () => {

  const { user } = useContext(Context);
  const refresh = useRefreshToken();
    
  useEffect(() => {
  const requestIntercept =
    axiosPrivate.interceptors.request.use(
      config => {
          if (!config.headers['Authorization']) {
              config.headers['Authorization'] = `Bearer ${user?.accessToken}`;
          }
          return config;
      }, (error) => Promise.reject(error)
    );

  const responseIntercept =
    axiosPrivate.interceptors.response.use(
        response => response,
        async (error) => {
          const prevRequest = error?.config;
          //here we set custom property .sent so that if this request also fails with 403, and keep failing with 403, we dont fall into infinite loop. With this property, we will try this code only once, then we catch the error.
            if (error?.response?.status === 403 && !prevRequest?.sent) {
                prevRequest.sent = true;
                const newAccessToken = await refresh();
                prevRequest.headers['Authorization'] = `Bearer ${newAccessToken}`;
                return axiosPrivate(prevRequest);
            }
            return Promise.reject(error);
        }
    );

    return () => {
      axiosPrivate.interceptors.request.eject(requestIntercept);
      axiosPrivate.interceptors.response.eject(responseIntercept);
}

  },[])
  
  return axiosPrivate;
};

export default useAxiosPrivate;