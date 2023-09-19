import React from 'react';
import { Bars, RotatingLines, ColorRing } from 'react-loader-spinner';

const LoadingScreen = (props) => {

    return (
        <div className="loading--screen">
            <Bars
            color="#6D98AB"
            height={100}
            width={100}
            />
        </div>
    )
}

export default LoadingScreen;