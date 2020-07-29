import React from 'react';
import { Map, Marker, GoogleApiWrapper, InfoWindow } from 'google-maps-react';
import { Link } from 'react-router-dom';
import mapStyle from './map-styles.js';
import BoatIcon from '../../assets/sailboat-map.svg';
import { BrowserRouter } from 'react-router-dom';

export class MapContainer extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            showingInfoWindow: false,
            activeMarker: {},
            selectedPlace: {},
        };
    }

    onMarkerClick = (props, marker, e) => {
        this.setState({
            selectedPlace: props,
            activeMarker: marker,
            showingInfoWindow: true,
        });
    };

    onMapClicked = (props) => {
        if (this.state.showingInfoWindow) {
            this.setState({
                showingInfoWindow: false,
                activeMarker: null,
            });
        }
    };

    render() {

        return (
            <Map
                google={this.props.google}
                onClick={this.onMapClicked}
                style={{ width: '100%', height: '100%' }}
                styles={mapStyle.mapStyle}
                className={'map'}
                zoom={7}
                initialCenter={{
                    lat: 46.822398674887474,
                    lng: 8.224210049999993,
                }}
            >
                {this.props.boatOverview.map((boat) => {
                    const latitude = boat.mooring.latitude;
                    const longitude = boat.mooring.longitude;
                    return (
                        <Marker
                            onClick={this.onMarkerClick}
                            key={boat.id}
                            title={boat.description}
                            name={boat.title}
                            pier={boat.mooring.address}
                            boat_id={boat.id}
                            position={{
                                lat: latitude,
                                lng: longitude,
                            }}
                            icon={{
                                url: `${BoatIcon}`,
                                anchor: new window.google.maps.Point(16, 16),
                                scaledSize: new window.google.maps.Size(32, 32),
                            }}
                        ></Marker>
                    );
                })}
                <InfoWindow
                    marker={this.state.activeMarker}
                    visible={this.state.showingInfoWindow}
                >
                    <div>
                        <h3>{this.state.selectedPlace.name}</h3>
                        <p>{this.state.selectedPlace.pier}</p>
                        <BrowserRouter>
                            <Link
                                to={`/boot/${this.state.selectedPlace.boat_id}`}
                            >
                                Anschauen
                            </Link>
                        </BrowserRouter>
                    </div>
                </InfoWindow>
            </Map>
        );
    }
}

export default GoogleApiWrapper({
    apiKey: 'AIzaSyAUsuOTrYn3EnR53GxcUBZT2GpSaAD6dfQ',
})(MapContainer);
