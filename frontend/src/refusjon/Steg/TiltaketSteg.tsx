import { Element, Systemtittel, Undertittel } from 'nav-frontend-typografi';
import React, { FunctionComponent } from 'react';
import HvitBoks from '../../komponenter/HvitBoks';
import VerticalSpacer from '../../komponenter/VerticalSpacer';
import BEMHelper from '../../utils/bem';
import { Refusjon } from '../refusjon';
import './TiltaketSteg.less';

type Props = {
    refusjon: Refusjon;
};

const cls = BEMHelper('tiltaksteg');

const TiltaketSteg: FunctionComponent<Props> = (props) => {
    return (
        <HvitBoks>
            <div className={cls.element('infoboks')}>
                <Systemtittel>Slik søker du om refusjon</Systemtittel>
                <VerticalSpacer rem={1} />
                <Element>
                    Før din virksomhet får utbetalt de pengene dere har rett på må dere se over at NAV har riktige
                    opplysninger om:
                </Element>
                <ul>
                    <li>Lønn i perioden</li>
                    <li>Eventuell ferie</li>
                    <li>Sykdom</li>
                </ul>
                <Element>NAV henter opplysninger fra A-meldingen NAV</Element>
                henter opplysninger fra ..... Så dersom du ønsker å endre inntektsopplysninger må du endre det der Sjekk
                hvilke opplysninger dere har rapportert i A-meldingen her
            </div>
            <VerticalSpacer rem={2} />
            <Undertittel>Om tiltaket</Undertittel>
            <VerticalSpacer rem={2} />
            <Element>Type tiltak</Element>
            {props.refusjon.tiltakstype}
            <VerticalSpacer rem={1} />
            <Element>Deltaker</Element>
            {props.refusjon.deltaker}
            <VerticalSpacer rem={1} />
            <Element>Periode</Element>
            {`${props.refusjon.fraDato} - ${props.refusjon.tilDato}`}
        </HvitBoks>
    );
};

export default TiltaketSteg;
