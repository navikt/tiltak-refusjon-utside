import { Status } from './status';
import { Tiltak } from './tiltak';

export interface Refusjon {
    id: string;
    bedriftNr: string;
    deltakerFnr: string;
    godkjentAvArbeidsgiver?: boolean;
    godkjentAvSaksbehandler?: boolean;
    refusjonsbeløp?: number;
    status: Status;
    tilskuddsgrunnlag: Tilskuddsgrunnlag;
    inntektsgrunnlag?: Inntektsgrunnlag;
}

interface Tilskuddsgrunnlag {
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

interface Inntektsgrunnlag {
    innhentetTidspunkt: string;
    inntekter: Inntektslinje[];
}

interface Inntektslinje {
    inntektType: string;
    beløp: number;
    måned: string;
    opptjeningsperiodeFom: string;
    opptjeningsperiodeTom: string;
}
