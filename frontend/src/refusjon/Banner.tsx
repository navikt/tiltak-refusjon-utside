import React, { FunctionComponent, useContext } from 'react';
import { BrukerContext } from '../bruker/BrukerContext';
import { useHistory } from 'react-router';
import Bedriftsmeny from '@navikt/bedriftsmeny';

const Banner: FunctionComponent = () => {
    const context = useContext(BrukerContext);
    const history = useHistory();

    return (
        <>
            <Bedriftsmeny
                history={history}
                organisasjoner={context.innloggetBruker.altinnOrganisasjoner}
                onOrganisasjonChange={(org) => context.hentRefusjon(org.OrganizationNumber)}
                sidetittel={'Tiltaksrefusjon'}
            />
        </>
    );
};

export default Banner;
