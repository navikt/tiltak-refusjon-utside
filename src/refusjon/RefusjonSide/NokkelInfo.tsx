import { Calender, FileContent, Money, People } from '@navikt/ds-icons';
import Lenke from 'nav-frontend-lenker';
import { Element, Normaltekst } from 'nav-frontend-typografi';
import React, { FunctionComponent } from 'react';
import { useParams } from 'react-router';
import styled from 'styled-components';
import VerticalSpacer from '../../komponenter/VerticalSpacer';
import { useHentRefusjon } from '../../services/rest-service';
import { formatterPeriode } from '../../utils/datoUtils';
import { formatterPenger } from '../../utils/PengeUtils';

const NokkelInfo: FunctionComponent = () => {
    const { refusjonId } = useParams();
    const refusjon = useHentRefusjon(refusjonId);

    const IkonRad = styled.div`
        display: flex;
        * {
            margin-right: 0.5rem;
        }
    `;

    return (
        <div>
            <IkonRad>
                <People />
                <Element>Deltaker: </Element>
                <Normaltekst>{`${refusjon.tilskuddsgrunnlag.deltakerFornavn} ${refusjon.tilskuddsgrunnlag.deltakerEtternavn}`}</Normaltekst>
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
                <Normaltekst>LALALA Må sendes med</Normaltekst>
            </IkonRad>
            <Lenke href="#">Hvis Kontonummeret er feil</Lenke>
        </div>
    );
};

export default NokkelInfo;
