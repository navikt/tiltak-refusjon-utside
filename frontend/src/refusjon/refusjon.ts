export interface Refusjon {
    id: string;
    tiltak: Tiltakstype;
    deltaker: string;
    deltakerFnr: string;
    veileder: string;
    bedrift: string;
    bedriftnummer: string;
    feriedager: number;
    trekkFeriedagerBeløp: number;
    sykepenger: number;
    sykedager: number;
    stillingsprosent: number;
    månedslønn: number;
    nettoMånedslønn: number;
    satsFeriepenger: number;
    feriepenger: number;
    satsOtp: number;
    beløpOtp: number;
    satsArbeidsgiveravgift: number;
    arbeidsgiveravgift: number;
    sumUtgifterArbeidsgiver: number;
    satsRefusjon: number;
    refusjonPrMåned: number;
    fraDato: string;
    tilDato: string;
    opprettet_tidspunkt: string;
}

export type Tiltakstype = 'Arbeidstrening' | 'Midlertidig lønnstilskudd' | ' lønnstilskudd';

export const refusjonInit: Refusjon = {
    id: '14',
    deltaker: 'Inger Hagerup',
    tiltak: 'Arbeidstrening',
    deltakerFnr: '07049223190',
    veileder: 'Alf Hansen',
    bedrift: 'Kiwi Majorstuen',
    bedriftnummer: '998877665',
    feriedager: 0,
    trekkFeriedagerBeløp: 0,
    sykedager: 0,
    sykepenger: 0,
    stillingsprosent: 50,
    månedslønn: 20000,
    nettoMånedslønn: 15000,
    satsOtp: 0.02,
    beløpOtp: 530,
    satsFeriepenger: 0.12,
    feriepenger: 3180,
    satsArbeidsgiveravgift: 0.141,
    arbeidsgiveravgift: 2737,
    sumUtgifterArbeidsgiver: 33947,
    satsRefusjon: 0.4,
    refusjonPrMåned: 10579,
    fraDato: '2020-08-01',
    tilDato: '2020-11-01',
    opprettet_tidspunkt: '2020-10-26T16:05:22.482034',
};
