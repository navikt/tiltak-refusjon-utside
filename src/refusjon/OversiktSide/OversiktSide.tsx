import React, { FunctionComponent } from 'react';
import BEMHelper from '../../utils/bem';
import { FilterProvider } from '../oversikt/FilterContext';
import Filtermeny from '../oversikt/Filtermeny';
import Oversikt from '../oversikt/Oversikt';
import './OversiktSide.less';

const cls = BEMHelper('OversiktSide');

const OversiktSide: FunctionComponent = () => {
    return (
        <div className={cls.className}>
            <div className={cls.element('wrapper')}>
                <FilterProvider>
                    <div className={cls.element('meny')}>
                        <Filtermeny />
                    </div>
                    <div className={cls.element('container')}>
                        <Oversikt />
                    </div>
                </FilterProvider>
            </div>
        </div>
    );
};

export default OversiktSide;
