import { EkspanderbartpanelBase } from 'nav-frontend-ekspanderbartpanel';
import { Radio, RadioGruppe } from 'nav-frontend-skjema';
import React, { FunctionComponent, useEffect, useState } from 'react';
import { useMediaQuery } from 'react-responsive';
import { statusTekst } from '../../messages';
import { storForbokstav } from '../../utils/stringUtils';
import { Status } from '../status';
import { Tiltak } from '../tiltak';
import { useFilter } from './FilterContext';

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
        <div role="menubar" aria-label="filtermeny for filtrering av refusjon på status og tiltakstype">
            <EkspanderbartpanelBase
                tittel="Status"
                role="radiogroup"
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
                        role="radio"
                        label="Alle"
                        checked={filter.status === undefined}
                        name={'status'}
                        onChange={() => oppdaterFilter({ status: undefined })}
                    />
                    <Radio
                        role="radio"
                        label={storForbokstav(statusTekst[Status.NY])}
                        checked={filter.status === Status.NY}
                        name={'status'}
                        onChange={() => oppdaterFilter({ status: Status.NY })}
                    />
                    <Radio
                        role="radio"
                        label={storForbokstav(statusTekst[Status.BEREGNET])}
                        checked={filter.status === Status.BEREGNET}
                        name={'status'}
                        onChange={() => oppdaterFilter({ status: Status.BEREGNET })}
                    />
                    <Radio
                        role="radio"
                        label={storForbokstav(statusTekst[Status.ANNULLERT])}
                        checked={filter.status === Status.ANNULLERT}
                        name={'status'}
                        onChange={() => oppdaterFilter({ status: Status.ANNULLERT })}
                    />
                    <Radio
                        role="radio"
                        label={storForbokstav(statusTekst[Status.KRAV_FREMMET])}
                        checked={filter.status === Status.KRAV_FREMMET}
                        name={'status'}
                        onChange={() => oppdaterFilter({ status: Status.KRAV_FREMMET })}
                    />
                    <Radio
                        role="radio"
                        label={storForbokstav(statusTekst[Status.UTBETALT])}
                        checked={filter.status === Status.UTBETALT}
                        name={'status'}
                        onChange={() => oppdaterFilter({ status: Status.UTBETALT })}
                    />
                    <Radio
                        role="radio"
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
                role="radiogroup"
                apen={tiltaksPanelOpen}
                collapseProps={{ isOpened: tiltaksPanelOpen }}
                onClick={() => setTiltaksPanelOpen(!tiltaksPanelOpen)}
                style={{ minWidth: '14.375rem' }}
            >
                <RadioGruppe legend="">
                    <Radio
                        role="radio"
                        label={'Alle'}
                        name="ALLE"
                        checked={filter.tiltakstype === undefined}
                        onChange={() => oppdaterFilter({ tiltakstype: undefined })}
                    />
                    <Radio
                        role="radio"
                        label={'Mentor'}
                        name={Tiltak.MENTOR}
                        checked={filter.tiltakstype === Tiltak.MENTOR}
                        onChange={() => oppdaterFilter({ tiltakstype: Tiltak.MENTOR })}
                    />
                    <Radio
                        role="radio"
                        label={'Midlertidig lønnstilskudd'}
                        checked={filter.tiltakstype === Tiltak.MIDLERTIDIG_LØNNSTILSKUDD}
                        name={Tiltak.MIDLERTIDIG_LØNNSTILSKUDD}
                        onChange={() => oppdaterFilter({ tiltakstype: Tiltak.MIDLERTIDIG_LØNNSTILSKUDD })}
                    />
                    <Radio
                        role="radio"
                        label={'Varig lønnstilskudd'}
                        name={Tiltak.VARIG_LØNNSTILSKUDD}
                        checked={filter.tiltakstype === Tiltak.VARIG_LØNNSTILSKUDD}
                        onChange={() => oppdaterFilter({ tiltakstype: Tiltak.VARIG_LØNNSTILSKUDD })}
                    />
                </RadioGruppe>
            </EkspanderbartpanelBase>
        </div>
    );
};

export default Filtermeny;
