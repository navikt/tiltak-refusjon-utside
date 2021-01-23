import { VenstreChevron } from 'nav-frontend-chevron';
import Stegindikator from 'nav-frontend-stegindikator';
import React, { FunctionComponent, useEffect } from 'react';
import { Route, useHistory, useRouteMatch } from 'react-router';
import { Link, useParams } from 'react-router-dom';
import FremTilbakeNavigasjon from '../../komponenter/FremTilbakeNavigasjon';
import { ReactComponent as Veileder } from '@/asset/image/veileder.svg';
import HvitBoks from '../../komponenter/hvitboks/HvitBoks';
import VerticalSpacer from '../../komponenter/VerticalSpacer';
import { useHentRefusjon } from '../../services/rest-service';
import BEMHelper from '../../utils/bem';
import InntektSteg from '../Steg/InntektSteg/InntektSteg';
import KvitteringSteg from '../Steg/KvitteringSteg/KvitteringSteg';
import OppsummeringSteg from '../Steg/OppsummeringSteg/OppsummeringSteg';
import StartSteg from '../Steg/StartSteg/StartSteg';
import './RefusjonSide.less';
import { AlertStripeFeil } from 'nav-frontend-alertstriper';
import Veilederpanel from 'nav-frontend-veilederpanel';
import { Normaltekst } from 'nav-frontend-typografi';

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
        if (!refusjon.inntektsgrunnlag) {
            history.replace({ pathname: `${url}/start`, search: window.location.search });
        }
        if (refusjon.godkjentAvArbeidsgiver) {
            history.replace({ pathname: `${url}/kvittering`, search: window.location.search });
        }
        if (refusjon.inntektsgrunnlag !== null && refusjon.godkjentAvArbeidsgiver === null && !aktivtStegIndex) {
            history.replace({ pathname: `${url}/inntekt`, search: window.location.search });
        }
    }, [history, refusjon, url, aktivtStegIndex]);

    return !!aktivtStegIndex ? (
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
    ) : (
        <div className={cls.element('veilederpanel')}>
            <Veilederpanel svg={<Veileder />} type="plakat" fargetema="feilmelding">
                <Normaltekst>Det har oppstått en uventet hendelse ved lasting av siden.</Normaltekst>
                <AlertStripeFeil>Feil vel lasting av siden</AlertStripeFeil>
            </Veilederpanel>
        </div>
    );
};

export default RefusjonSide;
