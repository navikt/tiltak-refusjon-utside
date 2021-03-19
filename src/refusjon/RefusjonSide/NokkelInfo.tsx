import { Calender, FileContent, Money, People } from '@navikt/ds-icons';
import Lenke from 'nav-frontend-lenker';
import { Input } from 'nav-frontend-skjema';
import { Element, Normaltekst } from 'nav-frontend-typografi';
import React, { FunctionComponent } from 'react';
import { useParams } from 'react-router';
import styled from 'styled-components';
import { mutate } from 'swr';
import VerticalSpacer from '../../komponenter/VerticalSpacer';
import { setKid, useHentRefusjon } from '../../services/rest-service';
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
            <VerticalSpacer rem={1} />
            {/* <Input
                label="KID"
                value={refusjon.kidNummer}
                inputMode="numeric"
                pattern="[0-9]*"
                bredde="L"
                maxLength={25}
                onChange={(event) => {
                    refusjon.kidNummer = event.currentTarget.value;
                }}
                onBlur={() => setKid(refusjonId, refusjon.kidNummer)}
            /> */}
            <Input
                label="KID"
                value={refusjon.kidNummer}
                inputMode="numeric"
                pattern="[0-9]*"
                bredde="L"
                maxLength={25}
                onChange={(event) => {
                    mutate(`/refusjon/${refusjonId}`, { ...refusjon, kidNummer: event.target.value }, false);
                }}
                onBlur={() => setKid(refusjonId, refusjon.kidNummer)}
            />
        </div>
    );
};

export default NokkelInfo;
