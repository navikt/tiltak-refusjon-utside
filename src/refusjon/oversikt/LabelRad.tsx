import React from 'react';
import BEMHelper from '../../utils/bem';
import { Element } from 'nav-frontend-typografi';

interface Props {
    className: string;
}

const LabelRad = (props: Props) => {
    const cls = BEMHelper(props.className);
    return (
        <div className={cls.element('label-rad')}>
            <div className={cls.element('kolonne')}>
                <Element>Deltaker</Element>
            </div>
            <div className={cls.element('kolonne')}>
                <Element>Periode</Element>
            </div>
            <div className={cls.element('kolonne')}>
                <Element>Frist for godkjenning</Element>
            </div>
            <div className={cls.element('kolonne')}>
                <Element>Status</Element>
            </div>
        </div>
    );
};

export default LabelRad;
