import React from 'react';
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { fetchUserData } from './store/actions/loginActions';
import authComponent from './hoc/authHOC';
import staffOrCrewHOC from './hoc/stuffOrCrewHOC';
import memberHOC from './hoc/memberHOC';
import './css/main.css';

// components
import Header from './components/Header';
import Footer from './components/Footer';
import ScrollToTop from './components/ScrollToTop';
import { MainContainer } from './components/MainContainer';

// pages
import Intro from './pages/intro';
import Home from './pages/home';
import Login from './pages/login';
import RegistrationPage from './pages/register';
import BoatsListPage from './pages/boatslistpage';
import VerificationPage from './pages/verification';
import MyProfilePage from './pages/profile';
import BoatDetailPage from './pages/boatdetails';
import EventPage from './pages/events';
import EditEventPage from './pages/edit-event';
import CreateEventPage from './pages/create-event';
import BoatSharing from './pages/boat-sharing';
import Genossenschaft from './pages/genossenschaft';
import NotFoundPage from './pages/404';
import UserSearchPage from './pages/userlistpage';
import UserDetailPage from './pages/userdetailpage';
import LocationContainer from './pages/standorte';

// remove
import Components from './pages/components';

function App() {
    const dispatch = useDispatch();

    if (localStorage.getItem('accessToken')) {
        dispatch(fetchUserData());
    }

    return (
        <div className='App'>
            <BrowserRouter>
                <ScrollToTop />
                <Header />
                <MainContainer>
                    <Route exact path='/' component={Home}></Route>
                    <Route exact path='/home' component={Home} />
                    <Route exact path='/boat-sharing' component={BoatSharing} />
                    <Route
                        exact
                        path='/genossenschaft'
                        component={Genossenschaft}
                    />
                    <Route
                        exact
                        path='/login'
                        // component={authComponent(Login, true)}
                        component={Login}
                    />
                    <Route exact path='/bootsliste' component={BoatsListPage} />
                    <Route exact path='/boot/:id' component={BoatDetailPage} />
                    <Route
                        exact
                        path='/registrierung'
                        component={authComponent(RegistrationPage, true)}
                    />
                    <Route
                        exact
                        path='/verifikation'
                        component={authComponent(VerificationPage, true)}
                    />
                    <Route exact path='/intro' component={Intro} />
                    <Route
                        exact
                        path='/profil'
                        component={authComponent(MyProfilePage)}
                    />
                    <Route exact path='/events' component={EventPage} />
                    <Route
                        exact
                        path='/event-bearbeiten/:id'
                        component={memberHOC(EditEventPage)}
                    />
                    <Route
                        exact
                        path='/event-erstellen'
                        component={memberHOC(CreateEventPage)}
                    />
                    <Route
                        exact
                        path='/mitglieder'
                        component={staffOrCrewHOC(UserSearchPage)}
                    />
                    <Route
                        exact
                        path='/mitglied/:id'
                        component={staffOrCrewHOC(UserDetailPage)}
                    />
                    <Route
                        exact path='/standorte' component={LocationContainer}
                    />

                    <Route exact path='/components' component={Components} />
                    <Route exact path='/404' component={NotFoundPage} />
                </MainContainer>
                <Footer />
            </BrowserRouter>
        </div>
    );
}

export default App;

/*
<Route path=''>
    <Redirect to='/404' />
</Route>

*/
