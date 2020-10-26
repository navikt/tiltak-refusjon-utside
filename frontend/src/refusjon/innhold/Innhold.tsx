import { FunctionComponent } from 'react';
import React from 'react';
import Oversikt from '../oversikt/Oversikt';
import Banner from '../Banner';
import BEMHelper from '../../utils/bem';
import './innhold.less';
import Filtermeny from '../Filtermeny';

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
