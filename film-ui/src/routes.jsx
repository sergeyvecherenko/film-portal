import React     from 'react';
import { Route } from 'react-router';

import App          from './App.jsx';
import MainLayout   from './components/layouts/MainLayout.jsx';
import LandingPage  from './components/pages/LandingPage.jsx';
import FilmsPage   from './components/pages/FilmsPage.jsx';

import viewStore    from './stores/ViewStore.js';
import sessionStore from './stores/SessionStore.js';

function handleEnterLanding(router, replace) {
    if (sessionStore.currentUser) {
        replace('/films');
    } else {
        viewStore.setCurrentPage('landing');
    }
}

function handleEnterFilms() {
    if (viewStore.currentPage !== 'films') {
        viewStore.setCurrentPage('films');
    }
}

function handleEnteApp() {
    sessionStore.restoreSession();
}

function handleSetSession({ location }) {
    const { token } = location.query;

    sessionStore.setSession(token);
}

export default (
    <Route onEnter={handleEnteApp} component={App}>
        <Route path='/' onEnter={handleEnterLanding} component={LandingPage} />
        <Route path='/setSession' onEnter={handleSetSession} component={<div />} />
        <Route component={MainLayout} >
            <Route path='/films' onEnter={handleEnterFilms} component={FilmsPage} />
        </Route>
    </Route>
);
