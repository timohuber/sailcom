import React from 'react';
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';
import {useDispatch} from "react-redux";
import {fetchUserData} from "./store/actions/loginActions";

import './css/main.css';

// components
import Header from './components/Header';

// pages
import Intro from './pages/intro';
import Home from './pages/home';
import Login from './pages/login';
import RegistrationPage from './pages/register';
import BoatsListPage from './pages/boatslistpage';
import VerificationPage from './pages/verification';
import MyProfilePage from './pages/my-profile';
import BoatDetailPage from './pages/boatdetails'

// remove
import Components from './pages/components';

function App() {

    const dispatch = useDispatch()
    if (localStorage.getItem('accessToken')) {
        dispatch(fetchUserData());
    }

    return (
        <div className='App'>
            <BrowserRouter>
                <Header />
                <main>
                    <Route exact path='/'>
                        <Redirect to='/intro' />
                    </Route>
                    <Route exact path='/home' component={Home} />
                    <Route exact path='/login' component={Login} />
                    <Route exact path='/registrierung' component={RegistrationPage} />
                    <Route exact path='/flotte' component={BoatsListPage} />
                    <Route exact path='/flotte/:id' component={BoatDetailPage} />
                    <Route exact path='/verifikation' component={VerificationPage} />
                    <Route exact path='/intro' component={Intro} />
                    <Route exact path='/profil' component={MyProfilePage} />
                    <Route exact path='/components' component={Components} />
                </main>
            </BrowserRouter>
        </div>
    );
}

export default App;
