import React, { FunctionComponent } from 'react';
import { formatterPeriode } from '../../../../../utils/datoUtils';
import { formatterPenger } from '../../../../../utils/PengeUtils';
import { Inntektsgrunnlag } from '../../../../refusjon';
import BEMHelper from '../../../../../utils/bem';
import './inntektsTabell.less';

interface Props {
    inntektsgrunnlag: Inntektsgrunnlag;
}

const InntektsTabell: FunctionComponent<Props> = (props) => {
    const cls = BEMHelper('inntektsTabell');

    return (
        <>
            <table className={cls.className}>
                <thead>
                    <tr className={cls.element('row')}>
                        <th>Periode rapportert for</th>
                        <th>Inntekt</th>
                    </tr>
                </thead>
                <tbody>
                    {props.inntektsgrunnlag.inntekter.map((inntekt, index) => (
                        <tr className={cls.element('row')} key={index}>
                            <td>
                                {inntekt.opptjeningsperiodeFom && inntekt.opptjeningsperiodeTom
                                    ? formatterPeriode(inntekt.opptjeningsperiodeFom, inntekt.opptjeningsperiodeTom)
                                    : `ikke oppgitt (inntekt fordeles for perioden ${formatterPeriode(
                                          inntekt.inntektFordelesFom,
                                          inntekt.inntektFordelesTom
                                      )})`}
                            </td>
                            <td>{formatterPenger(inntekt.beløp)}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </>
    );
};

export default InntektsTabell;
