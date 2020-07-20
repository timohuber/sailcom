import React from 'react';
import { Map, Marker, GoogleApiWrapper, InfoWindow } from 'google-maps-react';
import mapStyle from './map-styles.js';
import BoatIcon from '../../assets/sailboat.svg';

export class MapContainer extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            boatInfo: props.boatInfo,
        };
        MapContainer.defaultProps = mapStyle;
        console.log(mapStyle.mapStyle)
    }

    render() {
        console.log(this.state.boatInfo);
        return (
            <Map
                google={this.props.google}
                style={{ width: '100%', height: '45%' }}
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
                            {/* <InfoWindow
                                visible={showInfoWindow}
                                style={styles.infoWindow}
                            >
                                <div className={classes.infoWindow}>
                                    <p>
                                        Click on the map or drag the marker to
                                        select location where the incident
                                        occurred
                                    </p>
                                </div>
                            </InfoWindow> */}
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
