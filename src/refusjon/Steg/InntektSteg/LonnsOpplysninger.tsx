import { ReactComponent as KalenderIkon } from '@/asset/image/calender.svg';
import { ReactComponent as PengeIkon } from '@/asset/image/money.svg';
import { Normaltekst, Undertittel } from 'nav-frontend-typografi';
import React, { FunctionComponent } from 'react';
import VerticalSpacer from '../../../komponenter/VerticalSpacer';
import BEMHelper from '../../../utils/bem';
import { formatterDato, formatterPeriode, NORSK_DATO_OG_TID_FORMAT } from '../../../utils/datoUtils';
import { formatterPenger } from '../../../utils/PengeUtils';
import { Refusjon } from '../../refusjon';
import { INNTEKTSTEGCLASSNAME } from './InntektSteg';
import LagreKnapp from '../../../komponenter/LagreKnapp';
import { gjorInntektsoppslag } from '../../../services/rest-service';
import moment from 'moment';

interface Props {
    refusjon: Refusjon;
    refusjonId: string;
}

const LonnsOpplysninger: FunctionComponent<Props> = (props: Props) => {
    const cls = BEMHelper(INNTEKTSTEGCLASSNAME);
    const { refusjonId } = props;
    const deltakerNavn = `${props.refusjon.tilskuddsgrunnlag.deltakerFornavn} ${props.refusjon.tilskuddsgrunnlag.deltakerEtternavn}`;

    if (!props.refusjon.beregning || !props.refusjon.inntektsgrunnlag) {
        return null;
    }

    return (
        <div className={cls.element('illustrajon')}>
            <Undertittel>Inntektsopplysninger for {deltakerNavn} i perioden</Undertittel>
            <div className={cls.element('hentopplysninger')}>
                <LagreKnapp lagreFunksjon={() => gjorInntektsoppslag(refusjonId)}>
                    Hent opplysninger fra A-meldingen
                </LagreKnapp>
                <Normaltekst>
                    Sist hentet:{' '}
                    {formatterDato(props.refusjon.inntektsgrunnlag.innhentetTidspunkt, NORSK_DATO_OG_TID_FORMAT)}
                </Normaltekst>
            </div>
            <VerticalSpacer rem={1} />
            <div className={cls.element('rad')}>
                <span className={cls.element('ikon')}>
                    <KalenderIkon />
                </span>
                <b className={cls.element('rad-label')}>Periode:</b>
                <span>
                    {formatterPeriode(
                        props.refusjon.tilskuddsgrunnlag.tilskuddFom,
                        props.refusjon.tilskuddsgrunnlag.tilskuddTom
                    )}
                </span>
            </div>

            <div className={cls.element('rad')}>
                <span className={cls.element('ikon')}>
                    <PengeIkon />
                </span>
                <b className={cls.element('rad-label')}>Total utbetalt lønn i perioden:</b>
                <span>{formatterPenger(props.refusjon.beregning.lønn)}</span>
            </div>
        </div>
    );
};

export default LonnsOpplysninger;
