import { Knapp } from 'nav-frontend-knapper';
import { Innholdstittel, Normaltekst } from 'nav-frontend-typografi';
import React, { FunctionComponent } from 'react';
import { useParams } from 'react-router';
import HvitBoks from '../../komponenter/hvitboks/HvitBoks';
import VerticalSpacer from '../../komponenter/VerticalSpacer';
import { useHentRefusjon } from '../../services/rest-service';
import NokkelInfo from '../RefusjonSide/NokkelInfo';
import SummeringBoks from '../RefusjonSide/SummeringBoks';
import UtregningNy from '../Steg/OppsummeringSteg/UtregningNy';

const KvitteringSide: FunctionComponent = () => {
    const { refusjonId } = useParams();
    const refusjon = useHentRefusjon(refusjonId);

    return (
        <HvitBoks>
            <VerticalSpacer rem={2} />
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <Innholdstittel role="heading">Kvittering for refusjon</Innholdstittel>
                <Knapp mini>Lagre som PDF</Knapp>
            </div>
            <VerticalSpacer rem={1} />
            <Normaltekst>
                Refusjonskravet er nå sendt. Det vil ta 3 - 4 dager før pengene kommer på kontoen. Denne refusjonen vil
                bli tatt vare på under “Sendt krav”.
            </Normaltekst>
            <VerticalSpacer rem={2} />
            <NokkelInfo />
            <VerticalSpacer rem={2} />
            <UtregningNy refusjon={refusjon} />
            <VerticalSpacer rem={4} />
            <SummeringBoks />
        </HvitBoks>
    );
};

export default KvitteringSide;
