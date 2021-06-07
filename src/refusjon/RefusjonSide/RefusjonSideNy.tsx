import { BekreftCheckboksPanel } from 'nav-frontend-skjema';
import { Innholdstittel, Normaltekst } from 'nav-frontend-typografi';
import React, { FunctionComponent, useState } from 'react';
import { useHistory, useParams } from 'react-router';
import EksternLenke from '../../komponenter/EksternLenke/EksternLenke';
import HvitBoks from '../../komponenter/hvitboks/HvitBoks';
import LagreKnapp from '../../komponenter/LagreKnapp';
import VerticalSpacer from '../../komponenter/VerticalSpacer';
import { godkjennRefusjon, useHentRefusjon } from '../../services/rest-service';
import BEMHelper from '../../utils/bem';
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
            <Innholdstittel role="heading">Beregning av refusjon</Innholdstittel>

            <VerticalSpacer rem={1} />
            <Normaltekst>
                Vi henter inntektsopplysninger for deltakeren fra a-meldingen automatisk. Hvis inntektsopplysningene
                ikke stemmer så må det{' '}
                <EksternLenke href={'https://www.altinn.no/skjemaoversikt/a-ordningen/a-melding2/'}>
                    oppdateres i A-meldingen hos Altinn.
                </EksternLenke>
                Feriepenger, innskudd obligatorisk tjenestepensjon, arbeidsgiveravgiften og lønnstilskuddsprosenten er
                hentet fra avtalen om midlertidig lønnstilskudd.
            </Normaltekst>
            <VerticalSpacer rem={2} />
            <NokkelInfo />
            <VerticalSpacer rem={2} />
            <UtregningNy refusjon={refusjon} />

            <VerticalSpacer rem={4} />

            <SummeringBoks />

            <VerticalSpacer rem={1} />

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
