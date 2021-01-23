import Bedriftsmeny from '@navikt/bedriftsmeny';
import React, { FunctionComponent } from 'react';
import { useHistory } from 'react-router';
import { Organisasjon } from '@navikt/bedriftsmeny/lib/organisasjon';

type Props = {
    organisasjoner: Organisasjon[];
    setValgtBedrift: (org: Organisasjon) => void;
};

const Banner: FunctionComponent<Props> = (props) => {
    const history = useHistory();

    return (
        <Bedriftsmeny
            history={history}
            organisasjoner={props.organisasjoner}
            onOrganisasjonChange={(org) => {
                props.setValgtBedrift(org);
            }}
            sidetittel="Tiltaksrefusjon"
        />
    );
};

export default Banner;
