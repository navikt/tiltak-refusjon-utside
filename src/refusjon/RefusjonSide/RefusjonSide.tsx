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
import InntektSteg from '../Steg/InntektSteg/InntektSteg';
import KvitteringSteg from '../Steg/KvitteringSteg/KvitteringSteg';
import OppsummeringSteg from '../Steg/OppsummeringSteg/OppsummeringSteg';
import StartSteg from '../Steg/StartSteg/StartSteg';
import './RefusjonSide.less';
import moment from 'moment';

const cls = BEMHelper('refusjonside');

const RefusjonSide: FunctionComponent = () => {
    const { path, url } = useRouteMatch();
    const history = useHistory();
    const { refusjonId } = useParams();
    const refusjon = useHentRefusjon(refusjonId);
    const kanStarteRefusjon = moment(refusjon.tilskuddsgrunnlag.tilskuddTom).diff(moment().format('YYYY-MM-DD')) <= 0;

    const alleSteg = [
        {
            path: 'start',
            label: 'Start',
            komponent: <StartSteg kanStarteRefusjon={kanStarteRefusjon} />,
            disabled: refusjon.inntektsgrunnlag !== null,
        },
        {
            path: 'inntekt',
            label: 'Inntektsopplysninger',
            komponent: <InntektSteg />,
            disabled: refusjon.inntektsgrunnlag === null || refusjon.godkjentAvArbeidsgiver !== null,
        },
        {
            path: 'oppsummering',
            label: 'Oppsummering',
            komponent: <OppsummeringSteg />,
            disabled: refusjon.inntektsgrunnlag === null || refusjon.godkjentAvArbeidsgiver !== null,
        },
        {
            path: 'kvittering',
            label: 'Kvittering',
            komponent: <KvitteringSteg />,
            disabled: refusjon.godkjentAvArbeidsgiver === null,
        },
    ].map((steg, index) => ({ ...steg, index }));

    const aktivtStegIndex = alleSteg
        .filter((steg) => !steg.disabled)
        .find((steg) => window.location.pathname.includes(steg.path))?.index;

    if (aktivtStegIndex === undefined) {
        if (!refusjon.inntektsgrunnlag) {
            history.replace({ pathname: `${url}/start`, search: window.location.search });
        }
        if (refusjon.godkjentAvArbeidsgiver) {
            history.replace({ pathname: `${url}/kvittering`, search: window.location.search });
        }
        if (refusjon.inntektsgrunnlag !== null && refusjon.godkjentAvArbeidsgiver === null) {
            history.replace({ pathname: `${url}/inntekt`, search: window.location.search });
        }
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
                        {alleSteg
                            .filter((steg) => !steg.disabled)
                            .map((steg, index) => (
                                <Route exact path={`${path}/${steg.path}`} key={index}>
                                    <div className={cls.element('innhold-steg')}>{steg.komponent}</div>
                                </Route>
                            ))}
                    </HvitBoks>
                    {kanStarteRefusjon && (
                        <FremTilbakeNavigasjon alleSteg={alleSteg} index={aktivtStegIndex} url={url} />
                    )}
                </div>
            </div>
        </>
    );
};

export default RefusjonSide;
