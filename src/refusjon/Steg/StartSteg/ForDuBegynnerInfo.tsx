import React, { FunctionComponent } from 'react';
import { Element, Normaltekst, Systemtittel } from 'nav-frontend-typografi';
import VerticalSpacer from '../../../komponenter/VerticalSpacer';
import BEMHelper from '../../../utils/bem';

const ForDuBegynnerInfo: FunctionComponent = () => {
    const cls = BEMHelper('startsteg');
    return (
        <div className={cls.element('infoboks')} role="note" aria-label="informasjon rundt refusjon">
            <Systemtittel role="heading">Før du begynner</Systemtittel>
            <VerticalSpacer rem={2} />
            <Element id="Slik_fungerer_det">Slik fungerer det</Element>
            <Normaltekst aria-labelledby="Slik_fungerer_det" aria-describedby="Slik_fungerer_det">
                Lønnstilskudd skal kun dekke lønnsutgifter og ..... NAV bruker opplysninger dere har rapportert i
                A-meldingen for å beregne hva dere har krav på i refusjon for perioden med lønnstilskudd.
            </Normaltekst>
            <VerticalSpacer rem={1} />
            <Element id="refusjonInfo"> Slik går du frem</Element>
            <Normaltekst aria-labelledby="refusjonInfo" aria-describedby="refusjonInfo">
                Se over at inntektsopplysningene vi har hentet stemmer. - Dersom dere ønsker å endre på noe må dere
                gjøre det i A-meldingen. Sjekk hvilke opplysninger dere har rapportert i A-meldingen her
            </Normaltekst>
        </div>
    );
};

export default ForDuBegynnerInfo;
