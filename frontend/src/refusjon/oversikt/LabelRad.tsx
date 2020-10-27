import React from 'react';
import BEMHelper from '../../utils/bem';

interface Props {
    className: string;
}

const LabelRad = (props: Props) => {
    const cls = BEMHelper(props.className);
    return (
        <div className={cls.element('label-rad')}>
            <div className={cls.element('kolonne')}>Bedrift</div>
            <div className={cls.element('kolonne')}>Deltaker</div>
            <div className={cls.element('kolonne')}>Veileder</div>
            <div className={cls.element('kolonne')}>Opprettet</div>
            <div className={cls.element('kolonne')}>Status</div>
        </div>
    );
};

export default LabelRad;
