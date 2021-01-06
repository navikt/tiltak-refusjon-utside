import Ekspanderbartpanel from 'nav-frontend-ekspanderbartpanel';
import { Radio, RadioGruppe } from 'nav-frontend-skjema';
import React, { FunctionComponent } from 'react';
import { Status } from '../status';
import { Tiltak } from '../tiltak';
import { useFilter } from './FilterContext';
import { statusTekst } from '../../messages';
import { storForbokstav } from '../../utils/stringUtils';

const Filtermeny: FunctionComponent = () => {
    const { filter, oppdaterFilter } = useFilter();

    return (
        <>
            <Ekspanderbartpanel tittel="Status" apen={true}>
                <RadioGruppe legend="">
                    <Radio
                        label={storForbokstav(statusTekst[Status.NY])}
                        checked={filter.status === Status.NY}
                        name={'status'}
                        onChange={() => oppdaterFilter({ status: Status.NY })}
                    />
                    <Radio
                        label={storForbokstav(statusTekst[Status.BEREGNET])}
                        checked={filter.status === Status.BEREGNET}
                        name={'status'}
                        onChange={() => oppdaterFilter({ status: Status.BEREGNET })}
                    />
                    <Radio
                        label={storForbokstav(statusTekst[Status.KRAV_FREMMET])}
                        checked={filter.status === Status.KRAV_FREMMET}
                        name={'status'}
                        onChange={() => oppdaterFilter({ status: Status.KRAV_FREMMET })}
                    />
                    <Radio
                        label={storForbokstav(statusTekst[Status.BEHANDLET])}
                        checked={filter.status === Status.BEHANDLET}
                        name={'status'}
                        onChange={() => oppdaterFilter({ status: Status.BEHANDLET })}
                    />
                    <Radio
                        label={storForbokstav(statusTekst[Status.AVSLÅTT])}
                        checked={filter.status === Status.AVSLÅTT}
                        name={'status'}
                        onChange={() => oppdaterFilter({ status: Status.AVSLÅTT })}
                    />
                    <Radio
                        label={storForbokstav(statusTekst[Status.UTBETALT])}
                        checked={filter.status === Status.UTBETALT}
                        name={'status'}
                        onChange={() => oppdaterFilter({ status: Status.UTBETALT })}
                    />
                    <Radio
                        label={storForbokstav(statusTekst[Status.UTGÅTT])}
                        checked={filter.status === Status.UTGÅTT}
                        name={'status'}
                        onChange={() => oppdaterFilter({ status: Status.UTGÅTT })}
                    />
                </RadioGruppe>
            </Ekspanderbartpanel>
            <div style={{ marginTop: '1.25rem' }} />
            <Ekspanderbartpanel tittel="Tiltakstype" apen={true}>
                <RadioGruppe legend="">
                    <Radio
                        label={'Alle'}
                        name="ALLE"
                        checked={filter.tiltakstype === undefined}
                        onChange={() => oppdaterFilter({ tiltakstype: undefined })}
                    />
                    <Radio
                        label={'Mentor'}
                        name={Tiltak.MENTOR}
                        checked={filter.tiltakstype === Tiltak.MENTOR}
                        onChange={() => oppdaterFilter({ tiltakstype: Tiltak.MENTOR })}
                    />
                    <Radio
                        label={'Midlertidig lønnstilskudd'}
                        checked={filter.tiltakstype === Tiltak.MIDLERTIDIG_LØNNSTILSKUDD}
                        name={Tiltak.MIDLERTIDIG_LØNNSTILSKUDD}
                        onChange={() => oppdaterFilter({ tiltakstype: Tiltak.MIDLERTIDIG_LØNNSTILSKUDD })}
                    />
                    <Radio
                        label={'Varig lønnstilskudd'}
                        name={Tiltak.VARIG_LØNNSTILSKUDD}
                        checked={filter.tiltakstype === Tiltak.VARIG_LØNNSTILSKUDD}
                        onChange={() => oppdaterFilter({ tiltakstype: Tiltak.VARIG_LØNNSTILSKUDD })}
                    />
                </RadioGruppe>
            </Ekspanderbartpanel>
        </>
    );
};

export default Filtermeny;
