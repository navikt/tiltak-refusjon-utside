import { Status } from './refusjon/status';
import { Tiltak } from './refusjon/tiltak';

export const tiltakstypeTekst: { [key in Tiltak]: string } = {
    MIDLERTIDIG_LONNSTILSKUDD: 'midlertidig lønnstilskudd',
    VARIG_LONNSTILSKUDD: 'varig lønnstilskudd',
    MENTOR: 'mentor',
    SOMMERJOBB: 'sommerjobb',
};

export const statusTekst: { [key in Status]: string } = {
    KRAV_FREMMET: 'krav fremmet',
    UTBETALT: 'utbetalt',
    UTGÅTT: 'utgått',
    NY: 'ny',
    ANNULLERT: 'annullert',
};
