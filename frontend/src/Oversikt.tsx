import { FunctionComponent } from 'react';
import Bedriftsmeny from '@navikt/bedriftsmeny';
import React from 'react';
import { useHistory } from 'react-router-dom';
import { useContext } from 'react';
import { BrukerContext } from './BrukerContext';

const Oversikt: FunctionComponent = () => {
    const bruker = useContext(BrukerContext);
    const history = useHistory();

    return (
        <>
            <Bedriftsmeny
                history={history}
                organisasjoner={bruker.altinnOrganisasjoner}
                onOrganisasjonChange={() => {}}
                sidetittel={'Tiltaksrefusjon'}
            />
        </>
    );
};

export default Oversikt;
