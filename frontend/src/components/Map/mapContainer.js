import React from 'react';
import { Map, Marker, GoogleApiWrapper, InfoWindow } from 'google-maps-react';
import { NavLink, Link } from 'react-router-dom';
import mapStyle from './map-styles.js';
import BoatIcon from '../../assets/sailboat-map.svg';
import { siteUrl } from '../../store/constants';

export class MapContainer extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            boatOverview: props.boatOverview,
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
                zoom={8}
                initialCenter={{
                    lat: 46.822398674887474,
                    lng: 8.224210049999993,
                }}
            >
                {this.state.boatOverview.map((boat, i) => {
                    const latitude = boat.mooring.latitude;
                    const longitude = boat.mooring.longitude;
                    return (
                        <Marker
                            onClick={this.onMarkerClick}
                            key={i}
                            title={boat.description}
                            name={boat.title}
                            pier={boat.mooring.address}
                            boat_id={1}
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
                        <h2>{this.state.selectedPlace.name}</h2>
                        <p>{this.state.selectedPlace.pier}</p>
                        <a>Anschauen</a>
                        {/* to={`${siteUrl}${this.state.selectedPlace.boat_id}`} */}
                        {/* //https://stackoverflow.com/questions/42183312/render-react-router-link-inside-google-infowindow */}
                    </div>
                </InfoWindow>
            </Map>
        );
    }
}

export default GoogleApiWrapper({
    apiKey: 'AIzaSyAUsuOTrYn3EnR53GxcUBZT2GpSaAD6dfQ',
})(MapContainer);
