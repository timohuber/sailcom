import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { store } from '../../store';
import AvatarDefault from '../../assets/avatar-placeholder.jpg';
import LicenceDefault from '../../assets/pdf.svg';
import { fetchUserData } from '../../store/actions/loginActions';
import Loading from '../../components/GenericLoading';
import { updateUserAction } from '../../store/actions/userActions';

export default function UserDocumentsForm(props) {
    const initialState = {
        ...props.userData,
    };
    delete initialState.avatar;
    delete initialState.licence;

    const [userImageRef, userRestaurantImageRef] = useState(React.createRef());
    const [userData, setUserData] = useState();
    const [formState, setFormState] = useState({});
    const [loading, setLoading] = useState(true);
    const [licenceImageRef, licenceRestaurantImageRef] = useState(
        React.createRef()
    );
    const dispatch = useDispatch();

    const avatarStyle = {
        backgroundImage: props.userData.avatar
            ? `url(${props.userData.avatar})`
            : `url(${AvatarDefault})`,
    };

    const licenceStyle = {
        backgroundImage: `url(${LicenceDefault})`,
        backgroundSize: 'contain',
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'center'
    };

    useEffect(() => {
        if (props.userData) {
            setUserData(props.userData);
            setLoading(false);
        } else {
            dispatch(fetchUserData());
        }
    }, []);

    const onSubmitHandler = (e) => {
        e.preventDefault();
        const form = new FormData();
        const Avatar = document.getElementById('avatar').files[0];
        const Licence = document.getElementById('licence').files[0];

        if (Avatar) {
            form.append('avatar', Avatar);
        }
        if (Licence) {
            form.append('licence', Licence);
        }

        const config = {
            method: 'PATCH',
            headers: new Headers({
                Authorization: `Bearer ${
                    store.getState().currentUser.accessToken
                }`,
            }),
            body: form,
        };
        dispatch(updateUserAction(config));
    };

    const formHandler = () => {
        return (
            <>
                <form
                    id='user-address-form'
                    class='col-1'
                    onSubmit={(e) => onSubmitHandler(e)}
                >
                    <div className='input-container'>
                        <h2>Mein Profilbild</h2>
                        <div className='input-wrapper user-documents-img-btn-wrapper'>
                            <div
                                className='user-document-list-image avatar'
                                style={avatarStyle}
                            />
                            <label htmlFor='avatar' className='btn primary'>
                                Datei auswählen
                            </label>
                            <input
                                type='file'
                                id='avatar'
                                name='avatar'
                                ref={userImageRef}
                                style={{ display: 'none' }}
                            />
                        </div>

                        <h2>Segelausweis</h2>
                        <div className='input-wrapper '>
                            <div className='user-documents-img-btn-wrapper'>
                                <div
                                    className='user-document-list-image'
                                    style={licenceStyle}
                                />
                                <label htmlFor='licence'></label>
                                <label
                                    htmlFor='licence'
                                    className='btn primary'
                                >
                                    Datei auswählen
                                </label>
                                <input
                                    type='file'
                                    id='licence'
                                    name='licence'
                                    ref={licenceImageRef}
                                    style={{ display: 'none' }}
                                />
                            </div>
                            <span id='licence-error' className='error'>
                                Dieses Bild wird benötigt.
                            </span>
                        </div>
                    </div>
                    <div className='button-container'>
                        <button className='btn primary' type='submit'>
                            Speichern
                        </button>
                    </div>
                </form>
            </>
        );
    };
    // TODO: uncomment
    // return loading ? formHandler() : <Loading />;
    return loading ? <Loading /> : formHandler();
}
