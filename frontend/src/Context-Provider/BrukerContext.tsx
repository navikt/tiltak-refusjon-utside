import React from 'react';
import { FunctionComponent } from 'react';
import { useEffect } from 'react';
import { hentInnloggetBruker } from '../services/rest-service';
import { useState } from 'react';
import {Context, initBruker, InnloggetBruker} from "./BrukerContextType";

export const BrukerContext = React.createContext<Context>({} as Context);

const BrukerProvider: FunctionComponent = (props) => {
    const [bruker, setBruker] = useState<InnloggetBruker>(initBruker);
    useEffect(() => {
        hentLoggetBruker();
    }, []);

    const hentLoggetBruker = async () => {
        try {
            const hentetInnloggetBruker = await hentInnloggetBruker();
            setBruker(hentetInnloggetBruker);
        } catch (err) {
            console.log('error: ', err);
        }
    };

    const context: Context = {
        bruker: bruker,
        hentLoggetBruker: hentLoggetBruker,
    };

    return <BrukerContext.Provider value={context}>{props.children}</BrukerContext.Provider>;
};

export default BrukerProvider;
