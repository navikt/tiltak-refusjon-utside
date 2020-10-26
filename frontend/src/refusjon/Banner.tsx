import React, { FunctionComponent, useContext } from 'react';
import { BrukerContext } from '../bruker/BrukerContext';
import { useHistory } from 'react-router';
import Bedriftsmeny from '@navikt/bedriftsmeny';

const Banner: FunctionComponent = () => {
    const { bruker } = useContext(BrukerContext);
    const history = useHistory();

    return (
        <>
            <Bedriftsmeny
                history={history}
                organisasjoner={bruker.altinnOrganisasjoner}
                onOrganisasjonChange={() => void 0}
                sidetittel={'Tiltaksrefusjon'}
            />
        </>
    );
};

export default Banner;
