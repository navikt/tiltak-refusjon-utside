import { ReactComponent as Pengesedler } from '@/asset/image/pengesedler.svg';
import { AlertStripeAdvarsel } from 'nav-frontend-alertstriper';
import Ekspanderbartpanel from 'nav-frontend-ekspanderbartpanel';
import { Hovedknapp } from 'nav-frontend-knapper';
import { BekreftCheckboksPanel } from 'nav-frontend-skjema';
import { Element, Innholdstittel, Normaltekst } from 'nav-frontend-typografi';
import React, { FunctionComponent, useState } from 'react';
import { useHistory, useParams } from 'react-router';
import LesMerPanel from '../../../komponenter/LesMerPanel/LesMerPanel';
import VerticalSpacer from '../../../komponenter/VerticalSpacer';
import { godkjennRefusjon, useHentRefusjon } from '../../../services/rest-service';
import BEMHelper from '../../../utils/bem';
import { formatterPeriode } from '../../../utils/datoUtils';
import { formatterPenger } from '../../../utils/PengeUtils';
import './OppsummeringSteg.less';
import Utregning from './Utregning';

const cls = BEMHelper('oppsummering');

const OppsummeringSteg: FunctionComponent = () => {
    const { refusjonId } = useParams();
    const refusjon = useHentRefusjon(refusjonId);
    const [samtykker, setSamtykker] = useState<boolean>(false);
    const [alertStripe, setAlertStripe] = useState<boolean>(false);
    const history = useHistory();

    const fullforeRefusjon = async () => {
        if (samtykker) {
            try {
                await godkjennRefusjon(refusjonId);
                history.push({ pathname: `/refusjon/${refusjon.id}/kvittering`, search: window.location.search });
            } catch (error) {
                console.log('feil');
                throw error;
            }
        }
        return setAlertStripe(true);
    };

    const bekrefterSamtykke = (bekreft: boolean) => {
        if (!samtykker) {
            setAlertStripe(false);
        }
        setSamtykker(bekreft);
    };

    if (!refusjon.beregning) {
        return null;
    }

    return (
        <>
            <VerticalSpacer rem={2} />
            <Innholdstittel>Oppsummering</Innholdstittel>
            <VerticalSpacer rem={1} />
            <LesMerPanel
                className={cls.element('lesmer')}
                åpneLabel="Slik regner vi ut refusjonssgrunnlaget"
                lukkLabel="lukk"
            >
                Her kommer informasjon som bruker kan lese om.
            </LesMerPanel>
            <Ekspanderbartpanel tittel="Utregningen" apen={true}>
                <Utregning
                    bruttolonn={refusjon.beregning.lønn}
                    fratrekkFerie={refusjon.beregning.feriepenger}
                    sykepenger={0}
                    sumLonnsgrunnlag={0}
                    satsFeriepenger={refusjon.tilskuddsgrunnlag.feriepengerSats}
                    feriepenger={refusjon.beregning.feriepenger}
                    satsOtp={refusjon.tilskuddsgrunnlag.otpSats}
                    belopOtp={refusjon.beregning.tjenestepensjon}
                    satsArbeidsgiveravgift={refusjon.tilskuddsgrunnlag.arbeidsgiveravgiftSats}
                    arbeidsgiverAvgift={refusjon.beregning.arbeidsgiveravgift}
                    sumRefusjonsgrunnlag={refusjon.beregning.sumUtgifter}
                    lonnstilskuddsprosent={refusjon.tilskuddsgrunnlag.lønnstilskuddsprosent}
                    refusjonsbeløp={refusjon.beregning.refusjonsbeløp}
                />
            </Ekspanderbartpanel>
            <div className={cls.element('summeringsboks')}>
                <div className={cls.element('summering-ikon')}>
                    <Pengesedler />
                </div>
                <div className={cls.element('summering-tekst')}>
                    <Element>Dere søker om å få utbetalt</Element>
                    <VerticalSpacer rem={0.5} />
                    <Normaltekst>
                        <b>{formatterPenger(refusjon.beregning.refusjonsbeløp)}</b> for perioden{' '}
                        {formatterPeriode(
                            refusjon.tilskuddsgrunnlag.tilskuddFom,
                            refusjon.tilskuddsgrunnlag.tilskuddTom
                        )}
                    </Normaltekst>
                </div>
            </div>
            <BekreftCheckboksPanel
                onChange={() => bekrefterSamtykke(!samtykker)}
                checked={samtykker}
                label="Jeg bekrefter at opplysningene er korrekte."
            />
            <div className={cls.element('bekreftelse', alertStripe ? 'ikkeBekreftet' : '')}>
                <AlertStripeAdvarsel>Mangler bekreftelse på at opplysningene er korrekte.</AlertStripeAdvarsel>
            </div>
            <Hovedknapp onClick={() => fullforeRefusjon()}>Fullfør</Hovedknapp>
        </>
    );
};

export default OppsummeringSteg;
