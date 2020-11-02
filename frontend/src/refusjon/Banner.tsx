import Bedriftsmeny from '@navikt/bedriftsmeny';
import React, { FunctionComponent, useContext } from 'react';
import { useHistory } from 'react-router';
import { mutate } from 'swr';
import { BrukerContext } from '../bruker/BrukerContext';
import { urlParameter } from '../utils/urlUtils';

const Banner: FunctionComponent = () => {
    const context = useContext(BrukerContext);
    const history = useHistory();

    const organisasjonsNummer = urlParameter('bedrift');

    return (
        <>
            <Bedriftsmeny
                history={history}
                organisasjoner={context.innloggetBruker.altinnOrganisasjoner}
                onOrganisasjonChange={
                    (org) => {
                        // TRENGER Å REFETCHE HER
                        mutate([`/api/refusjon/bedrift/`, organisasjonsNummer]);
                    } /*context.hentRefusjon(org.OrganizationNumber) */
                }
                sidetittel={'Tiltaksrefusjon'}
            />
        </>
    );
};

export default Banner;
