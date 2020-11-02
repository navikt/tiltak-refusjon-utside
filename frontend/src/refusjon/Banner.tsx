import Bedriftsmeny from '@navikt/bedriftsmeny';
import React, { FunctionComponent, useContext } from 'react';
import { useHistory } from 'react-router';
import { BrukerContext } from '../bruker/BrukerContext';

const Banner: FunctionComponent = () => {
    const context = useContext(BrukerContext);
    const history = useHistory();

    return (
        <>
            <Bedriftsmeny
                history={history}
                organisasjoner={context.innloggetBruker.organisasjoner}
                onOrganisasjonChange={(org) => context.setValgtBedrift(org.OrganizationNumber)}
                sidetittel={'Tiltaksrefusjon'}
            />
        </>
    );
};

export default Banner;
