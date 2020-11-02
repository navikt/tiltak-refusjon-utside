import React, { FunctionComponent, useContext, useEffect, useState } from 'react';
import { hentInnloggetBruker } from '../services/rest-service';
import { BrukerContextType, Filter, InnloggetBruker, Status } from './BrukerContextType';
import Banner from '../refusjon/Banner';
import LokalLogin from '../LokalLogin';
import { useHistory } from 'react-router-dom';

const BrukerContext = React.createContext<BrukerContextType | undefined>(undefined);

// Egen hook fordi det sjekkes at den blir brukt riktig, og kan ha undefined som defaultValue
export const useInnloggetBruker = () => {
    const context = useContext(BrukerContext);
    if (context === undefined) {
        throw new Error('Kan kun brukes innenfor BrukerProvider');
    }
    return context;
};

export const BrukerProvider: FunctionComponent = (props) => {
    const [innloggetBruker, setInnloggetBruker] = useState<InnloggetBruker>();
    const [valgtBedrift, setValgtBedrift] = useState();
    const [filter, setFilter] = useState<Filter>({
        status: Status.UBEHANDLET,
        tiltakstype: undefined,
    });

    const oppdaterFilter = (nyttFilter: Filter) => {
        setFilter({ ...filter, ...nyttFilter });
    };

    useEffect(() => {
        hentInnloggetBruker().then(setInnloggetBruker);
    }, []);

    const history = useHistory();

    return (
        <>
            {process.env.NODE_ENV === 'development' && <LokalLogin innloggetBruker={innloggetBruker} />}
            {innloggetBruker && (
                <Banner
                    organisasjoner={innloggetBruker.organisasjoner}
                    setValgtBedrift={(org) => {
                        if (valgtBedrift !== undefined) {
                            history.push({
                                pathname: '/',
                                search: 'bedrift=' + org.OrganizationNumber,
                            });
                        }
                        setValgtBedrift(org.OrganizationNumber);
                    }}
                />
            )}
            {innloggetBruker && valgtBedrift && (
                <BrukerContext.Provider
                    value={{
                        innloggetBruker,
                        valgtBedrift,
                        filter,
                        oppdaterFilter,
                    }}
                >
                    {props.children}
                </BrukerContext.Provider>
            )}
        </>
    );
};
