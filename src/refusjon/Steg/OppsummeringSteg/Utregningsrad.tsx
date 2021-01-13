import { Normaltekst, Systemtittel } from 'nav-frontend-typografi';
import React, { FunctionComponent, ReactNode } from 'react';
import BEMHelper from '../../../utils/bem';
import { formatterPenger } from '../../../utils/PengeUtils';
import { visSatsMedEttDesimal } from '../../../utils/utregningUtil';

interface Props {
    labelIkon?: React.ReactNode;
    labelTekst: string;
    labelSats?: number;
    verdiOperator?: string | ReactNode;
    verdi: number;
    borderTykk?: boolean;
    ikkePenger?: boolean;
}

const cls = BEMHelper('oppsummering');

const Utregningsrad: FunctionComponent<Props> = (props: Props) => {
    const setIkon = (ikon?: React.ReactNode) => (ikon ? ikon : <div className={cls.element('ikon-placeholder')} />);

    const setOperator = (operator?: string | ReactNode) =>
        operator ? <Systemtittel className={cls.element('operator')}>{operator}</Systemtittel> : null;

    const setLabelSats = (sats?: number) => (sats ? <Normaltekst>({visSatsMedEttDesimal(sats)}%)</Normaltekst> : null);

    return (
        <div className={cls.element('utregning-rad', props.borderTykk ? 'tykkbunn' : '')}>
            <div className={cls.element('utregning-label')}>
                <div className={cls.element('label-innhold')}>
                    {setIkon(props.labelIkon)}
                    <Normaltekst>{props.labelTekst}</Normaltekst>
                </div>
                {setLabelSats(props.labelSats)}
            </div>

            <div className={cls.element('utregning-verdi')}>
                {setOperator(props.verdiOperator)}
                <Normaltekst className={cls.element('sum')}>
                    {props.ikkePenger ? props.verdi : formatterPenger(props.verdi)}
                </Normaltekst>
            </div>
        </div>
    );
};

export default Utregningsrad;
