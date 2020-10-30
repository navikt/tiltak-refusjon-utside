import Bedriftsmeny from '@navikt/bedriftsmeny';
import React, { FunctionComponent, useContext } from 'react';
import { useHistory } from 'react-router';
import { mutate } from 'swr';
import { BrukerContext } from '../bruker/BrukerContext';

const Banner: FunctionComponent = () => {
    const context = useContext(BrukerContext);
    const history = useHistory();

    //const organisasjonsNummer = new URLSearchParams(window.location.search).get('bedrift')! || '';
    //const refusjoner = useHentRefusjoner(organisasjonsNummer);

    return (
        <>
            <Bedriftsmeny
                history={history}
                organisasjoner={context.innloggetBruker.altinnOrganisasjoner}
                onOrganisasjonChange={
                    (org) => {
                        // TRENGER Å REFETCHE HER
                        mutate(`/api/refusjon/bedrift/`);
                    } /*context.hentRefusjon(org.OrganizationNumber) */
                }
                sidetittel={'Tiltaksrefusjon'}
            />
        </>
    );
};

export default Banner;
