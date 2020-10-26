import {Organisasjon} from "@navikt/bedriftsmeny/lib/organisasjon";

export type Bedrift = {
    bedriftNr?: string;
};
export interface InnloggetBruker {
    identifikator: string;
    altinnOrganisasjoner: Organisasjon[];
    tilganger: Bedrift[];
}

export interface Context {
    bruker: InnloggetBruker;
    hentLoggetBruker: () => Promise<void>;
}

export const initBruker: InnloggetBruker = {
    identifikator: '',
    altinnOrganisasjoner: [{
        Name: "Saltrød og Høneby",
        Type: "Business",
        OrganizationNumber: "999999999",
        OrganizationForm: "BEDR",
        Status: "Active",
        ParentOrganizationNumber: "910825550"
    }],
    tilganger: [],
};
