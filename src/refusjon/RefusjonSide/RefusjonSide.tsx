import { VenstreChevron } from 'nav-frontend-chevron';
import Stegindikator from 'nav-frontend-stegindikator';
import React, { FunctionComponent, useEffect } from 'react';
import { Route, useHistory, useRouteMatch } from 'react-router';
import { Link, useParams } from 'react-router-dom';
import FremTilbakeNavigasjon from '../../komponenter/FremTilbakeNavigasjon';
import HvitBoks from '../../komponenter/hvitboks/HvitBoks';
import VerticalSpacer from '../../komponenter/VerticalSpacer';
import { useHentRefusjon } from '../../services/rest-service';
import BEMHelper from '../../utils/bem';
import InntektSteg from '../Steg/InntektSteg/InntektSteg';
import KvitteringSteg from '../Steg/KvitteringSteg/KvitteringSteg';
import OppsummeringSteg from '../Steg/OppsummeringSteg/OppsummeringSteg';
import StartSteg from '../Steg/StartSteg/StartSteg';
import './RefusjonSide.less';

const cls = BEMHelper('refusjonside');

const RefusjonSide: FunctionComponent = () => {
    const { refusjonId } = useParams();
    const refusjon = useHentRefusjon(refusjonId);
    const { path, url } = useRouteMatch();
    const history = useHistory();

    const alleSteg = [
        {
            path: 'start',
            label: 'Start',
            komponent: <StartSteg />,
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

    useEffect(() => {
        const forandreAdresseFelt = (adresseNavn: string) =>
            history.replace({ pathname: `${url}/${adresseNavn}`, search: window.location.search });
        const { inntektsgrunnlag, godkjentAvArbeidsgiver } = refusjon;
        switch (true) {
            case !inntektsgrunnlag:
                return forandreAdresseFelt('start');
            case !!godkjentAvArbeidsgiver:
                return forandreAdresseFelt('kvittering');
            case !godkjentAvArbeidsgiver && !aktivtStegIndex:
                return forandreAdresseFelt('inntekt');
            case aktivtStegIndex === undefined:
                return () => {
                    throw Error();
                };
            default:
                return void 0;
        }
    }, [history, refusjon, url, aktivtStegIndex]);

    return aktivtStegIndex !== undefined ? (
        <>
            <VerticalSpacer rem={1} />
            <div className={cls.className}>
                <div className={cls.element('wrapper')}>
                    <div className={cls.element('navigasjonslinje')}>
                        <Link
                            to={{ pathname: '/', search: window.location.search }}
                            className={cls.element('navigasjonslenke')}
                        >
                            <div aria-hidden={true}>
                                <VenstreChevron />
                            </div>
                            Tilbake til oversikt
                        </Link>
                    </div>
                    <HvitBoks role="main">
                        <div className={cls.element('stegindikator')}>
                            <Stegindikator
                                visLabel
                                aria-label={`stegindikator viser stegene til refusjon gjennomgang. Aktivt steg ${alleSteg[aktivtStegIndex]}`}
                                steg={alleSteg}
                                aktivtSteg={aktivtStegIndex}
                                autoResponsiv={true}
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
                    <FremTilbakeNavigasjon alleSteg={alleSteg} index={aktivtStegIndex} url={url} />
                </div>
            </div>
        </>
    ) : null;
};

export default RefusjonSide;
