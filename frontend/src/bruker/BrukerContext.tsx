import React, { FunctionComponent, useEffect, useState } from 'react';
import { hentInnloggetBruker } from '../services/rest-service';
import { Context, Filter, initBruker, InnloggetBruker, Status } from './BrukerContextType';

export const BrukerContext = React.createContext<Context>({} as Context);

const BrukerProvider: FunctionComponent = (props) => {
    const [innloggetBruker, setInnloggetBruker] = useState<InnloggetBruker>(initBruker);
    // const [refusjon, setRefusjon] = useState<Refusjon[]>([refusjonInit]);
    const [filter, setFilter] = useState<Filter>({
        status: Status.UBEHANDLET,
        tiltakstype: undefined,
    });

    const hentinnloggetBruker = async () => {
        try {
            const innloggetBruker = await hentInnloggetBruker();
            setInnloggetBrukerInformasjon(innloggetBruker);
        } catch (err) {
            console.log('error: ', err);
        }
    };

    // const hentRefusjon = async (bedriftNummer: string) => {
    //     try {
    //         const refusjoner = await hentRefusjoner(bedriftNummer);
    //         setRefusjoner(refusjoner);
    //     } catch (e) {
    //         console.warn(e);
    //     }
    // };

    // const setRefusjoner = (nyeRefusjoner: Refusjon[]) => {
    //     setRefusjon([...nyeRefusjoner]);
    // };

    const setInnloggetBrukerInformasjon = (brukerInformasjon: InnloggetBruker) => {
        setInnloggetBruker(brukerInformasjon);
    };

    const hentInnloggetBrukerInfo = () => {
        hentinnloggetBruker();
    };

    const oppdaterFilter = (nyttFilter: Filter) => {
        setFilter({ ...filter, ...nyttFilter });
    };

    useEffect(hentInnloggetBrukerInfo, []);

    const context: Context = {
        innloggetBruker: innloggetBruker,
        // refusjon: refusjon,
        filter: filter,
        hentinnloggetBruker: hentinnloggetBruker,
        // hentRefusjon: hentRefusjon,
        oppdaterFilter: oppdaterFilter,
    };

    return <BrukerContext.Provider value={context}>{props.children}</BrukerContext.Provider>;
};

export default BrukerProvider;
