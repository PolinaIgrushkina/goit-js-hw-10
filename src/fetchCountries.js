const BASE_URL = "https://restcountries.com/v3.1/name/";
const params = "?fields=name,capital,population,flags,languages"; 

export const fetchCountries = (name) => {
  return fetch(BASE_URL + name + params)
    .then((response) => {
    if (response.ok) {
      return response.json();
    }
    throw new Error(response.statusText);
  });
};
