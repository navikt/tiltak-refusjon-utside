import { Organisasjon } from '@navikt/bedriftsmeny/lib/organisasjon';
import React from 'react';
import { Context } from 'react';
import { FunctionComponent } from 'react';
import { useEffect } from 'react';
import { hentInnloggetBruker } from './services/rest-service';
import { useState } from 'react';

export type Bedrift = {
    bedriftNr?: string;
};
export interface InnloggetBruker {
    identifikator: string;
    altinnOrganisasjoner: Organisasjon[];
    tilganger: Bedrift[];
}
const testAltinnOrganisasjon: Organisasjon[] = [
    {
        Name: 'Bedriften Med Midlertidi Lts',
        Type: 'Business',
        OrganizationNumber: '910712314',
        OrganizationForm: 'BEDR',
        Status: 'Active',
        ParentOrganizationNumber: '910825555',
    },
    {
        Name: 'Saltrød og Høneby',
        Type: 'Business',
        OrganizationNumber: '999999999',
        OrganizationForm: 'BEDR',
        Status: 'Active',
        ParentOrganizationNumber: '910825550',
    },
    {
        Name: 'IngenTiltak ASA',
        Type: 'Enterprise',
        OrganizationNumber: '980825560',
        OrganizationForm: 'AS',
        Status: 'Active',
        ParentOrganizationNumber: 'null',
    },
    {
        Name: 'IngenTiltak Hjørnet',
        Type: 'Business',
        OrganizationNumber: '980712306',
        OrganizationForm: 'BEDR',
        Status: 'Active',
        ParentOrganizationNumber: '980825560',
    },
    {
        Name: 'BIRTAVARRE OG VÆRLANDET FORELDER',
        Type: 'Enterprise',
        OrganizationNumber: '910825560',
        OrganizationForm: 'AS',
        Status: 'Active',
        ParentOrganizationNumber: 'null',
    },
    {
        Name: 'SALTRØD FORELDER',
        Type: 'Enterprise',
        OrganizationNumber: '910825550',
        OrganizationForm: 'AS',
        Status: 'Active',
        ParentOrganizationNumber: 'null',
    },
    {
        Name: 'BIRTAVARRE OG VÆRLANDET FORELDER',
        Type: 'Enterprise',
        OrganizationNumber: '910825555',
        OrganizationForm: 'AS',
        Status: 'Active',
        ParentOrganizationNumber: 'null',
    },
    {
        Name: 'Bedriften Med Varig Lts',
        Type: 'Business',
        OrganizationNumber: '910712306',
        OrganizationForm: 'BEDR',
        Status: 'Active',
        ParentOrganizationNumber: '910825560',
    },
];
export const BrukerContext = React.createContext<InnloggetBruker>({
    identifikator: '',
    altinnOrganisasjoner: testAltinnOrganisasjon,
    tilganger: [],
});

const BrukerProvider: FunctionComponent = (props) => {
    const [innloggetBruker, setInnloggetBruker] = useState({});
    useEffect(() => {
        hent();
    }, []);

    const hent = async () => {
        const hentetInnloggetBruker = await hentInnloggetBruker();
        setInnloggetBruker(hentetInnloggetBruker);
    };

    const brukerContext: InnloggetBruker = {
        identifikator: '007',
        altinnOrganisasjoner: testAltinnOrganisasjon,
        tilganger: [],
    };

    return <BrukerContext.Provider value={brukerContext}>{props.children}</BrukerContext.Provider>;
};

export default BrukerProvider;
