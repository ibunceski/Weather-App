import React from "react";
import { useState, useEffect } from "react";
import FavoritesSearch from "./favorites-search.js";
import { doc, onSnapshot, updateDoc } from "firebase/firestore";
import { db } from "../../firebase";
import { OPENWEATHER_API_KEY, OPENWEATHER_API_URL } from "../../api.js";
import { RiDeleteBack2Fill } from "react-icons/ri";
const Favorites = (props) => {
  const [favorites, setFavorites] = useState([]);
  const [data, setData] = useState([])
  const { userUID } = props;

  useEffect(() => {
    if (!userUID) return;

    const userRef = doc(db, "users", userUID);
    const unsubscribe = onSnapshot(userRef, (snapshot) => {
      const userData = snapshot.data();
      if (userData && userData.favorites) {
        setFavorites(userData.favorites);
      }
    });

    return () => unsubscribe();
  }, [userUID]);

  let deleteFavorite = async (favorite, idx, event) => {
    event.stopPropagation();
    const userRef = doc(db, "users", userUID);
    const newFavorites = favorites.filter(
      (fav) => fav.label !== favorite.label
    );
    setData((prevData) => ({ ...prevData, [`data${idx}`]: null }));

    const updatedData = { ...data };
    for (let i = idx + 1; i < favorites.length; i++) {
      updatedData[`data${i - 1}`] = data[`data${i}`];
    }

    setData(updatedData);
    await updateDoc(userRef, {
      favorites: newFavorites,
    });
  };

  let addNewFavorite = async (city) => {
    if (favorites.length < 3) {
      const newFavorite = {
        label: city.label,
        city: city.value,
        country: city.country,
        latitude: city.latitude,
        longitude: city.longitude,
      };

      const userRef = doc(db, "users", userUID);

      const existingFavorite = favorites.find(
        (favorite) => favorite.label === newFavorite.label
      );

      if (!existingFavorite) {
        await updateDoc(userRef, {
          favorites: [...favorites, newFavorite],
        });

        fetchWeatherData(newFavorite, favorites.length);
      } else {
        console.log(
          "Favorite with the same label already exists:",
          existingFavorite.label
        );
      }
    } else {
      console.log("You can't add more than 3 favorites.");
    }
  };

  // useEffect(() => {
  //   if (!userUID) return;

  //   const userRef = doc(db, "users", userUID);
  //   const unsubscribe = onSnapshot(userRef, (snapshot) => {
  //     const userData = snapshot.data();
  //     if (userData && userData.favorites) {
  //       setFavorites(userData.favorites);
  //     }
  //   });

  //   return () => unsubscribe();
  // }, [userUID]);

  useEffect(() => {
    if (favorites.length === 0) return;

    const fetchAllWeatherData = async () => {
      try {
        const weatherDataArray = await Promise.all(
          favorites.map((favorite, idx) => fetchWeatherData(favorite, idx))
        );

        setData(weatherDataArray);
      } catch (error) {
        console.log("Error fetching weather data:", error);
      }
    };

    fetchAllWeatherData();
  }, [favorites]);

  // const fetchWeatherData = async (favorite, idx) => {
  //   try {
  //     const response = await fetch(
  //       `${OPENWEATHER_API_URL}/weather?lat=${favorite.latitude}&lon=${favorite.longitude}&appid=${OPENWEATHER_API_KEY}&units=metric`
  //     );
  //     const weatherData = await response.json();
  //     return { [`data${idx}`]: weatherData };
  //   } catch (error) {
  //     console.log("Error fetching weather data for index", idx, ":", error);
  //     return null;
  //   }
  // };

  const fetchWeatherData = (favorite, idx) => {
    return fetch(
      `${OPENWEATHER_API_URL}/weather?lat=${favorite.latitude}&lon=${favorite.longitude}&appid=${OPENWEATHER_API_KEY}&units=metric`
    )
      .then((response) => response.json())
      .then((weatherData) => {
        const dataEntry = { [`data${idx}`]: weatherData };
        return dataEntry;
      })
      .catch((error) => {
        console.log("Error fetching weather data for index", idx, ":", error);
        return null;
      });
  };

  let getSearchValue = (value) => {
    addNewFavorite(value);
    console.log(value);
  };

  let showInfo = (value, event) => {
    props.retrieveData(value)
    event.stopPropagation();
  }

  return (
    <div className="fav2">
      <div className="fav--title--search">
      <h6 className="fav--title">
        Favorite locations
      </h6>
      <FavoritesSearch getData={getSearchValue} favoritesNumber={favorites.length}/>
      </div>
      <div className="favoriteCards">
      {favorites.map(
        (favorite, idx) =>
          data[idx] && (
            <div onClick={(e) => showInfo(favorite, e)} className="fav" key={favorite.label}>
              <div className="favorites--city--description">
                <span className="favorites--city">
                  {data[idx][`data${idx}`].name}, {data[idx][`data${idx}`].sys.country}
                </span>
                <span className="favorites--description">
                  {data[idx][`data${idx}`].weather[0].main}
                </span>
              </div>
              <div className="favorites--temperature--img">
                <span className="favorites--temperature">
                  {Math.round(data[idx][`data${idx}`].main.temp)}°C
                </span>
                <img
                  className="favorites--img"
                  src={`weather-icons/${
                    data[idx][`data${idx}`].weather[0].icon
                  }.png`}
                  alt="Weather Icon"
                />
              </div>
              <div>
                <span className="favorites--feelsLike">
                  Feels like: {Math.round(data[idx][`data${idx}`].main.feels_like)}°C
                </span>
              </div>
              <RiDeleteBack2Fill
                onClick={(e) => deleteFavorite(favorite, idx, e)}
                className="favorites--delete--icon"
              ></RiDeleteBack2Fill>
            </div>
          )
      )}
      </div>
    </div>
  );
};

export default Favorites;
