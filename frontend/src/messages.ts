import { Tiltak } from "./refusjon/tiltak";

export const tiltakstypeTekst: { [key in Tiltak]: string } = {
    [Tiltak.MIDLETTIDIG_LØNNSTILSKUDD]: 'Midlertidig lønnstilskudd',
    [Tiltak.VARIG_LØNNSTILSKUDD]: 'Varig lønnstilskudd',
    [Tiltak.MENTOR]: 'Mentor',
};