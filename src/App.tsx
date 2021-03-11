import '@navikt/bedriftsmeny/lib/bedriftsmeny.css';
import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import AdvarselBannerTestversjon from './AdvarselBannerTestversjon/AdvarselBannerTestversjon';
import './App.css';
import { BrukerProvider } from './bruker/BrukerContext';
import ErrorOgSuspenseHandler from './ErrorOgSuspenseHandler';
import ScrollToTop from './komponenter/ScrollToTop';
import OversiktSide from './refusjon/OversiktSide/OversiktSide';
import Refusjon from './refusjon/RefusjonSide/Refusjon';

function App() {
    return (
        <BrowserRouter>
            <ScrollToTop />
            <AdvarselBannerTestversjon />
            <Switch>
                <BrukerProvider>
                    <Route exact path="/">
                        <ErrorOgSuspenseHandler>
                            <OversiktSide />
                        </ErrorOgSuspenseHandler>
                    </Route>
                    <Route path="/refusjon/:refusjonId">
                        <ErrorOgSuspenseHandler>
                            {/* <RefusjonSide /> */}
                            {/* <RefusjonSideNy /> */}
                            <Refusjon />
                        </ErrorOgSuspenseHandler>
                    </Route>
                </BrukerProvider>
            </Switch>
        </BrowserRouter>
    );
}

export default App;
