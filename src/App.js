import React, { Component } from 'react';
import WeatherContainer from './WeatherContainer';
//import 'bootstrap/dist/css/bootstrap.css';
import 'bootswatch/dist/lux/bootstrap.css'
import { Navbar, NavItem, Nav, Grid, Row, Col, FormGroup, ControlLabel, FormControl, Button } from 'react-bootstrap';
import './App.css';

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            activeCity: 0,
            listOfCities: [],
            dataBaseWeather: []
        }
    }

    reloadData() {
        let response;
        let newDB = [];

        for (let i = 0; i < this.state.dataBaseWeather.length; i++) {
            fetch('http://api.openweathermap.org/data/2.5/weather?q=' + this.state.listOfCities[i] + '&appid=bc1e15fa138b3c3e13ae8b561ca80f72').then(res => res.json()).then(json => {
                response = json;
                newDB = this.state.dataBaseWeather;
                newDB[i] = response;
                if(response.cod === 200) {
                    this.setState({
                        activeCity: this.state.activeCity,
                        listOfCities: this.state.listOfCities,
                        dataBaseWeather: newDB
                    });
                }
                console.log(this.state);
            });
        }
    }

    componentDidMount() {
        setInterval(this.reloadData.bind(this), 10000);
    }

    addCity() {
        const newCity = this.inputCity.value;
        const newList = [...this.state.listOfCities, newCity];
        let response;
        let newDB = [];

        fetch('http://api.openweathermap.org/data/2.5/weather?q=' + newCity + '&appid=bc1e15fa138b3c3e13ae8b561ca80f72').then(res => res.json()).then(json => {
            response = json;
            if(newCity && this.state.listOfCities.indexOf(newCity) === -1 && response.cod === 200) {

                newDB = [...this.state.dataBaseWeather, json];
                this.setState({
                    activeCity: this.state.activeCity,
                    listOfCities: newList,
                    dataBaseWeather: newDB
                });
            }
            this.inputCity.value = '';
        });
    }

    deleteCity(index) {
        const newList = this.state.listOfCities;
        this.setState({
            activeCity: this.state.activeCity,
            listOfCities: [...newList.slice(0, index), ...newList.slice(index+1)]
        });
    }

    saveState() {
        localStorage.listOfCities = JSON.stringify(this.state.listOfCities);
    }

    loadState() {
        if (typeof localStorage.listOfCities === 'undefined') {
            localStorage.listOfCities = '[]';
        }
        this.setState({
            activeCity: this.state.activeCity,
            listOfCities: JSON.parse(localStorage.listOfCities)
        })
    }

    render() {
        const activeCity = this.state.activeCity;
        return (
            <div className="App">
                <Navbar>
                    <Navbar.Header>
                        <Navbar.Brand>
                            Weather App
                        </Navbar.Brand>
                    </Navbar.Header>
                </Navbar>
                <form>
                    <FormGroup>
                        <ControlLabel>
                            Add city
                        </ControlLabel>
                        <FormControl type="text" placeholder="Enter the city" inputRef={(input) => this.inputCity = input}>
                        </FormControl>
                        <Button bsStyle="primary" onClick={this.addCity.bind(this)}>ADD</Button>
                        <Button bsSize="small" onClick={this.saveState.bind(this)}>SAVE</Button>
                        <Button bsSize="small" onClick={this.loadState.bind(this)}>LOAD</Button>
                    </FormGroup>
                </form>
                <Grid>
                    <Row>
                        <Col lg={4} md={2} sm={4}>
                            <h3>Select a city</h3>
                            <Nav
                                bsStyle="pills"
                                stacked
                                activeKey={activeCity}
                                style={{display: 'block'}}
                                onSelect={index => {
                                    this.setState({activeCity: index});
                                }}>
                                {this.state.listOfCities.map((city, index) => (
                                    <NavItem key={index} eventKey={index}>{city}
                                        <Button className="delete-btn" bsSize="small" key={index} ref={(button) => this.button = button} onClick={this.deleteCity.bind(this, index)}>
                                            DELETE
                                        </Button>
                                    </NavItem>
                                ))}
                            </Nav>
                        </Col>
                        <Col md={8} sm={8} className="weather-bar">
                            <WeatherContainer key={activeCity} zip={this.state.dataBaseWeather[activeCity]}/>
                        </Col>
                    </Row>
                </Grid>
            </div>
        );
    }
}

export default App;

