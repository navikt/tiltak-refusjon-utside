import { Systemtittel } from 'nav-frontend-typografi';
import React, { FunctionComponent } from 'react';
import VerticalSpacer from '../../../komponenter/VerticalSpacer';
import BEMHelper from '../../../utils/bem';

const ForDuBegynnerInfo: FunctionComponent = () => {
    const cls = BEMHelper('startsteg');
    return (
        <div className={cls.element('infoboks')} role="note" aria-label="informasjon rundt refusjon">
            <Systemtittel role="heading">Slik går du frem</Systemtittel>
            <VerticalSpacer rem={2} />
            <ul>
                <li>Se over at inntektsopplysningene vi har hentet stemmer.</li>
                <li>Dersom dere ønsker å endre på noe må dere gjøre det i A-meldingen.</li>
            </ul>
        </div>
    );
};

export default ForDuBegynnerInfo;
