import React, { FunctionComponent } from 'react';
import { Inntektsgrunnlag, Tilskuddsgrunnlag } from '../../../refusjon';

import FordelingGraphProvider from './grafiskfremvisning/FordelingGraphProvider';
import { Element, Normaltekst } from 'nav-frontend-typografi';
import { formatterDatoen } from '../../../../utils/datoUtils';
import BEMHelper from '../../../../utils/bem';

interface Props {
    inntektsgrunnlag?: Inntektsgrunnlag;
    tilskuddsgrunnlag: Tilskuddsgrunnlag;
}

const cls = BEMHelper('fordelinggraph');

const FordelingOversikt: FunctionComponent<Props> = (props) => {
    if (!props.inntektsgrunnlag) {
        return null;
    }

    return (
        <>
            <div className={cls.element('fordelingsOversikt')}>
                <div className={cls.element('inntektsKolonne')}>
                    <div className={cls.element('inntektslabel')}>
                        <Element>Periode med lønnstilskudd</Element>
                        <Normaltekst>
                            {formatterDatoen(props.tilskuddsgrunnlag.tilskuddTom, 'DD.MMM')} -{' '}
                            {formatterDatoen(props.tilskuddsgrunnlag.tilskuddTom, 'DD.MMM')}
                        </Normaltekst>
                    </div>
                    {props.inntektsgrunnlag.inntekter.map((inntekt, index) => {
                        return (
                            <div className={cls.element('inntektslabel')} key={index}>
                                <Element>Inntekt</Element>
                                <Normaltekst>
                                    {formatterDatoen(inntekt.inntektFordelesFom, 'DD.MMM')} -
                                    {formatterDatoen(inntekt.inntektFordelesTom, 'DD.MMM')}
                                </Normaltekst>
                            </div>
                        );
                    })}
                </div>
                <FordelingGraphProvider
                    tilskuddsgrunnlag={props.tilskuddsgrunnlag}
                    inntektsgrunnlag={props.inntektsgrunnlag}
                />
            </div>
        </>
    );
};

export default FordelingOversikt;
