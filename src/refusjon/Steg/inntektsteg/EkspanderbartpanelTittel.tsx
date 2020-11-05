import React, { FunctionComponent } from 'react';
import { Undertittel } from 'nav-frontend-typografi';
import BEMHelper from '../../../utils/bem';
import { INNTEKTSTEGCLASSNAME } from './InntektSteg';

interface Props {
    ikon: React.ReactNode;
    tittel: string;
    visningssum: number;
}

const EkspanderbartpanelTittel: FunctionComponent<Props> = (props: Props) => {
    const cls = BEMHelper(INNTEKTSTEGCLASSNAME);
    return (
        <div className={cls.element('ekspanderbartpanel-tittel')}>
            <div>
                <span className={cls.element('ikon')}>{props.ikon}</span>
                <span>{props.tittel}</span>
            </div>
            <div>
                <Undertittel>{props.visningssum}kr</Undertittel>
            </div>
        </div>
    );
};

export default EkspanderbartpanelTittel;
