import React from 'react';
import './App.css';
import '@navikt/bedriftsmeny/lib/bedriftsmeny.css';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import BrukerProvider from './bruker/BrukerContext';
import Innhold from './refusjon/innhold/Innhold';

function App() {
    return (
        <BrowserRouter>
            <Switch>
                <Route path="/">
                    <BrukerProvider>
                        <Innhold />
                    </BrukerProvider>
                </Route>
            </Switch>
        </BrowserRouter>
    );
}

export default App;
