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
            listOfCities: ['Kiev']
        }
    }

    addCity() {
        const newCity = this.inputCity.value;
        const newList = [...this.state.listOfCities, newCity];

        if(newCity) {
            this.setState({
                activeCity: this.state.activeCity,
                listOfCities: newList
            });
        }
        this.inputCity.value = '';
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
                            <WeatherContainer key={activeCity} zip={this.state.listOfCities[activeCity]}/>
                        </Col>
                    </Row>
                </Grid>
            </div>
        );
    }
}

export default App;

