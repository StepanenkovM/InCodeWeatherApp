import React, { Component } from 'react';
import Map from './Map';

class WeatherContainer extends Component {

    render(){
        const weatherData = this.props.zip;
        if (this.props.zip && this.props.zip.weather && this.props.zip.main && this.props.zip.coord) {
            if (this.props.zip.wind) {
                const weather = weatherData.weather[0];
                const iconURL = 'http://openweathermap.org/img/w/' + weather.icon + '.png';
                return (
                    <div>
                        <h1>
                            {weather.main} in {weatherData.name}
                            <img src={iconURL}/>
                        </h1>
                        <p>Current: {Math.floor(weatherData.main.temp-273.15)+'C'}</p>
                        <p>High: {Math.floor(weatherData.main.temp_max-273.15)+'C'}</p>
                        <p>Low: {Math.floor(weatherData.main.temp_min-273.15)+'C'}</p>
                        <p>Wind: {Math.floor(weatherData.wind.speed)+'m/s'}</p>
                        <Map lat={weatherData.coord.lat} lon={weatherData.coord.lon}/>
                    </div>
                );
            }
        }
        else {
            return (
                <h1>None City</h1>
            );
        }
    }
}

export default WeatherContainer;