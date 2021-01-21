import React from 'react';
import BEMHelper from '../../utils/bem';
import { Element } from 'nav-frontend-typografi';

interface Props {
    className: string;
}

const LabelRad = (props: Props) => {
    const cls = BEMHelper(props.className);
    return (
        <div className={cls.element('label-rad')} aria-label="overkrift for kolonne i refusonslist">
            <div className={cls.element('kolonne')} id={cls.element('deltaker')} aria-label="deltaker navn">
                <Element>Deltaker</Element>
            </div>
            <div
                className={cls.element('kolonne')}
                id={cls.element('periode')}
                aria-label="tilskuddsperiode for refusjon"
            >
                <Element>Periode</Element>
            </div>
            <div
                className={cls.element('kolonne')}
                id={cls.element('frist-godkjenning')}
                aria-label="frist for godkjenning av refusjon"
            >
                <Element>Frist for godkjenning</Element>
            </div>
            <div className={cls.element('kolonne')} id={cls.element('status')} aria-label="status på refujon">
                <Element>Status</Element>
            </div>
        </div>
    );
};

export default LabelRad;
