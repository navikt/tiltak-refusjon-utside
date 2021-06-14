import { Calender, File, FileContent, Money, People } from '@navikt/ds-icons';
import { Element, Normaltekst } from 'nav-frontend-typografi';
import React, { FunctionComponent } from 'react';
import { useParams } from 'react-router';
import styled from 'styled-components';
import EksternLenke from '../../komponenter/EksternLenke/EksternLenke';
import VerticalSpacer from '../../komponenter/VerticalSpacer';
import { tiltakstypeTekst } from '../../messages';
import { useHentRefusjon } from '../../services/rest-service';
import { formatterPeriode } from '../../utils/datoUtils';
import { formatterPenger } from '../../utils/PengeUtils';
import { Knapp } from 'nav-frontend-knapper';

const IkonRad = styled.div`
    display: flex;
    * {
        margin-right: 0.5rem;
    }
`;

const NokkelInfo: FunctionComponent = () => {
    const { refusjonId } = useParams();
    const refusjon = useHentRefusjon(refusjonId);

    const avtaleLenke = `http://arbeidsgiver.nav.no/tiltaksgjennomforing/avtale/${refusjon.tilskuddsgrunnlag.avtaleId}`;

    return (
        <div>
            <IkonRad>
                <EksternLenke href={avtaleLenke}>
                    <File />
                    Avtale om {tiltakstypeTekst[refusjon.tilskuddsgrunnlag.tiltakstype]}
                </EksternLenke>
            </IkonRad>
            <VerticalSpacer rem={1} />
            <IkonRad>
                <People />
                <Element>Deltaker: </Element>
                <Normaltekst>
                    {refusjon.tilskuddsgrunnlag.deltakerFornavn} {refusjon.tilskuddsgrunnlag.deltakerEtternavn}
                </Normaltekst>
            </IkonRad>
            <VerticalSpacer rem={1} />
            <IkonRad>
                <Calender />
                <Element>Periode: </Element>
                <Normaltekst>
                    {formatterPeriode(refusjon.tilskuddsgrunnlag.tilskuddFom, refusjon.tilskuddsgrunnlag.tilskuddTom)}
                </Normaltekst>
            </IkonRad>
            <VerticalSpacer rem={1} />
            <IkonRad>
                <FileContent />
                <Element>Avtalt beløp for perioden:</Element>
                <Normaltekst>Inntil {formatterPenger(refusjon.tilskuddsgrunnlag.tilskuddsbeløp)}</Normaltekst>
            </IkonRad>
            <VerticalSpacer rem={1} />
            <IkonRad>
                <Money />
                <Element>Kontonummer:</Element>
                <Normaltekst>(mangler)</Normaltekst>
            </IkonRad>
        </div>
    );
};

export default NokkelInfo;
