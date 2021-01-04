import { Tiltak } from './refusjon/tiltak';

export const tiltakstypeTekst: { [key in Tiltak]: string } = {
    [Tiltak.MIDLERTIDIG_LØNNSTILSKUDD]: 'midlertidig lønnstilskudd',
    [Tiltak.VARIG_LØNNSTILSKUDD]: 'varig lønnstilskudd',
    [Tiltak.MENTOR]: 'mentor',
};
