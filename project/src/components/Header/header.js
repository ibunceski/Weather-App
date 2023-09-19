import React from "react";
import { AiOutlineCloud } from 'react-icons/ai';
import Search from "./search";
import Geolocation from "./geolocation";

const Header = (props) => {
    return(
        <div className="header">
            <div className="header--logo">
                <AiOutlineCloud className="cloud--icon" size={50}/>
                {/* <h1>Oblache.mk</h1> */}
                <h1 className="header--title">WeatherApp</h1>
            </div>
            <div className="search--icon">
                <Geolocation retrieveData={props.retrieveData}/>
                {props.userUID && <Search retrieveData={props.retrieveData} userUID={props.userUID}/>}
            </div>
        </div>
    )

}

export default Header;