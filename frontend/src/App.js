import React from 'react';
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';

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

// remove
import Components from './pages/components';

function App() {
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
                    <Route exact path='/register' component={RegistrationPage} />
                    <Route exact path='/boatslist' component={BoatsListPage} />


                    <Route
                        exact
                        path='/register'
                        component={RegistrationPage}
                    />
                    <Route exact path='/verification' component={VerificationPage} />
                    <Route exact path='/intro' component={Intro} />
                    <Route exact path='/my-profile' component={MyProfilePage} />
                    <Route exact path='/components' component={Components} />
                </main>
            </BrowserRouter>
        </div>
    );
}

export default App;
