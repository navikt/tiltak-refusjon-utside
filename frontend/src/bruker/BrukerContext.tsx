import React, { FunctionComponent, useEffect, useState } from 'react';
import { hentInnloggetBruker } from '../services/rest-service';
import { Context, Filter, initBruker, InnloggetBruker, Status } from './BrukerContextType';

export const BrukerContext = React.createContext<Context>({} as Context);

const BrukerProvider: FunctionComponent = (props) => {
    const [innloggetBruker, setInnloggetBruker] = useState<InnloggetBruker>(initBruker);
    const [valgtBedrift, setValgtBedrift] = useState('');
    const [filter, setFilter] = useState<Filter>({
        status: Status.UBEHANDLET,
        tiltakstype: undefined,
    });

    const hentinnloggetBruker = () => {
        hentInnloggetBruker().then(setInnloggetBruker);
    };

    const oppdaterFilter = (nyttFilter: Filter) => {
        setFilter({ ...filter, ...nyttFilter });
    };

    useEffect(hentinnloggetBruker, []);

    const context: Context = {
        innloggetBruker: innloggetBruker,
        valgtBedrift,
        setValgtBedrift,
        filter: filter,
        oppdaterFilter: oppdaterFilter,
    };

    return <BrukerContext.Provider value={context}>{props.children}</BrukerContext.Provider>;
};

export default BrukerProvider;
