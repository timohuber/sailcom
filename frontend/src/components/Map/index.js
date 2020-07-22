import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { connect, useDispatch } from 'react-redux';
import Maps from '../../components/Map/mapContainer';
import Loading from '../../components/GenericLoading';
import { getBoatOverviewAction } from '../../store/actions/boatActions';

const GoogleMap = (props) => {
    const dispatch = useDispatch();
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (props.boatOverview) {
            setLoading(false);
        } else {
            dispatch(getBoatOverviewAction());
        }
    }, [props.boatOverview]);

    const mapHandler = (props) => {
        return (
            <>
                <Maps boatOverview={props.boatOverview} />;
            </>
        );
    };

    return loading ? <Loading /> : mapHandler(props);
};

const mapStateToProps = (state) => {
    return {
        boatOverview: state.boats.boatOverview,
    };
};
const connection = connect(mapStateToProps);
const ConnectedGoogleMap = connection(GoogleMap);

export default ConnectedGoogleMap;
