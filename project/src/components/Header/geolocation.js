import React, {useEffect, useState} from "react";
import { BiCurrentLocation } from 'react-icons/bi';

const Geolocation = (props) => {
    const [latitude, setLatitude] = useState(null);
    const [longitude, setLongitude] = useState(null);

    let getCords = () => {
        navigator.geolocation.getCurrentPosition(function(position) {
            setLatitude(position.coords.latitude);
            setLongitude(position.coords.longitude);
        });
    }

    useEffect(() => {
        if (latitude && longitude) {
            const data ={
                latitude: latitude,
                longitude: longitude,
            }
            props.retrieveData(data);
        }
    }, [latitude, longitude])

    return(
        <BiCurrentLocation 
        className="location-icon"
        size={30}
        onClick={getCords}
        />
    )
}

export default Geolocation;