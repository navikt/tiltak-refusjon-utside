import moment from 'moment';
import 'moment/locale/nb';
import { storForbokstav } from './stringUtils';

moment.locale('nb');

const NORSK_DATO_FORMAT = 'DD.MM.YYYY';
export const formatterDato = (dato: string) => {
    try {
        const formattertDato = moment(dato).format(NORSK_DATO_FORMAT);
        return !formattertDato.includes('NaN') ? formattertDato : dato;
    } catch (e) {
        // Kunne ikke caste stringen til dato.
        return dato;
    }
};
export const getMåned = (dato: string) => {
    try {
        const formattertDato = moment(dato).format('MMMM');
        return !formattertDato.includes('NaN') ? storForbokstav(formattertDato) : dato;
    } catch (e) {
        // Kunne ikke caste stringen til dato.
        return dato;
    }
};

export const getMånederMellom = (datoFom: string, datoTom: string) => {
    var dateStart = moment(datoFom);
    var dateEnd = moment(datoTom);
    var timeValues = [];

    while (dateEnd > dateStart || dateStart.format('M') === dateEnd.format('M')) {
        timeValues.push(dateStart.format('YYYY-MM'));
        dateStart.add(1, 'month');
    }
    return timeValues;
};
