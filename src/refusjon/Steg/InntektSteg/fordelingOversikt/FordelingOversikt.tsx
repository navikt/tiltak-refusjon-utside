import { ToggleGruppe } from 'nav-frontend-toggle';
import { Element, Normaltekst, Undertittel } from 'nav-frontend-typografi';
import React, { FunctionComponent, useState } from 'react';
import VerticalSpacer from '../../../../komponenter/VerticalSpacer';
import BEMHelper from '../../../../utils/bem';
import { formatterPeriode } from '../../../../utils/datoUtils';
import { Inntektsgrunnlag, Tilskuddsgrunnlag } from '../../../refusjon';
import FordelingGraphProvider from './grafiskfremvisning/FordelingGraphProvider';
import InntektsTabell from './inntektsTabell/InntektsTabell';

interface Props {
    inntektsgrunnlag?: Inntektsgrunnlag;
    tilskuddsgrunnlag: Tilskuddsgrunnlag;
}

const cls = BEMHelper('fordelinggraph');

enum Visning {
    'Graf' = 'Graf',
    'Liste' = 'Liste',
}

const FordelingOversikt: FunctionComponent<Props> = (props) => {
    const [visning, setVisning] = useState<Visning>(Visning.Graf);

    if (!props.inntektsgrunnlag) {
        return null;
    }

    const graf = (
        <>
            <div className={cls.element('fordelingsOversikt')}>
                <div className={cls.element('inntektsKolonne')}>
                    <div className={cls.element('inntektslabel')}>
                        <Element>Periode med lønnstilskudd</Element>
                        <Normaltekst>
                            {formatterPeriode(
                                props.tilskuddsgrunnlag.tilskuddFom,
                                props.tilskuddsgrunnlag.tilskuddTom,
                                'DD.MMM'
                            )}
                        </Normaltekst>
                    </div>
                    {props.inntektsgrunnlag.inntekter.map((inntekt, index) => {
                        return (
                            <div className={cls.element('inntektslabel')} key={index}>
                                <Element>Inntekt</Element>
                                <Normaltekst>
                                    {formatterPeriode(inntekt.inntektFordelesFom, inntekt.inntektFordelesTom, 'DD.MMM')}
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

    return (
        <>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div>
                    <Undertittel>Slik fordeler inntektene seg</Undertittel>
                </div>
                <div>
                    <ToggleGruppe
                        defaultToggles={[
                            {
                                children: Visning.Graf,
                                pressed: visning === Visning.Graf,
                                onClick: () => setVisning(Visning.Graf),
                            },
                            {
                                children: Visning.Liste,
                                pressed: visning === Visning.Liste,
                                onClick: () => setVisning(Visning.Liste),
                            },
                        ]}
                    />
                </div>
            </div>

            <VerticalSpacer rem={1} />
            {visning === Visning.Graf && graf}
            {visning === Visning.Liste && <InntektsTabell inntektsgrunnlag={props.inntektsgrunnlag} />}
        </>
    );
};

export default FordelingOversikt;
