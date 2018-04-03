import React, { Component } from 'react';
import Map from './Map';

class WeatherContainer extends Component {
    constructor(props) {
        super(props);
        this.state = {
            weatherData: null
        }
    }

    componentDidMount() {
        this.reloadData();
    }

    reloadData() {
        const zip = this.props.zip;
        const URL = 'http://api.openweathermap.org/data/2.5/weather?q=' + zip + '&appid=bc1e15fa138b3c3e13ae8b561ca80f72';
        fetch(URL).then(res => res.json()).then(json => {
            this.setState({weatherData: json});
        });
    }

    render(){
        const weatherData = this.state.weatherData;
        if(!weatherData) return <div>Loading...</div>;
        else if (weatherData.cod !== 200) {
            return <div>None data</div>
        }
        else {
            const weather = weatherData.weather[0];
            const iconUrl = 'http://openweathermap.org/img/w/' + weather.icon + '.png';
            return(
                <div>
                    <h1>
                        {weather.main} in {weatherData.name}
                        <img src={iconUrl} alt={weatherData.description}/>
                    </h1>
                    <p>Current: {Math.floor(weatherData.main.temp-273.15)+'°C'}</p>
                    <p>High: {Math.floor(weatherData.main.temp_max-273.15)+'°C'}</p>
                    <p>Low: {Math.floor(weatherData.main.temp_min-273.15)+'°C'}</p>
                    <p>Wind speed: {weatherData.wind.speed + 'm/s'}</p>
                    <Map lat={weatherData.coord.lat} lon={weatherData.coord.lon} temp={weatherData.main.temp}/>
                </div>
            );
        }
    }
}

export default WeatherContainer;