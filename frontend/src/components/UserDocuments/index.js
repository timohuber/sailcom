import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { store } from '../../store';
import AvatarDefault from '../../assets/avatar-placeholder.jpg';
import LicenceDefault from '../../assets/pdf.svg';
import { fetchUserData } from '../../store/actions/loginActions';
import Loading from '../../components/GenericLoading';
import { updateUserAction } from '../../store/actions/userActions';
import {NavLink} from "react-router-dom";

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
        const avatar = document.getElementById('avatar').files[0];
        const licence = document.getElementById('licence').files[0];

        if (avatar) {
            form.append('avatar', avatar);
            console.log(avatar)
        }
        if (licence) {
            form.append('licence', licence);
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
        dispatch(updateUserAction(form));
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
                                Foto hochladen
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
                                {props.userData.licence
                                ? <a
                                    className=' document pdf'
                                    href={props.userData.licence ? props.userData.licence : null}
                                    target='_blank'>Ihr Segelausweis</a>
                                : <p className='error'>Noch kein Segelausweis hochgeladen</p>
                                }
                                <label htmlFor='licence'></label>
                                <label
                                    htmlFor='licence'
                                    className='btn primary'
                                >
                                    Ausweis hochladen
                                </label>
                                <input
                                    type='file'
                                    id='licence'
                                    name='licence'
                                    ref={licenceImageRef}
                                    style={{ display: 'none' }}
                                />
                            </div>
                            <span id='licence-error' className='error' />

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
