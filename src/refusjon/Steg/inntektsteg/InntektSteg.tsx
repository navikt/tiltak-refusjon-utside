import { Knapp } from 'nav-frontend-knapper';
import { Innholdstittel, Normaltekst, Undertittel } from 'nav-frontend-typografi';
import React, { FunctionComponent } from 'react';
import { useParams } from 'react-router';
import LesMerPanel from '../../../komponenter/LesMerPanel/LesMerPanel';
import VerticalSpacer from '../../../komponenter/VerticalSpacer';
import { gjorInntektsoppslag, useHentRefusjon } from '../../../services/rest-service';
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
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <Innholdstittel role="tittel">Inntektsopplysninger</Innholdstittel>
                    <div>
                        <Knapp onClick={() => gjorInntektsoppslag(refusjonId)} mini>
                            Synkroniser opplysninger med A-meldingen
                        </Knapp>
                    </div>
                </div>
                <VerticalSpacer rem={2} />
                <Normaltekst>
                    Vi henter inntektsopplysninger for deltakeren fra A-meldingen. Dersom inntektsopplysningene ikke
                    stemmer må det endres der.
                </Normaltekst>
                <VerticalSpacer rem={1} />
                <LesMerPanel åpneLabel="Hvilke opplysninger henter vi?" lukkLabel="Lukk">
                    lalala
                </LesMerPanel>
                <VerticalSpacer rem={1} />
                <LesMerPanel åpneLabel="Hvilke opplysninger fører til reduksjon i refusjon?" lukkLabel="Lukk">
                    lalala
                </LesMerPanel>
                <LonnsOpplysninger refusjon={refusjon} />

                <VerticalSpacer rem={2} />

                <Undertittel>Slik fordeler inntektene seg</Undertittel>
                <VerticalSpacer rem={1} />
                <LesMerPanel
                    åpneLabel="Hvordan beregner vi lønnsintekter som er opparbeidet utenfor perioden?"
                    lukkLabel="Lukk"
                >
                    lalala
                </LesMerPanel>
                <VerticalSpacer rem={2} />

                <FordelingOversikt
                    inntektsgrunnlag={refusjon.inntektsgrunnlag}
                    tilskuddsgrunnlag={refusjon.tilskuddsgrunnlag}
                />

                {/* <UtbetalingsOpplysninger nettoMånedslønn={refusjon.nettoMånedslønn} /> */}
                {/* <UtbetalingsOpplysninger nettoMånedslønn={0} />
                {/* <FerieOgSykdomOpplysninger feriepenger={refusjon.feriepenger} sykepenger={refusjon.sykepenger} /> */}
                {/* <FerieOgSykdomOpplysninger feriepenger={0} sykepenger={0} /> */}
            </div>
        </>
    );
};

export default InntektSteg;
