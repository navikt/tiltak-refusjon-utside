import React, { FunctionComponent } from 'react';
import { formatterPeriode } from '../../../../../utils/datoUtils';
import { formatterPenger } from '../../../../../utils/PengeUtils';
import { Inntektsgrunnlag, Inntektslinje } from '../../../../refusjon';
import BEMHelper from '../../../../../utils/bem';
import './inntektsTabell.less';

interface Props {
    inntektsgrunnlag: Inntektsgrunnlag;
}

const InntektsTabell: FunctionComponent<Props> = (props) => {
    const cls = BEMHelper('inntektsTabell');

    const setOpptjeningsperioden = (inntekt: Inntektslinje): string => {
        return inntekt.opptjeningsperiodeFom && inntekt.opptjeningsperiodeTom
            ? formatterPeriode(inntekt.opptjeningsperiodeFom, inntekt.opptjeningsperiodeTom)
            : `ikke oppgitt (inntekt fordeles for perioden ${formatterPeriode(
                  inntekt.inntektFordelesFom,
                  inntekt.inntektFordelesTom
              )})`;
    };

    return (
        <>
            <table className={cls.className}>
                <thead>
                    <tr className={cls.element('row')}>
                        <th id="inntektstabell_periode_rapportert">Periode rapportert for</th>
                        <th id="inntektstabell_inntekt_hentet">Inntekt</th>
                    </tr>
                </thead>
                <tbody>
                    {props.inntektsgrunnlag.inntekter.map((inntekt, index) => (
                        <tr className={cls.element('row')} key={index}>
                            <td aria-labelledby="inntektstabell_periode_rapportert">
                                {setOpptjeningsperioden(inntekt)}
                            </td>
                            <td aria-labelledby="inntektstabell_inntekt_hentet">{formatterPenger(inntekt.beløp)}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </>
    );
};

export default InntektsTabell;
