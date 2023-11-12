import { $host } from "./index";

export const getAllPersons = async() => {
  const { data } = await $host.get('api/persons'); 
  return data;
}