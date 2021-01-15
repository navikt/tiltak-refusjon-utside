import { EkspanderbartpanelBase } from 'nav-frontend-ekspanderbartpanel';
import { Radio, RadioGruppe } from 'nav-frontend-skjema';
import React, { FunctionComponent, useEffect, useState } from 'react';
import { Status } from '../status';
import { Tiltak } from '../tiltak';
import { useFilter } from './FilterContext';
import { statusTekst } from '../../messages';
import { storForbokstav } from '../../utils/stringUtils';
import { useMediaQuery } from 'react-responsive';

const Filtermeny: FunctionComponent = () => {
    const { filter, oppdaterFilter } = useFilter();
    const ErDesktopStorrelse = useMediaQuery({ minWidth: 768 });
    const [statusPanelOpen, setStatusPanelOpen] = useState(ErDesktopStorrelse);
    const [tiltaksPanelOpen, setTiltaksPanelOpen] = useState(ErDesktopStorrelse);

    useEffect(() => {
        const setEkspanderPanelOpen = (): void => {
            setStatusPanelOpen(ErDesktopStorrelse);
            setTiltaksPanelOpen(ErDesktopStorrelse);
        };
        setEkspanderPanelOpen();
    }, [setStatusPanelOpen, setTiltaksPanelOpen, ErDesktopStorrelse]);

    return (
        <>
            <EkspanderbartpanelBase
                tittel="Status"
                apen={statusPanelOpen}
                collapseProps={{
                    isOpened: statusPanelOpen,
                }}
                onClick={(event) => {
                    setStatusPanelOpen(!statusPanelOpen);
                }}
                style={{ minWidth: '14.375rem' }}
            >
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
            </EkspanderbartpanelBase>
            <div style={{ marginTop: '1.25rem' }} />
            <EkspanderbartpanelBase
                tittel="Tiltakstype"
                apen={tiltaksPanelOpen}
                collapseProps={{ isOpened: tiltaksPanelOpen }}
                onClick={() => setTiltaksPanelOpen(!tiltaksPanelOpen)}
                style={{ minWidth: '14.375rem' }}
            >
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
            </EkspanderbartpanelBase>
        </>
    );
};

export default Filtermeny;
