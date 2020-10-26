import React from 'react';
import { FunctionComponent } from 'react';
import { useEffect } from 'react';
import { hentInnloggetBruker, hentRefusjoner } from '../services/rest-service';
import { useState } from 'react';
import { Context, initBruker, InnloggetBruker } from './BrukerContextType';
import { Refusjon, refusjonInit } from '../refusjon/refusjon';

export const BrukerContext = React.createContext<Context>({} as Context);

const BrukerProvider: FunctionComponent = (props) => {
    const [innloggetBruker, setInnloggetBruker] = useState<InnloggetBruker>(initBruker);
    const [refusjon, setRefusjon] = useState<Refusjon[]>([refusjonInit]);

    const hentinnloggetBruker = async () => {
        try {
            const innloggetBruker = await hentInnloggetBruker();
            setInnloggetBrukerInformasjon(innloggetBruker);
        } catch (err) {
            console.log('error: ', err);
        }
    };

    const hentRefusjon = async (bedriftNummer: string) => {
        try {
            const refusjoner = await hentRefusjoner(bedriftNummer);
            setRefusjoner(refusjoner);
        } catch (e) {
            console.warn(e);
        }
    };

    const setRefusjoner = (nyeRefusjoner: Refusjon[]) => {
        setRefusjon([...nyeRefusjoner]);
    };

    const setInnloggetBrukerInformasjon = (brukerInformasjon: InnloggetBruker) => {
        setInnloggetBruker(brukerInformasjon);
    };

    const hentInnloggetBrukerInfo = () => {
        hentinnloggetBruker();
    };

    useEffect(hentInnloggetBrukerInfo, []);

    const context: Context = {
        innloggetBruker: innloggetBruker,
        refusjon: refusjon,
        hentinnloggetBruker: hentinnloggetBruker,
        hentRefusjon: hentRefusjon,
    };

    return <BrukerContext.Provider value={context}>{props.children}</BrukerContext.Provider>;
};

export default BrukerProvider;
