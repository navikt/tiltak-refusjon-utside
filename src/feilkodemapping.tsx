import * as React from 'react';
import { FunctionComponent } from 'react';
import { Normaltekst } from 'nav-frontend-typografi';

type Feilkode = 'INNTEKTSOPPSLAG';

const Feilmelding: FunctionComponent<{ feilkode: Feilkode }> = (props) => {
    return <Normaltekst>{feilmelding(props.feilkode)}</Normaltekst>;
};

export default Feilmelding;

export const feilmelding = (feilkode: Feilkode) => {
    switch (feilkode) {
        case 'INNTEKTSOPPSLAG':
            return 'Feil ved inntektsoppslag';
    }
};
