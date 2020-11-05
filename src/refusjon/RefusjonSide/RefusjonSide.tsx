import React, { FunctionComponent } from 'react';
import { Route, useRouteMatch } from 'react-router';
import BEMHelper from '../../utils/bem';
import OppsummeringSteg from '../Steg/OppsummeringSteg';
import TiltaketSteg from '../Steg/TiltaketSteg';
import StegmenyLenke from '../Steg/Stegmeny/StegmenyLenke/StegmenyLenke';
import InntektSteg from '../Steg/inntektsteg/InntektSteg';
import VerticalSpacer from '../../komponenter/VerticalSpacer';
import './RefusjonSide.less';
import { Link } from 'react-router-dom';
import { VenstreChevron } from 'nav-frontend-chevron';

const cls = BEMHelper('refusjonside');

const RefusjonSide: FunctionComponent = () => {
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
                <div className={cls.element('wrapper')}>
                    <div className={cls.element('navigasjonslinje')}>
                        <Link to="/" className={cls.element('navigasjonslenke')}>
                            <VenstreChevron />
                            Tilbake til oversikt
                        </Link>
                    </div>
                    <div className={cls.element('container')}>
                        <div className={cls.element('stegmeny')}>
                            {alleSteg.map((steg, index) => (
                                <StegmenyLenke label={steg.tittel} url={`${url}/${steg.path}`} key={index} />
                            ))}
                        </div>

                        {alleSteg.map((steg, index) => (
                            <Route exact path={`${path}/${steg.path}`} key={index}>
                                {steg.komponent}
                            </Route>
                        ))}
                    </div>
                </div>
            </div>
        </>
    );
};

export default RefusjonSide;
