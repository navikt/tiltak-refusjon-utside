import '@navikt/bedriftsmeny/lib/bedriftsmeny.css';
import React, { useEffect, useState } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import './App.css';
import BrukerProvider from './bruker/BrukerContext';
import { InnloggetBruker } from './bruker/BrukerContextType';
import ErrorOgSuspenseHandler from './ErrorOgSuspenseHandler';
import LokalLogin from './LokalLogin';
import Banner from './refusjon/Banner';
import Innhold from './refusjon/innhold/Innhold';
import RefusjonSide from './refusjon/RefusjonSide/RefusjonSide';
import { hentInnloggetBruker } from './services/rest-service';

function App() {
    const [innloggetBruker, setInnloggetBruker] = useState<InnloggetBruker>();

    useEffect(() => {
        hentInnloggetBruker()
            .then((bruker) => setInnloggetBruker(bruker))
            .catch(() => setInnloggetBruker(undefined));
    }, []);

    return (
        <>
            {process.env.NODE_ENV === 'development' && <LokalLogin innloggetBruker={innloggetBruker} />}
            {innloggetBruker && (
                <>
                    <BrowserRouter>
                        <Switch>
                            <BrukerProvider>
                                <Banner />
                                <Route exact path="/">
                                    <ErrorOgSuspenseHandler>
                                        <Innhold />
                                    </ErrorOgSuspenseHandler>
                                </Route>
                                <Route path="/refusjon/:refusjonId">
                                    <ErrorOgSuspenseHandler>
                                        <RefusjonSide />
                                    </ErrorOgSuspenseHandler>
                                </Route>
                            </BrukerProvider>
                        </Switch>
                    </BrowserRouter>
                </>
            )}
        </>
    );
}

export default App;
