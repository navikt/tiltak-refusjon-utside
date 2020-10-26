import { Organisasjon } from '@navikt/bedriftsmeny/lib/organisasjon';
import { Refusjon } from '../refusjon/refusjon';

export interface Context {
    innloggetBruker: InnloggetBruker;
    refusjon: Refusjon[];
    hentinnloggetBruker: () => Promise<void>;
    hentRefusjon: (bedriftNummer: string) => Promise<void>;
}

export interface InnloggetBruker {
    identifikator: string;
    altinnOrganisasjoner: Organisasjon[];
    tilganger: Bedrift[];
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
