import React from 'react';
import './App.css';
import '@navikt/bedriftsmeny/lib/bedriftsmeny.css';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import BrukerProvider from './BrukerContext';
import Oversikt from './Oversikt';

function App() {
    return (
        <BrowserRouter>
            <Switch>
                <Route path="/">
                    <BrukerProvider>
                        <Oversikt />
                    </BrukerProvider>
                </Route>
            </Switch>
        </BrowserRouter>
    );
}

export default App;
