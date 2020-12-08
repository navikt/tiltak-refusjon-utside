import React, { FunctionComponent } from 'react';
import { getMåned, getMånederMellom } from '../../../utils/datoUtils';
import { Inntektsgrunnlag, Tilskuddsgrunnlag } from '../../refusjon';

type Props = {
    inntektsgrunnlag?: Inntektsgrunnlag;
    tilskuddsgrunnlag: Tilskuddsgrunnlag;
};

const Inntektsfordeling: FunctionComponent<Props> = (props) => {
    const allemnd = getMånederMellom(
        props.tilskuddsgrunnlag.tilskuddFom,
        props.tilskuddsgrunnlag.tilskuddTom
    ).map((mnd) => getMåned(mnd));

    return (
        <div>
            {allemnd.map((mnd) => (
                <span style={{ marginRight: '1rem' }}>{mnd}</span>
            ))}
        </div>
    );
};

export default Inntektsfordeling;
