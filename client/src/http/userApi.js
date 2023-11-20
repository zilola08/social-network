import { host } from "./index";
import { jwtDecode } from "jwt-decode";

export const registration = async (email,password, firstName, lastName, username) => {
  const response = await host.post('api/user/registration',{ email,password,firstName,lastName,username },{
    headers: { 'Content-Type': 'application/json' },
    withCredentials: true
  }); 
  return response;
}

export const login = async (username,password) => {
  const { data } = await host.post('api/user/login',{ username,password },{
    headers: { 'Content-Type': 'application/json' },
    withCredentials: true
  });
  return data.accessToken;
}

export const logout = async () => {
  const response = await host.get('api/user/logout');
  return response;
}

export const check = async () => {
  const { data } = await host.get('api/user/auth');
  return jwtDecode(data);
}