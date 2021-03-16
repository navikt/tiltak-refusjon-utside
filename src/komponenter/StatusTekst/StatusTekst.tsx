import * as React from 'react';
import { FunctionComponent } from 'react';
import { Status } from '../../refusjon/status';
import { EtikettAdvarsel, EtikettInfo, EtikettSuksess } from 'nav-frontend-etiketter';
import moment from 'moment';
import { formatterDato } from '../../utils/datoUtils';
import { storForbokstav } from '../../utils/stringUtils';
import { statusTekst } from '../../messages';

interface Props {
    status: Status;
    tilskuddFom: string;
    tilskuddTom: string;
}

const StatusTekst: FunctionComponent<Props> = (props) => {
    if (props.status === Status.NY && moment(props.tilskuddTom).isSameOrBefore(moment(), 'days')) {
        return <EtikettSuksess>Ny - søk om refusjon</EtikettSuksess>;
    } else if (props.status === Status.NY) {
        return <EtikettInfo>Ny - søk fra {formatterDato(props.tilskuddTom)}</EtikettInfo>;
    } else if (props.status === Status.UTGÅTT || props.status === Status.ANNULLERT) {
        return <EtikettAdvarsel>{storForbokstav(statusTekst[props.status])}</EtikettAdvarsel>;
    }
    return <EtikettInfo>{storForbokstav(statusTekst[props.status])}</EtikettInfo>;
};

export default StatusTekst;
