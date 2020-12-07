import Ekspanderbartpanel from 'nav-frontend-ekspanderbartpanel';
import { Radio, RadioGruppe } from 'nav-frontend-skjema';
import React, { FunctionComponent } from 'react';
import { Status } from '../status';
import { Tiltak } from '../tiltak';
import { Filter, useFilter } from './FilterContext';

const Filtermeny: FunctionComponent = () => {
    const { filter, oppdaterFilter } = useFilter();

    const getNyttStatusFilter = (statusFilter: Status): Filter => ({
        status: statusFilter,
        tiltakstype: filter.tiltakstype,
    });
    const getNyttTiltakFilter = (tiltakFilter: Tiltak | undefined): Filter => ({
        status: filter.status,
        tiltakstype: tiltakFilter,
    });

    const setFilter = (event: React.ChangeEvent<HTMLInputElement>) => {
        switch (event.target.name) {
            case Status.UBEHANDLET:
                return oppdaterFilter(getNyttStatusFilter(Status.UBEHANDLET));
            case Status.BEHANDLET:
                return oppdaterFilter(getNyttStatusFilter(Status.BEHANDLET));
            case Tiltak.MENTOR:
                return oppdaterFilter(getNyttTiltakFilter(Tiltak.MENTOR));
            case Tiltak.MIDLERTIDIG_LØNNSTILSKUDD:
                return oppdaterFilter(getNyttTiltakFilter(Tiltak.MIDLERTIDIG_LØNNSTILSKUDD));
            case Tiltak.VARIG_LØNNSTILSKUDD:
                return oppdaterFilter(getNyttTiltakFilter(Tiltak.VARIG_LØNNSTILSKUDD));
            case 'ALLE':
                return oppdaterFilter(getNyttTiltakFilter(undefined));
            default:
                return oppdaterFilter({ status: Status.UBEHANDLET, tiltakstype: undefined });
        }
    };

    return (
        <>
            <Ekspanderbartpanel tittel="Status" apen={true}>
                <RadioGruppe legend="">
                    <Radio
                        label={'Ubehandlet'}
                        checked={filter.status === Status.UBEHANDLET}
                        name={Status.UBEHANDLET}
                        onChange={setFilter}
                    />
                    <Radio
                        label={'Behandlet'}
                        checked={filter.status === Status.BEHANDLET}
                        name={Status.BEHANDLET}
                        onChange={setFilter}
                    />
                </RadioGruppe>
            </Ekspanderbartpanel>
            <div style={{ marginTop: '1.25rem' }} />
            <Ekspanderbartpanel tittel="Tiltakstype" apen={true}>
                <RadioGruppe legend="">
                    <Radio label={'Alle'} name="ALLE" checked={filter.tiltakstype === undefined} onChange={setFilter} />
                    <Radio
                        label={'Mentor'}
                        name={Tiltak.MENTOR}
                        checked={filter.tiltakstype === Tiltak.MENTOR}
                        onChange={setFilter}
                    />
                    <Radio
                        label={'Midlertidig lønnstilskudd'}
                        checked={filter.tiltakstype === Tiltak.MIDLERTIDIG_LØNNSTILSKUDD}
                        name={Tiltak.MIDLERTIDIG_LØNNSTILSKUDD}
                        onChange={setFilter}
                    />
                    <Radio
                        label={'Varig lønnstilskudd'}
                        name={Tiltak.VARIG_LØNNSTILSKUDD}
                        checked={filter.tiltakstype === Tiltak.VARIG_LØNNSTILSKUDD}
                        onChange={setFilter}
                    />
                </RadioGruppe>
            </Ekspanderbartpanel>
        </>
    );
};

export default Filtermeny;
