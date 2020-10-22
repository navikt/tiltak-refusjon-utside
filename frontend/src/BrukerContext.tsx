import { Organisasjon } from '@navikt/bedriftsmeny/lib/organisasjon';
import React from 'react';
import { FunctionComponent } from 'react';
import { useEffect } from 'react';
import { hentInnloggetBruker } from './services/rest-service';
import { useState } from 'react';
import { useContext } from 'react';

export type Bedrift = {
    bedriftNr?: string;
};
export interface InnloggetBruker {
    identifikator: string;
    altinnOrganisasjoner: Organisasjon[];
    tilganger: Bedrift[];
}

export interface Context {
    bruker: InnloggetBruker;
    hentLoggetBruker: () => Promise<void>;
}

const initBruker: InnloggetBruker = {
    identifikator: '',
    altinnOrganisasjoner: [],
    tilganger: [],
};

export const BrukerContext = React.createContext<Context>({} as Context);

const BrukerProvider: FunctionComponent = (props) => {
    const [bruker, setBruker] = useState<InnloggetBruker>(initBruker);
    useEffect(() => {
        hentLoggetBruker();
    }, []);

    const hentLoggetBruker = async () => {
        try {
            const hentetInnloggetBruker = await hentInnloggetBruker();
            setBruker(hentetInnloggetBruker.data);
            console.log(hentetInnloggetBruker.data.altinnOrganisasjoner);
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
