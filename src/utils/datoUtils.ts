import moment, { DurationInputArg2, Moment } from 'moment';
import 'moment/locale/nb';
import { storForbokstav } from './stringUtils';
import { Inntektsgrunnlag, Inntektslinje } from '../refusjon/refusjon';

moment.locale('nb');

export const NORSK_DATO_FORMAT = 'DD.MM.YYYY';

export const formatterDato = (dato: string) => {
    try {
        const formattertDato = moment(dato).format(NORSK_DATO_FORMAT);
        return !formattertDato.includes('NaN') ? formattertDato : dato;
    } catch (e) {
        // Kunne ikke caste stringen til dato.
        return dato;
    }
};

export const formatterDatoen = (dato: string, format: string) => {
    try {
        const formattertDato = moment(dato).format(format);
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

export const getEnheterMellom = (
    datoFom: string,
    datoTom: string,
    enhet: DurationInputArg2,
    compareFormat: string,
    returnFormat: string
): string[] => {
    const dateStart = moment(datoFom);
    const dateEnd = moment(datoTom);
    let timeValues = [];

    while (dateStart.format(compareFormat) !== dateEnd.format(compareFormat)) {
        timeValues.push(dateStart.format(returnFormat));
        dateStart.add(1, enhet);
    }
    timeValues.push(dateStart.format(returnFormat));
    dateStart.add(1, enhet);
    return timeValues;
};

export const finnForsteInntekstDato = (inntektsgrunnlag: Inntektsgrunnlag): Moment[] => {
    return finnDato({
        inntektsgrunnlag: inntektsgrunnlag,
        nyDatoErStorstEllerMinst: datoErMindre,
        felt: 'opptjeningsperiodeFom',
    });
};

export const finnSisteInntekstDato = (inntektsgrunnlag: Inntektsgrunnlag): Moment[] => {
    return finnDato({
        inntektsgrunnlag: inntektsgrunnlag,
        nyDatoErStorstEllerMinst: datoErStorre,
        felt: 'opptjeningsperiodeTom',
    });
};

interface FinnDatoProps {
    inntektsgrunnlag: Inntektsgrunnlag;
    nyDatoErStorstEllerMinst: (dato: Moment, nyDato: Moment) => boolean;
    felt: keyof Inntektslinje;
}

const finnDato = (props: FinnDatoProps): Moment[] => {
    const valgtDato: undefined | Moment[] = [];
    const valgtDatoErIkkeSatt = () => valgtDato.length === 0;

    props.inntektsgrunnlag.inntekter.forEach((inntekt) => {
        const startDatoInntekt = moment(inntekt.opptjeningsperiodeFom);
        const nyDato = sjekkOmSluttDatoErSatt(moment(inntekt[props.felt]), startDatoInntekt);

        if (valgtDatoErIkkeSatt()) {
            valgtDato.push(nyDato);
        } else if (props.nyDatoErStorstEllerMinst(valgtDato[0], nyDato)) {
            valgtDato.pop();
            valgtDato.push(nyDato);
        }
    });
    return valgtDato;
};

const datoErMindre = (dato: Moment, nyDato: Moment): boolean => {
    return dato > nyDato;
};

const datoErStorre = (dato: Moment, nyDato: Moment): boolean => {
    return dato < nyDato;
};

export const sjekkOmSluttDatoErSatt = (dato: Moment, startDatoMnd: Moment): Moment => {
    return dato.format('YYYY-MM-DD') !== 'Invalid date' ? dato : moment(startDatoMnd).endOf('month');
};

export const getEnheterMellomStandardFormat = (datoFom: string, datoTom: string): string[] => {
    return getEnheterMellom(datoFom, datoTom, 'day', 'YYYY-MM-DD', 'YYYY-MM-DD');
};

export const getAntallMndTilSVGGrid = (fraDato: string, tilDato: string): string[] => {
    const antallMnd = getEnheterMellom(fraDato, tilDato, 'month', 'M', 'MMMM');
    antallMnd.push(
        moment(antallMnd[antallMnd.length - 1], 'MMMM')
            .add(1, 'month')
            .format('MMMM')
    );

    return antallMnd;
};
