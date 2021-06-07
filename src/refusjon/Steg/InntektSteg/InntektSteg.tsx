import { Element, Innholdstittel, Normaltekst } from 'nav-frontend-typografi';
import React, { FunctionComponent } from 'react';
import { useParams } from 'react-router';
import LesMerPanel from '../../../komponenter/LesMerPanel/LesMerPanel';
import VerticalSpacer from '../../../komponenter/VerticalSpacer';
import { useHentRefusjon } from '../../../services/rest-service';
import BEMHelper from '../../../utils/bem';
import FordelingOversikt from './fordelingOversikt/FordelingOversikt';
import './InntektSteg.less';
import LonnsOpplysninger from './LonnsOpplysninger';

export const INNTEKTSTEGCLASSNAME = 'inntektsteg';

const InntektSteg: FunctionComponent = () => {
    const cls = BEMHelper(INNTEKTSTEGCLASSNAME);
    const { refusjonId } = useParams();
    const refusjon = useHentRefusjon(refusjonId);

    return (
        <>
            <VerticalSpacer rem={2} />
            <div className={cls.className}>
                <Innholdstittel role="heading">Inntektsopplysninger</Innholdstittel>
                <VerticalSpacer rem={1.5} />
                <Normaltekst>
                    Vi henter inntektsopplysninger for deltakeren fra a-meldingen. Dersom inntektsopplysningene ikke
                    stemmer må det endres der.
                </Normaltekst>
                <VerticalSpacer rem={1} />
                <LesMerPanel åpneLabel="Hvilke opplysninger henter vi?" lukkLabel="Lukk">
                    <Element>Hvilke opplysninger henter vi?</Element>I refusjonsgrunnlaget inngår lønn for arbeid utført
                    i normalarbeidstiden inkludert faste tillegg. Overtidsbetaling og andre variable tillegg skal ikke
                    tas med. Faste tillegg er knyttet til personlige egenskaper, evner eller ansvar og utbetales
                    regelmessig ved hver lønnsutbetaling. Beløpet er en fast størrelse og gjelder blant annet:
                    <ul>
                        <li>b-tillegg</li>
                        <li>stabiliseringstillegg</li>
                        <li>selektivt tillegg for sykepleiere</li>
                        <li>tillegg for ansvarsvakter, fagansvar og lederansvar</li>
                        <li>kvalifikasjons-/kompetansetillegg</li>
                    </ul>
                    Dette gjelder ikke:
                    <ul>
                        <li>skift-, turnus- og vakttillegg</li>
                        <li>offshoretillegg</li>
                    </ul>
                </LesMerPanel>

                <VerticalSpacer rem={1} />

                <LesMerPanel åpneLabel="Hvilke opplysninger fører til reduksjon i refusjon?" lukkLabel="Lukk">
                    <Element>Hvilke opplysninger fører til reduksjon i refusjon?</Element>

                    <ul>
                        <li>
                            Hvis arbeidstakeren har hatt sykefravær som gir rett til refusjon, skal dette trekkes fra
                            beregningsgrunnlaget.
                        </li>
                        <li>
                            Hvis arbeidstakeren har fått utbetalt feriepenger i perioden, skal dette trekkes fra
                            beregningsgrunnlaget.
                        </li>
                    </ul>
                </LesMerPanel>

                <LonnsOpplysninger refusjon={refusjon} refusjonId={refusjonId} />
                <VerticalSpacer rem={2} />
                <FordelingOversikt
                    inntektsgrunnlag={refusjon.inntektsgrunnlag}
                    tilskuddsgrunnlag={refusjon.tilskuddsgrunnlag}
                />
            </div>
        </>
    );
};

export default InntektSteg;
