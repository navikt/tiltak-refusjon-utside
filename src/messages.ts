import { Status } from './refusjon/status';
import { Tiltak } from './refusjon/tiltak';

export const tiltakstypeTekst: { [key in Tiltak]: string } = {
    MIDLERTIDIG_LONNSTILSKUDD: 'midlertidig lønnstilskudd',
    VARIG_LONNSTILSKUDD: 'varig lønnstilskudd',
    MENTOR: 'mentor',
    SOMMERJOBB: 'sommerjobb',
};

export const statusTekst: { [key in Status]: string } = {
    SENDT_KRAV: 'sendt krav',
    UTBETALT: 'utbetalt',
    UTGÅTT: 'frist utgått',
    KLAR_FOR_INNSENDING: 'klar for innsending',
    FOR_TIDLIG: 'for tidlig',
    ANNULLERT: 'annullert',
};

export const inntektstypeTekst: { [key: string]: string } = {
    LOENNSINNTEKT: 'Lønnsinntekt',
};
