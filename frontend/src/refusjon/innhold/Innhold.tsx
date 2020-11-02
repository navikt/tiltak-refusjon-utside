import React, { FunctionComponent } from 'react';
import BEMHelper from '../../utils/bem';
import Banner from '../Banner';
import Filtermeny from '../Filtermeny';
import Oversikt from '../oversikt/Oversikt';
import './innhold.less';

const cls = BEMHelper('innhold');

const Innhold: FunctionComponent = () => {
    return (
        <>
            <Banner />
            <div className={cls.className}>
                <div className={cls.element('wrapper')}>
                    <div className={cls.element('meny')}>
                        <Filtermeny />
                    </div>
                    <div className={cls.element('container')}>
                        <Oversikt />
                    </div>
                </div>
            </div>
        </>
    );
};

export default Innhold;
