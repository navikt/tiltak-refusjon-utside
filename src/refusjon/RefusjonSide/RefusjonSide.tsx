import { VenstreChevron } from 'nav-frontend-chevron';
import Stegindikator from 'nav-frontend-stegindikator';
import React, { FunctionComponent } from 'react';
import { Route, useHistory, useRouteMatch } from 'react-router';
import { Link, useParams } from 'react-router-dom';
import FremTilbakeNavigasjon from '../../komponenter/FremTilbakeNavigasjon';
import HvitBoks from '../../komponenter/HvitBoks';
import VerticalSpacer from '../../komponenter/VerticalSpacer';
import { useHentRefusjon } from '../../services/rest-service';
import BEMHelper from '../../utils/bem';
import InntektSteg from '../Steg/inntektsteg/InntektSteg';
import OppsummeringSteg from '../Steg/oppsummeringSteg/OppsummeringSteg';
import TiltaketSteg from '../Steg/TiltaketSteg';
import './RefusjonSide.less';

const cls = BEMHelper('refusjonside');

const RefusjonSide: FunctionComponent = () => {
    const { path, url } = useRouteMatch();
    const history = useHistory();
    const { refusjonId } = useParams();
    const refusjon = useHentRefusjon(refusjonId);

    const alleSteg = [
        {
            path: 'inntekt',
            label: 'Inntektsopplysninger',
            komponent: <InntektSteg />,
            index: 0,
        },
        {
            path: 'oppsummering',
            label: 'Oppsummering',
            komponent: <OppsummeringSteg />,
            index: 1,
        },
    ];

    if (!refusjon.inntektsgrunnlag) {
        return <TiltaketSteg />;
    }
    const aktivtStegIndex = alleSteg.findIndex((steg) => window.location.pathname.includes(steg.path));

    if (aktivtStegIndex === -1) {
        history.replace({ pathname: `${url}/inntekt`, search: window.location.search });
        return null;
    }

    return (
        <>
            <VerticalSpacer rem={1} />

            <div className={cls.className}>
                <div className={cls.element('wrapper')}>
                    <div className={cls.element('navigasjonslinje')}>
                        <Link
                            to={{ pathname: '/', search: window.location.search }}
                            className={cls.element('navigasjonslenke')}
                        >
                            <VenstreChevron />
                            Tilbake til oversikt
                        </Link>
                    </div>
                    <HvitBoks>
                        <div className={cls.element('stegindikator')}>
                            <Stegindikator
                                visLabel
                                steg={alleSteg}
                                aktivtSteg={aktivtStegIndex}
                                onChange={(index) => {
                                    history.push({
                                        pathname: alleSteg[index].path,
                                        search: window.location.search,
                                    });
                                }}
                            />
                        </div>
                        {alleSteg.map((steg, index) => (
                            <Route exact path={`${path}/${steg.path}`} key={index}>
                                <div className={cls.element('innhold-steg')}>{steg.komponent}</div>
                            </Route>
                        ))}
                    </HvitBoks>
                    <FremTilbakeNavigasjon alleSteg={alleSteg} index={aktivtStegIndex} url={url} />
                </div>
            </div>
        </>
    );
};

export default RefusjonSide;
