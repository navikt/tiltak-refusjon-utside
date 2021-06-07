import NavFrontendSpinner from 'nav-frontend-spinner';
import { Normaltekst } from 'nav-frontend-typografi';
import React, { FunctionComponent, useEffect, useState } from 'react';
import { useParams } from 'react-router';
import HvitBoks from '../../komponenter/hvitboks/HvitBoks';
import VerticalSpacer from '../../komponenter/VerticalSpacer';
import { gjorInntektsoppslag, useHentRefusjon } from '../../services/rest-service';
import { formatterDato } from '../../utils/datoUtils';
import FeilSide from './FeilSide';

const NyRefusjon: FunctionComponent = () => {
    const { refusjonId } = useParams();
    const refusjon = useHentRefusjon(refusjonId);
    const [forTidlig, setForTidlig] = useState(false);
    const [ingenInntekter, setIngenInntekter] = useState(false);

    useEffect(() => {
        if (!forTidlig) {
            setTimeout(() => {
                gjorInntektsoppslag(refusjon.id).catch((error) => {
                    if (error.feilkode === 'INNTEKT_HENTET_FOR_TIDLIG') {
                        setForTidlig(true);
                    } else if (error.feilkode === 'INGEN_INNTEKTER') {
                        setIngenInntekter(true);
                    }
                });
            }, 3000);
        }
    }, [forTidlig, refusjon.id]);

    if (forTidlig) {
        return (
            <FeilSide
                advarselType="info"
                feiltekst={`Du kan søke om refusjon etter at perioden er over, ${formatterDato(
                    refusjon.tilskuddsgrunnlag.tilskuddTom
                )}.`}
            />
        );
    }

    if (ingenInntekter) {
        return (
            <FeilSide
                advarselType="info"
                feiltekst={
                    'Det er ikke rapportert noen inntekter i perioden. Send inn a-melding, og last denne siden på nytt.'
                }
            />
        );
    }

    return (
        <HvitBoks style={{ display: 'flex', alignItems: 'center', flexDirection: 'column' }}>
            <NavFrontendSpinner type="XL" />
            <VerticalSpacer rem={1} />
            <Normaltekst>Henter inntektsopplysninger...</Normaltekst>
        </HvitBoks>
    );
};

export default NyRefusjon;
