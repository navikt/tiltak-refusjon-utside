import React, { FunctionComponent } from 'react';
import HvitBoks from '../../../komponenter/HvitBoks';
import { useHentRefusjon } from '../../../services/rest-service';
import { useParams } from 'react-router';
import { Normaltekst, Systemtittel } from 'nav-frontend-typografi';
import BEMHelper from '../../../utils/bem';
import './InntektSteg.less';
import LonnsOpplysninger from './LonnsOpplysninger';
import UtbetalingsOpplysninger from './UtbetalingsOpplysninger';
import FerieOgSykdomOpplysninger from './FerieOgSykdomOpplysninger';

export const INNTEKTSTEGCLASSNAME = 'inntektsteg';

const InntektSteg: FunctionComponent = () => {
    const cls = BEMHelper(INNTEKTSTEGCLASSNAME);
    const { refusjonId } = useParams();
    const refusjon = useHentRefusjon(refusjonId);

    return (
        <HvitBoks>
            <div className={cls.className}>
                <Systemtittel className={cls.element('tittel')} role="title">
                    Inntektsopplysninger
                </Systemtittel>
                <Normaltekst>
                    Vi henter inntektsopplysninger fra det du har rapportert i A-meldingen. Dersom inntektsopplysningene
                    ikke stemmer må du endre de i A-meldingen. Dersom arbeidstaker har mottatt ...... trekkes det også
                    fra i ........
                </Normaltekst>
                <LonnsOpplysninger
                    bedrift={refusjon.bedrift}
                    deltaker={refusjon.deltaker}
                    fraDato={refusjon.fraDato}
                    tilDato={refusjon.tilDato}
                />
                <UtbetalingsOpplysninger nettoMånedslønn={refusjon.nettoMånedslønn} />
                <FerieOgSykdomOpplysninger feriepenger={refusjon.feriepenger} sykepenger={refusjon.sykepenger} />
            </div>
        </HvitBoks>
    );
};

export default InntektSteg;
