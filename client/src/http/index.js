import axios from 'axios'

export const host = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
  headers: { 'Content-Type': 'application/json' },
  withCredentials: true
});

export const axiosPrivate = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
  headers: { 'Content-Type': 'application/json' },
  withCredentials: true
});