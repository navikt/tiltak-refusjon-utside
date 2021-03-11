import React, { FunctionComponent } from 'react';
import { useParams } from 'react-router';
import TilbakeTilOversikt from '../../komponenter/TilbakeTilOversikt';
import { useHentRefusjon } from '../../services/rest-service';
import { formatterDato } from '../../utils/datoUtils';
import KvitteringSide from '../KvitteringSide/KvitteringSide';
import { Refusjon as RefusjonType } from '../refusjon';
import { Status } from '../status';
import FeilSide from './FeilSide';
import NyRefusjon from './NyRefusjon';
import RefusjonSideNy from './RefusjonSideNy';

const Komponent: FunctionComponent<{ refusjon: RefusjonType }> = (props) => {
    switch (props.refusjon.status) {
        case Status.BEREGNET:
            return <RefusjonSideNy />;
        case Status.NY:
            return <NyRefusjon />;
        case Status.UTGÅTT:
            return (
                <FeilSide
                    advarselType="advarsel"
                    feiltekst={`Fisten for å søke om refusjon for denne perioden gikk ut ${formatterDato(
                        props.refusjon.fristForGodkjenning
                    )}. Innvilget tilskudd er derfor trukket tilbake.`}
                />
            );
        case Status.ANNULLERT:
            return <FeilSide advarselType="advarsel" feiltekst="Refusjonen er annullert. Avtalen ble avbrutt." />;
        case Status.KRAV_FREMMET:
        case Status.UTBETALT:
            return <KvitteringSide />;
    }
};

const Refusjon: FunctionComponent = () => {
    const { refusjonId } = useParams();
    const refusjon = useHentRefusjon(refusjonId);

    return (
        <div style={{ display: 'flex', justifyContent: 'center' }}>
            <div style={{ flex: '0 0 55rem', flexShrink: 1 }}>
                <TilbakeTilOversikt />
                <Komponent refusjon={refusjon} />
            </div>
        </div>
    );
};

export default Refusjon;
