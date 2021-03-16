import * as React from 'react';
import StatusTekst from './StatusTekst';
import { Status } from '../../refusjon/status';
import { render } from '@testing-library/react';
import moment from 'moment';
import { datoString, formatterDato } from '../../utils/datoUtils';

describe('Skal vise riktig statustekst', () => {
    test('Ny, kan ikke påbegynnes', () => {
        const tilskuddTom = datoString(moment().add(1, 'days'));
        const { getByText } = render(
            <StatusTekst
                status={Status.NY}
                tilskuddFom={datoString(moment().subtract(2, 'days'))}
                tilskuddTom={tilskuddTom}
            />
        );
        expect(getByText('Ny - søk fra ' + formatterDato(tilskuddTom))).toBeInTheDocument();
    });

    test('Ny, kan påbegynnes', () => {
        const { getByText } = render(
            <StatusTekst status={Status.NY} tilskuddFom={datoString(moment())} tilskuddTom={datoString(moment())} />
        );
        expect(getByText('Ny - søk om refusjon')).toBeInTheDocument();
    });
});
