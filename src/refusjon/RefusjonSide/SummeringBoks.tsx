import { ReactComponent as Pengesedler } from '@/asset/image/pengesedler.svg';
import { Element, Normaltekst } from 'nav-frontend-typografi';
import React, { FunctionComponent } from 'react';
import { useParams } from 'react-router';
import styled from 'styled-components';
import VerticalSpacer from '../../komponenter/VerticalSpacer';
import { useHentRefusjon } from '../../services/rest-service';
import { formatterPeriode } from '../../utils/datoUtils';
import { formatterPenger } from '../../utils/PengeUtils';

const SummeringBoks: FunctionComponent = () => {
    const { refusjonId } = useParams();
    const refusjon = useHentRefusjon(refusjonId);

    const SummeringBoks = styled.div`
        display: flex;
        flex-direction: row;
        border: 3px solid #cce1f3;
        border-radius: 4px;
        padding: 1.75rem;
    `;

    return (
        <SummeringBoks>
            <div style={{ paddingRight: '1.5rem' }}>
                <Pengesedler />
            </div>
            <div>
                <Element>Dere får utbetalt</Element>
                <VerticalSpacer rem={0.5} />
                <Normaltekst>
                    <b>{formatterPenger(refusjon.beregning?.refusjonsbeløp || 0)}</b> for perioden{' '}
                    {formatterPeriode(refusjon.tilskuddsgrunnlag.tilskuddFom, refusjon.tilskuddsgrunnlag.tilskuddTom)}
                </Normaltekst>
            </div>
        </SummeringBoks>
    );
};

export default SummeringBoks;
