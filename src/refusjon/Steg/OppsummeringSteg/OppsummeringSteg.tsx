import { ReactComponent as Pengesedler } from '@/asset/image/pengesedler.svg';
import Ekspanderbartpanel from 'nav-frontend-ekspanderbartpanel';
import { BekreftCheckboksPanel } from 'nav-frontend-skjema';
import { Element, Innholdstittel, Normaltekst } from 'nav-frontend-typografi';
import React, { FunctionComponent, useState } from 'react';
import { useHistory, useParams } from 'react-router';
import LagreKnapp from '../../../komponenter/LagreKnapp';
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
            <Innholdstittel role="heading">Oppsummering</Innholdstittel>
            <VerticalSpacer rem={1} />
            <LesMerPanel
                className={cls.element('lesmer')}
                åpneLabel="Slik regner vi ut refusjonssgrunnlaget"
                lukkLabel="lukk"
            >
                <Element>Slik regner vi ut refusjonssgrunnlaget</Element>
                <p>
                    Lønnstilskudd gis i form av en fast prosentvis lønnsrefusjon, som utmåles på grunnlag av faktisk
                    stillingsprosent. Refusjonsgrunnlaget består av utbetalt lønn, feriepenger, arbeidsgiveravgift av
                    lønnen og feriepengene og innskudd til obligatorisk tjenestepensjon.
                </p>
                <p>
                    Med lønn forstås timelønn eller månedslønn for arbeid utført i normalarbeidstiden, samt lønnsmessige
                    tillegg etter oppsatt tjenesteplan for stillingen. Arbeidsgivers overtidsbetaling og andre variable
                    tillegg skal ikke med i refusjonsgrunnlaget.
                </p>
            </LesMerPanel>
            <Ekspanderbartpanel tittel="Utregningen" apen={true} aria-label="utregningspanel for refusjon">
                <Utregning refusjon={refusjon} />
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
                className={cls.element('bekrefthandling')}
                onChange={() => bekrefterSamtykke(!samtykker)}
                checked={samtykker}
                label="Jeg bekrefter at opplysningene er korrekte."
                feil={alertStripe ? 'Du må samtykke at opplysningene er riktig, før du kan sende inn skjemaet.' : null}
            />
            <LagreKnapp type="hoved" lagreFunksjon={() => fullforeRefusjon()}>
                Fullfør
            </LagreKnapp>
        </>
    );
};

export default OppsummeringSteg;
