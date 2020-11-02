import React, { FunctionComponent } from 'react';
import Ekspanderbartpanel from 'nav-frontend-ekspanderbartpanel';
import { Radio, RadioGruppe } from 'nav-frontend-skjema';
import { useInnloggetBruker } from '../bruker/BrukerContext';
import { Filter, Status, Tiltak } from '../bruker/BrukerContextType';

const Filtermeny: FunctionComponent = () => {
    const context = useInnloggetBruker();
    const getNyttStatusFilter = (statusFilter: Status): Filter => ({
        status: statusFilter,
        tiltakstype: context.filter.tiltakstype,
    });
    const getNyttTiltakFilter = (tiltakFilter: Tiltak | undefined): Filter => ({
        status: context.filter.status,
        tiltakstype: tiltakFilter,
    });

    const setFilter = (event: React.ChangeEvent<HTMLInputElement>) => {
        switch (event.target.name) {
            case Status.UBEHANDLET:
                return context.oppdaterFilter(getNyttStatusFilter(Status.UBEHANDLET));
            case Status.BEHANDLET:
                return context.oppdaterFilter(getNyttStatusFilter(Status.BEHANDLET));
            case Tiltak.MENTOR:
                return context.oppdaterFilter(getNyttTiltakFilter(Tiltak.MENTOR));
            case Tiltak.MIDLETTIDIG_LØNNSTILSKUDD:
                return context.oppdaterFilter(getNyttTiltakFilter(Tiltak.MIDLETTIDIG_LØNNSTILSKUDD));
            case Tiltak.VARIG_LØNNSTILSKUDD:
                return context.oppdaterFilter(getNyttTiltakFilter(Tiltak.VARIG_LØNNSTILSKUDD));
            case 'ALLE':
                return context.oppdaterFilter(getNyttTiltakFilter(undefined));
            default:
                return context.oppdaterFilter({ status: Status.UBEHANDLET, tiltakstype: undefined });
        }
    };

    return (
        <>
            <Ekspanderbartpanel tittel="Status" apen={true}>
                <RadioGruppe legend="">
                    <Radio
                        label={'Ubehandlet'}
                        checked={context.filter.status === Status.UBEHANDLET}
                        name={Status.UBEHANDLET}
                        onChange={setFilter}
                    />
                    <Radio
                        label={'Behandlet'}
                        checked={context.filter.status === Status.BEHANDLET}
                        name={Status.BEHANDLET}
                        onChange={setFilter}
                    />
                </RadioGruppe>
            </Ekspanderbartpanel>
            <div style={{ marginTop: '1.25rem' }} />
            <Ekspanderbartpanel tittel="Tiltakstype" apen={true}>
                <RadioGruppe legend="">
                    <Radio
                        label={'Alle'}
                        name="ALLE"
                        checked={context.filter.tiltakstype === undefined}
                        onChange={setFilter}
                    />
                    <Radio
                        label={'Mentor'}
                        name={Tiltak.MENTOR}
                        checked={context.filter.tiltakstype === Tiltak.MENTOR}
                        onChange={setFilter}
                    />
                    <Radio
                        label={'Midlertidig lønnstilskudd'}
                        checked={context.filter.tiltakstype === Tiltak.MIDLETTIDIG_LØNNSTILSKUDD}
                        name={Tiltak.MIDLETTIDIG_LØNNSTILSKUDD}
                        onChange={setFilter}
                    />
                    <Radio
                        label={'Varig lønnstilskudd'}
                        name={Tiltak.VARIG_LØNNSTILSKUDD}
                        checked={context.filter.tiltakstype === Tiltak.VARIG_LØNNSTILSKUDD}
                        onChange={setFilter}
                    />
                </RadioGruppe>
            </Ekspanderbartpanel>
        </>
    );
};

export default Filtermeny;
