  
export const OPENWEATHER_API_URL = "https://api.openweathermap.org/data/2.5";
export const OPENWEATHER_API_KEY = "3c64eb383fa044f86c68136c1dcdc596";


// export const GEODB_API_URL = "https://wft-geo-db.p.rapidapi.com/v1/geo/cities";
export const GEODB_API_URL = "https://wft-geo-db.p.rapidapi.com/v1/geo/cities?sort=-population";
export const GEODB_API_OPTIONS = {
    method: "GET",
    headers: {
      "X-RapidAPI-Key": "5d4e3c60b2mshf8665cde0136266p15698ejsn79d8687f2397",
      "X-RapidAPI-Host": "wft-geo-db.p.rapidapi.com",
    },
  };