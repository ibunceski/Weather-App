import React, { useState, useEffect } from "react";
import Favorites from "./components/Main/favorites";
import WeatherData from "./components/Main/weatherdata";
import Header from "./components/Header/header";
import { OPENWEATHER_API_URL, OPENWEATHER_API_KEY } from "./api";
import { addDoc, collection, getDocs, getDoc } from "firebase/firestore";
import { onSnapshot } from "firebase/firestore";
import { users, db } from "./firebase";
import { query, where } from "firebase/firestore";
import { getAuth, signInAnonymously, onAuthStateChanged } from "firebase/auth";
import LoadingScreen from "./components/loading-screen";

const App = () => {
  const [weatherData, setWeatherData] = useState(null);
  const [forecastData, setForecastData] = useState(null);
  const [userUID, setUserUID] = useState(null);
  const [localUsers, setLocalUsers] = useState([]);

  const [FirebaseID, setFirebaseID] = useState(null);

  let addNewUser = async (userUID) => {
    console.log("User UID:", userUID);
    if (userUID) {
      const usersCollectionRef = collection(db, "users");

      const q = query(usersCollectionRef, where("uid", "==", userUID));

      const existingDocs = await getDocs(q);

      if (existingDocs.docs.length === 0) {
        const newUser = {
          uid: userUID,
          favorites: [],
          searchHistory: [],
        };
        const newUserRef = await addDoc(usersCollectionRef, newUser);
        setLocalUsers([...localUsers, newUser]);
        setFirebaseID(newUserRef.id);
        console.log("New user added:", newUserRef.id);
      } else {
        setFirebaseID(existingDocs.docs[0].id);
        console.log("User with the same UID already exists.", existingDocs.docs[0].id);
      }
    }
  };

  useEffect(() => {
    const auth = getAuth();

    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUserUID(user.uid);
        addNewUser(user.uid);
      } else {
        console.log("User is signed out");
      }
    });

    signInAnonymously(auth)
      .then(() => {})
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorCode, errorMessage);
      });

    return () => {
      unsubscribe();
    };
  }, []);

  useEffect(() => {
    const unsubscribe = onSnapshot(users, (snapshot) => {
      const newUsers = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setLocalUsers(newUsers);
    });
    return () => unsubscribe();
  }, []);

  const retrieveData = (data) => {
    getWeatherInfo(data);
    getForecastInfo(data);
  };

  const getWeatherInfo = ({ latitude, longitude }) => {
    fetch(
      `${OPENWEATHER_API_URL}/weather?lat=${latitude}&lon=${longitude}&appid=${OPENWEATHER_API_KEY}&units=metric`
    )
      .then((response) => response.json())
      .then((data) => setWeatherData(data))
      .catch((error) => console.log(error));
  };

  const getForecastInfo = ({ latitude, longitude }) => {
    const { timeZone } = Intl.DateTimeFormat().resolvedOptions();
    fetch(
      `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&daily=weathercode,temperature_2m_max,temperature_2m_min,precipitation_sum&timezone=${timeZone}`
    )
      .then((response) => response.json())
      .then((data) => setForecastData(data))
      .catch((error) => console.log(error));
  };

  return (
    <div className="app">
      {FirebaseID==null &&<LoadingScreen />}
      {FirebaseID && <Header retrieveData={retrieveData} userUID={FirebaseID} />}
      <div className="main">
        {FirebaseID && <Favorites retrieveData={retrieveData} userUID={FirebaseID} />}
        {weatherData && forecastData && (
          <WeatherData key={weatherData.name} data={weatherData} forecastData={forecastData} />
          // <WeatherData data={weatherData} forecastData={forecastData} />
        )}
      </div>
    </div>
  );
};
export default App;
