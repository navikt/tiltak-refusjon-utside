export interface Enhet {
    dato: string;
    kordinatStart: number;
    kordinatSlutt: number;
    inntekt: Inntekt[] | null;
}

export interface TilskuddPeriode {
    datoFra: string;
    kordinatStart: number;
    datoTil: string;
    kordinatSlutt: number;
}

export interface Inntekt {
    fraDato: string;
    tilDato: string;
    kordinatStart: number;
    kordinatSlutt: number;
    belop: number;
}

export interface PositionInfo {
    yPos: number;
    xPos: number;
    dato: string | undefined;
    inntektLabel: React.ReactNode | undefined;
}

export interface DatoKordinater {
    dato: string;
    kordinatStart: number;
    kordinatSlutt: number;
}
