import { Organisasjon } from '@navikt/bedriftsmeny/lib/organisasjon';

export type Bedrift = string;

export interface BrukerContextType {
    innloggetBruker: InnloggetBruker;
    valgtBedrift: Bedrift;
    filter: Filter;
    oppdaterFilter: (nyttFilter: Filter) => void;
}

export interface InnloggetBruker {
    identifikator: string;
    organisasjoner: Organisasjon[];
    tilganger: Bedrift[];
}

export interface Filter {
    status: Status;
    tiltakstype: Tiltak | undefined;
}

export enum Status {
    UBEHANDLET = 'UBEHANDLET',
    BEHANDLET = 'BEHANDLET',
}

export enum Tiltak {
    MENTOR = 'MENTOR',
    MIDLETTIDIG_LØNNSTILSKUDD = 'MIDLERTIDLIG_LONNSTILSKUDD',
    VARIG_LØNNSTILSKUDD = 'VARIG_LONNSTILSKUDD',
}
