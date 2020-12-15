export interface Enhet {
    dato: string;
    koordinatStart: number;
    koordinatSlutt: number;
    inntekt: Inntekt[] | null;
}

export interface TilskuddPeriode {
    datoFra: string;
    koordinatStart: number;
    datoTil: string;
    koordinatSlutt: number;
}

export interface Inntekt {
    fraDato: string;
    tilDato: string;
    koordinatStart: number;
    koordinatSlutt: number;
    belop: number;
    id: string;
}

export interface PositionInfo {
    yPos: number;
    xPos: number;
    dato: string | undefined;
    inntektLabel: React.ReactNode | undefined;
    inntektFeltId: { id: string }[] | undefined;
}

export interface DatoKoordinater {
    dato: string;
    koordinatStart: number;
    koordinatSlutt: number;
}
