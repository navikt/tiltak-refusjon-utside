import { Normaltekst, Systemtittel } from 'nav-frontend-typografi';
import React, { FunctionComponent } from 'react';
import { useParams } from 'react-router';
import HvitBoks from '../../../komponenter/HvitBoks';
import { useHentRefusjon } from '../../../services/rest-service';
import BEMHelper from '../../../utils/bem';
import FerieOgSykdomOpplysninger from './FerieOgSykdomOpplysninger';
import './InntektSteg.less';
import LonnsOpplysninger from './LonnsOpplysninger';
import UtbetalingsOpplysninger from './UtbetalingsOpplysninger';

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
                    bedrift={refusjon.bedriftNr}
                    deltaker={refusjon.deltakerFnr}
                    fraDato={refusjon.tilskuddsgrunnlag.tilskuddFom}
                    tilDato={refusjon.tilskuddsgrunnlag.tilskuddTom}
                />
                {/* <UtbetalingsOpplysninger nettoMånedslønn={refusjon.nettoMånedslønn} /> */}
                <UtbetalingsOpplysninger nettoMånedslønn={0} />
                {/* <FerieOgSykdomOpplysninger feriepenger={refusjon.feriepenger} sykepenger={refusjon.sykepenger} /> */}
                <FerieOgSykdomOpplysninger feriepenger={0} sykepenger={0} />
            </div>
        </HvitBoks>
    );
};

export default InntektSteg;
