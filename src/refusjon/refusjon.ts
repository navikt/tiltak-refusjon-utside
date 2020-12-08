import { Status } from './status';
import { Tiltak } from './tiltak';

export interface Refusjon {
    id: string;
    bedriftNr: string;
    deltakerFnr: string;
    godkjentAvArbeidsgiver?: boolean;
    godkjentAvSaksbehandler?: boolean;
    status: Status;
    tilskuddsgrunnlag: Tilskuddsgrunnlag;
    inntektsgrunnlag?: Inntektsgrunnlag;
    beregning?: Beregning;
}

export interface Tilskuddsgrunnlag {
    arbeidsgiveravgiftSats: number;
    avtaleId: string;
    bedriftNavn: string;
    bedriftNr: string;
    deltakerEtternavn: string;
    deltakerFnr: string;
    deltakerFornavn: string;
    feriepengerSats: number;
    id: string;
    lønnstilskuddsprosent: number;
    otpSats: number;
    tilskuddFom: string;
    tilskuddTom: string;
    tilskuddsbeløp: number;
    tilskuddsperiodeId: string;
    tiltakstype: Tiltak;
    veilederNavIdent: string;
}

export interface Inntektsgrunnlag {
    innhentetTidspunkt: string;
    inntekter: Inntektslinje[];
}

export interface Inntektslinje {
    inntektType: string;
    beløp: number;
    måned: string;
    opptjeningsperiodeFom: string;
    opptjeningsperiodeTom: string;
}

interface Beregning {
    arbeidsgiveravgift: number;
    commitHash: string;
    feriepenger: number;
    id: string;
    lønn: number;
    refusjonsbeløp: number;
    sumUtgifter: number;
    tjenestepensjon: number;
}
