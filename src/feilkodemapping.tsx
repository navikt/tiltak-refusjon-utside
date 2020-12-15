import * as React from 'react';
import { FunctionComponent } from 'react';
import { Normaltekst } from 'nav-frontend-typografi';

type Feilkode = 'TEKNISK_FEIL_INNTEKTSOPPSLAG' | 'INNTEKT_HENTET_FOR_TIDLIG' | 'UGYLDIG_STATUS';

const Feilmelding: FunctionComponent<{ feilkode: Feilkode }> = (props) => {
    return <Normaltekst>{feilmelding(props.feilkode)}</Normaltekst>;
};

export default Feilmelding;

export const feilmelding = (feilkode: Feilkode) => {
    switch (feilkode) {
        case 'TEKNISK_FEIL_INNTEKTSOPPSLAG':
            return 'Feil ved inntektsoppslag.';
        case 'INNTEKT_HENTET_FOR_TIDLIG':
            return 'Refusjonen kan ikke startes før tilskuddsperioden har utløpt.';
        case 'UGYLDIG_STATUS':
            return 'Handlingen kan ikke utføres fordi refusjonen har ugyldig status.';
    }
};
