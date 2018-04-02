import React, { Component } from 'react';
import GoogleMapReact from 'google-map-react';

const MapComponent = ({text}) => <div>{text}</div>;

class Map extends Component {

    static defaultProps = {
        center: {lat: 49, lng: 33},
        zoom: 11
    };

    render() {
        console.log(this.props.lon);
        return (
            <div className="google-map" style={{height: '500px'}}>
                <GoogleMapReact defaultCenter={{lat: this.props.lat, lng: this.props.lon}} defaultZoom={this.props.zoom}>
                    <MapComponent
                        lat={this.props.lat}
                        lng={this.props.lon}
                        //text={this.props.temp}
                    />
                </GoogleMapReact>
            </div>
        );
    }
}

export default Map;