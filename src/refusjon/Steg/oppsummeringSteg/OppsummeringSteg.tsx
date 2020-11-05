import React, { FunctionComponent, useState } from 'react';
import HvitBoks from '../../../komponenter/HvitBoks';
import LesMerPanel from '../../../komponenter/LesMerPanel/LesMerPanel';
import Ekspanderbartpanel from 'nav-frontend-ekspanderbartpanel';
import { Normaltekst, Systemtittel, Undertittel, Element } from 'nav-frontend-typografi';
import BEMHelper from '../../../utils/bem';
import './OppsummeringSteg.less';
import Utregning from './Utregning';
import { useParams } from 'react-router';
import { useHentRefusjon } from '../../../services/rest-service';
import { ReactComponent as Pengesedler } from '@/asset/image/pengesedler.svg';
import { formatterDato } from '../../../utils/datoUtils';
import VerticalSpacer from '../../../komponenter/VerticalSpacer';
import { BekreftCheckboksPanel } from 'nav-frontend-skjema';
import { Hovedknapp } from 'nav-frontend-knapper';
import { AlertStripeAdvarsel } from 'nav-frontend-alertstriper';

const cls = BEMHelper('oppsummering');

const OppsummeringSteg: FunctionComponent = () => {
    const { refusjonId } = useParams();
    const refusjon = useHentRefusjon(refusjonId);
    const [samtykker, setSamtykker] = useState<boolean>(false);
    const [alertStripe, setAlertStripe] = useState<boolean>(false);

    const fullforeRefusjon = () => {
        if (samtykker) {
            // TODO sett callbackfunksjon til backend med fullfør oppgave.
            return;
        }
        return setAlertStripe(true);
    };

    const bekrefterSamtykke = (bekreft: boolean) => {
        if (!samtykker) {
            setAlertStripe(false);
        }
        setSamtykker(bekreft);
    };

    return (
        <HvitBoks>
            <>
                <Systemtittel className={cls.element('tittel')}>Oppsummering</Systemtittel>
                <LesMerPanel
                    className={cls.element('lesmer')}
                    åpneLabel="Slik regner vi ut refusjonssgrunnlaget"
                    lukkLabel="lukk"
                >
                    Her kommer informasjon som bruker kan lese om.
                </LesMerPanel>
                <Ekspanderbartpanel tittel="Utregningen" apen={true}>
                    <Utregning
                        bruttolonn={refusjon.månedslønn}
                        fratrekkFerie={0}
                        sykepenger={refusjon.sykepenger}
                        sumLonnsgrunnlag={refusjon.månedslønn - refusjon.sykepenger}
                        satsFeriepenger={refusjon.satsFeriepenger}
                        feriepenger={refusjon.feriepenger}
                        satsOtp={refusjon.satsOtp}
                        belopOtp={refusjon.beløpOtp}
                        satsArbeidsgiveravgift={refusjon.satsArbeidsgiveravgift}
                        arbeidsgiverAvgift={refusjon.arbeidsgiveravgift}
                        sumRefusjonsgrunnlag={refusjon.refusjonPrMåned}
                    />
                </Ekspanderbartpanel>
                <div className={cls.element('summeringsboks')}>
                    <div className={cls.element('summering-ikon')}>
                        <Pengesedler />
                    </div>
                    <div className={cls.element('summering-tekst')}>
                        <Element>Dere søker om å få utbetalt</Element>
                        <VerticalSpacer rem={0.25} />
                        <Undertittel>{refusjon.refusjonPrMåned + ' '}kr</Undertittel>
                        <VerticalSpacer rem={0.25} />
                        <Normaltekst>
                            For perioden {`${formatterDato(refusjon.fraDato)} - ${formatterDato(refusjon.tilDato)}`}
                        </Normaltekst>
                    </div>
                </div>
                <BekreftCheckboksPanel
                    onChange={() => bekrefterSamtykke(!samtykker)}
                    checked={samtykker}
                    label="Jeg Bekrefter at Joe Biden blir USA neste president."
                />
                <div className={cls.element('bekreftelse', alertStripe ? 'ikkeBekreftet' : '')}>
                    <AlertStripeAdvarsel>
                        Mangler bekreftelse på at Joe Biden blir USA neste president.
                    </AlertStripeAdvarsel>
                </div>
                <Hovedknapp onClick={() => fullforeRefusjon()}>Fullfør</Hovedknapp>
            </>
        </HvitBoks>
    );
};

export default OppsummeringSteg;
