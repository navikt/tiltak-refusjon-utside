import React, { FunctionComponent } from 'react';
import BEMHelper from '../../utils/bem';
import Filtermeny from '../oversikt/Filtermeny';
import Oversikt from '../oversikt/Oversikt';
import './innhold.less';
import { FilterProvider } from '../oversikt/FilterContext';

const cls = BEMHelper('innhold');

const Innhold: FunctionComponent = () => {
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

export default Innhold;
