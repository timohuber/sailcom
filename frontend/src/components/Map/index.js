import React from 'react';
import { Map, Marker, GoogleApiWrapper, InfoWindow } from 'google-maps-react';
import mapStyle from './map-styles.js';
import BoatIcon from '../../assets/sailboat.svg';

export class MapContainer extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            boatInfo: props.boatInfo,
            showingInfoWindow: false,
            // activeMarker: {},
            // selectedPlace: {},
        };
    }

    render() {
        // console.log(this.state.boatInfo);
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
                {this.state.boatInfo.map((boat, i) => {
                    const latitude = boat.mooring.latitude;
                    const longitude = boat.mooring.longitude;
                    return (
                        <Marker
                            onClick={this.onMarkerClick}
                            key={i}
                            title={boat.title}
                            name={'no name'}
                            position={{
                                lat: latitude,
                                lng: longitude,
                            }}
                            icon={
                                {
                                    // url: `url(${BoatIcon})`,
                                    // anchor: new google.maps.Point(32, 32),
                                    // scaledSize: new google.maps.Size(64, 64),
                                }
                            }
                        >
                            
                            <InfoWindow
                                marker={this.state.activeMarker}
                                visible={this.state.showingInfoWindow}
                            >
                                <div>
                                    <h2>{boat.title}</h2>
                                </div>
                            </InfoWindow>
                        </Marker>
                    );
                })}
            </Map>
        );
    }
}

export default GoogleApiWrapper({
    apiKey: 'AIzaSyAUsuOTrYn3EnR53GxcUBZT2GpSaAD6dfQ',
    // language: props.language,
})(MapContainer);
