import { Organisasjon } from '@navikt/bedriftsmeny/lib/organisasjon';
import { Dispatch } from 'react';

export interface Context {
    innloggetBruker: InnloggetBruker;
    filter: Filter;
    oppdaterFilter: (nyttFilter: Filter) => void;
    valgtBedrift: string;
    setValgtBedrift: Dispatch<React.SetStateAction<string>>;
}

export interface InnloggetBruker {
    identifikator: string;
    altinnOrganisasjoner: Organisasjon[];
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

export type Bedrift = {
    bedriftNr?: string;
};

export const initBruker: InnloggetBruker = {
    identifikator: '',
    altinnOrganisasjoner: [
        {
            Name: 'Saltrød og Høneby',
            Type: 'Business',
            OrganizationNumber: '999999999',
            OrganizationForm: 'BEDR',
            Status: 'Active',
            ParentOrganizationNumber: '910825550',
        },
    ],
    tilganger: [],
};
