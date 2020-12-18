import { Element, Innholdstittel, Normaltekst, Systemtittel } from 'nav-frontend-typografi';
import React, { FunctionComponent } from 'react';
import { useHistory } from 'react-router';
import { useParams } from 'react-router-dom';
import LagreKnapp from '../../../komponenter/LagreKnapp';
import VerticalSpacer from '../../../komponenter/VerticalSpacer';
import { tiltakstypeTekst } from '../../../messages';
import { gjorInntektsoppslag, useHentRefusjon } from '../../../services/rest-service';
import BEMHelper from '../../../utils/bem';
import { formatterDato } from '../../../utils/datoUtils';
import './StartSteg.less';

const cls = BEMHelper('startsteg');

const StartSteg: FunctionComponent = () => {
    const { refusjonId } = useParams();
    const refusjon = useHentRefusjon(refusjonId);
    const history = useHistory();

    const startRefusjon = async () => {
        await gjorInntektsoppslag(refusjonId);
        history.push({ pathname: `/refusjon/${refusjonId}/inntekt`, search: window.location.search });
    };

    return (
        <>
            <VerticalSpacer rem={2} />
            <div style={{ display: 'flex', justifyContent: 'center' }}>
                <div>
                    <Innholdstittel>
                        Refusjon av {tiltakstypeTekst[refusjon.tilskuddsgrunnlag.tiltakstype]}
                    </Innholdstittel>
                    <VerticalSpacer rem={2} />
                    <Element>Periode</Element>
                    <Normaltekst>
                        {formatterDato(refusjon.tilskuddsgrunnlag.tilskuddFom)} -{' '}
                        {formatterDato(refusjon.tilskuddsgrunnlag.tilskuddTom)}
                    </Normaltekst>
                    <VerticalSpacer rem={1} />
                    <Element>Deltaker</Element>
                    <Normaltekst>
                        {refusjon.tilskuddsgrunnlag.deltakerFornavn} {refusjon.tilskuddsgrunnlag.deltakerEtternavn}
                    </Normaltekst>
                    <VerticalSpacer rem={1} />
                    <Element>Ansvarlig i virksomheten</Element>
                    <Normaltekst>Kontaktpersonen i bedriften (mangler)</Normaltekst>
                    <Normaltekst>12345678 (mangler)</Normaltekst>
                    <VerticalSpacer rem={2} />
                    <div className={cls.element('infoboks')}>
                        <Systemtittel>Før du begynner</Systemtittel>
                        <VerticalSpacer rem={2} />
                        <Element>Slik fungerer det</Element>
                        <Normaltekst>
                            Lønnstilskudd skal kun dekke lønnsutgifter og ..... NAV bruker opplysninger dere har
                            rapportert i A-meldingen for å beregne hva dere har krav på i refusjon for perioden med
                            lønnstilskudd.
                        </Normaltekst>
                        <VerticalSpacer rem={1} />
                        <Element> Slik går du frem</Element>
                        <Normaltekst>
                            Se over at inntektsopplysningene vi har hentet stemmer. - Dersom dere ønsker å endre på noe
                            må dere gjøre det i A-meldingen. Sjekk hvilke opplysninger dere har rapportert i A-meldingen
                            her
                        </Normaltekst>
                    </div>
                    <VerticalSpacer rem={2} />
                    <LagreKnapp lagreFunksjon={startRefusjon} type="hoved">
                        Start
                    </LagreKnapp>
                </div>
            </div>
        </>
    );
};

export default StartSteg;
