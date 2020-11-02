import React, { FunctionComponent } from 'react';
import { Route, useRouteMatch } from 'react-router';
import BEMHelper from '../../utils/bem';
import OppsummeringSteg from '../Steg/OppsummeringSteg';
import TiltaketSteg from '../Steg/TiltaketSteg';
import './RefusjonSide.less';
import StegmenyLenke from '../Steg/Stegmeny/StegmenyLenke/StegmenyLenke';
import InntektSteg from '../Steg/InntektSteg';
import VerticalSpacer from '../../komponenter/VerticalSpacer';

type Props = {};

const cls = BEMHelper('refusjonside');

const RefusjonSide: FunctionComponent<Props> = (props) => {
    const { path, url } = useRouteMatch();

    const alleSteg = [
        {
            path: 'tiltaket',
            tittel: 'Tiltaket',
            komponent: <TiltaketSteg />,
        },
        {
            path: 'inntekt',
            tittel: 'Inntektsopplysninger',
            komponent: <InntektSteg />,
        },
        {
            path: 'oppsummering',
            tittel: 'Oppsummering',
            komponent: <OppsummeringSteg />,
        },
    ];

    return (
        <>
            <VerticalSpacer rem={1} />
            <div className={cls.className}>
                <div className={cls.element('stegmeny')}>
                    {alleSteg.map((steg) => (
                        <StegmenyLenke label={steg.tittel} url={`${url}/${steg.path}`} />
                    ))}
                </div>

                {alleSteg.map((steg) => (
                    <Route exact path={`${path}/${steg.path}`}>
                        {steg.komponent}
                    </Route>
                ))}
            </div>
        </>
    );
};

export default RefusjonSide;
