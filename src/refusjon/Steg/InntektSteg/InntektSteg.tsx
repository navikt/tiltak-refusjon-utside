import { Innholdstittel, Normaltekst } from 'nav-frontend-typografi';
import React, { FunctionComponent } from 'react';
import { useParams } from 'react-router';
import LagreKnapp from '../../../komponenter/LagreKnapp';
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
                <Innholdstittel role="tittel">Inntektsopplysninger</Innholdstittel>
                <VerticalSpacer rem={1.5} />
                <Normaltekst>
                    Vi henter inntektsopplysninger for deltakeren fra A-meldingen. Dersom inntektsopplysningene ikke
                    stemmer må det endres der.
                </Normaltekst>
                <VerticalSpacer rem={1} />
                <LesMerPanel åpneLabel="Hvilke opplysninger henter vi?" lukkLabel="Lukk">
                    Her kommer informasjon rundt opplysninger nav innhenter.
                </LesMerPanel>
                <VerticalSpacer rem={1} />
                <LesMerPanel åpneLabel="Hvilke opplysninger fører til reduksjon i refusjon?" lukkLabel="Lukk">
                    Her kommer informasjon hvilken opplysninger som fører til reduksjon av refusjoner.
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
