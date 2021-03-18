import { Knapp } from 'nav-frontend-knapper';
import { BekreftCheckboksPanel, Input } from 'nav-frontend-skjema';
import { Innholdstittel, Normaltekst, Undertittel } from 'nav-frontend-typografi';
import React, { FunctionComponent, useState } from 'react';
import { useHistory, useParams } from 'react-router';
import EksternLenke from '../../komponenter/EksternLenke/EksternLenke';
import HvitBoks from '../../komponenter/hvitboks/HvitBoks';
import LagreKnapp from '../../komponenter/LagreKnapp';
import VerticalSpacer from '../../komponenter/VerticalSpacer';
import { godkjennRefusjon, useHentRefusjon } from '../../services/rest-service';
import BEMHelper from '../../utils/bem';
import { formatterDato, NORSK_DATO_OG_TID_FORMAT } from '../../utils/datoUtils';
import '../Steg/OppsummeringSteg/OppsummeringSteg.less';
import UtregningNy from '../Steg/OppsummeringSteg/UtregningNy';
import NokkelInfo from './NokkelInfo';
import './RefusjonSide.less';
import SummeringBoks from './SummeringBoks';

type Props = {};

const RefusjonSideNy: FunctionComponent<Props> = (props) => {
    const history = useHistory();
    const { refusjonId } = useParams();
    const refusjon = useHentRefusjon(refusjonId);
    const [bekrefetKorrekteOpplysninger, setBekrefetKorrekteOpplysninger] = useState(false);
    const [ikkeBekreftetFeilmelding, seTikkeBekreftetFeilmelding] = useState('');

    const cls = BEMHelper('refusjonside');

    const bekreftOpplysninger = () => {
        setBekrefetKorrekteOpplysninger(!bekrefetKorrekteOpplysninger);
        seTikkeBekreftetFeilmelding('');
    };
    const fullførRefusjon = async () => {
        if (bekrefetKorrekteOpplysninger) {
            try {
                await godkjennRefusjon(refusjonId);
                history.push({ pathname: `/refusjon/${refusjon.id}/kvittering`, search: window.location.search });
            } catch (error) {
                console.log('feil');
                throw error;
            }
        } else {
            seTikkeBekreftetFeilmelding('Du må samtykke at opplysningene er riktig, før du kan sende inn skjemaet.');
        }
    };

    if (!refusjon.inntektsgrunnlag) {
        return null;
    }

    return (
        <HvitBoks>
            <VerticalSpacer rem={2} />
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <Innholdstittel role="heading">Beregning av refusjon</Innholdstittel>
                <Knapp mini>Lagre som PDF</Knapp>
            </div>
            <VerticalSpacer rem={1} />
            <Normaltekst>
                Vi henter inntektsopplysninger for deltakeren fra A-meldingen automatisk. Feriepenger, innskudd
                obligatorisk tjenestepensjon, arbeidsgiveravgiften og lønnstilskuddsprosenten er hentet fra avtalen om
                midlertidig lønnstilskudd.
            </Normaltekst>
            <VerticalSpacer rem={2} />
            <NokkelInfo />
            <VerticalSpacer rem={2} />
            <UtregningNy refusjon={refusjon} />
            <VerticalSpacer rem={2} />
            <Undertittel>Hvis inntektsopplysningene ikke stemmer så må det oppdateres i A-meldingen</Undertittel>
            <VerticalSpacer rem={1} />
            <ul>
                <li>
                    Du må først endre inntektsopplysningene{' '}
                    <EksternLenke href="https://www.skatteetaten.no/bedrift-og-organisasjon/arbeidsgiver/a-meldingen/" />{' '}
                    i A-meldingen hos Altinn
                </li>
                <li>
                    Når du har oppdatert og sendt inn ny A-melding, så kan du trykke på knappen under “Oppdater
                    opplysninger fra A-meldingen”
                </li>
            </ul>
            <Knapp>Oppdater opplysninger fra A-meldingen</Knapp>
            <p>Sist hentet: {formatterDato(refusjon.inntektsgrunnlag.innhentetTidspunkt, NORSK_DATO_OG_TID_FORMAT)}</p>
            <VerticalSpacer rem={2} />
            <Undertittel>Hvis kontonummeret ikke stemmer så må det oppdateres hos Altinn.</Undertittel>
            <ul>
                <li>
                    Du må først endre kontonummeret hos{' '}
                    <EksternLenke href="https://www.altinn.no/skjemaoversikt/arbeids--og-velferdsetaten-nav/bankkontonummer-for-refusjoner-fra-nav-til-arbeidsgiver/">
                        Altinn
                    </EksternLenke>
                </li>
                <li>Når du har oppdatert kontonummeret, så kan du trykke på knappen “Hent kontonummer fra Altinn”</li>
            </ul>
            <Knapp>Oppdater kontonummer fra altinn</Knapp>

            <VerticalSpacer rem={4} />
            <SummeringBoks />
            <VerticalSpacer rem={2} />

            <BekreftCheckboksPanel
                className={cls.element('bekrefthandling')}
                onChange={() => bekreftOpplysninger()}
                checked={bekrefetKorrekteOpplysninger}
                label="Jeg bekrefter at opplysningene er korrekte."
                feil={ikkeBekreftetFeilmelding}
            />
            <VerticalSpacer rem={2} />
            <LagreKnapp type="hoved" lagreFunksjon={() => fullførRefusjon()}>
                Fullfør
            </LagreKnapp>
        </HvitBoks>
    );
};

export default RefusjonSideNy;
