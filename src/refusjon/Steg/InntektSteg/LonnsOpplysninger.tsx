import { ReactComponent as KalenderIkon } from '@/asset/image/calender.svg';
import { ReactComponent as HelseKoffertIkon } from '@/asset/image/health-case.svg';
import { ReactComponent as PengeIkon } from '@/asset/image/money.svg';
import { ReactComponent as FerieIkon } from '@/asset/image/vacation.svg';
import { Undertittel } from 'nav-frontend-typografi';
import React, { FunctionComponent } from 'react';
import VerticalSpacer from '../../../komponenter/VerticalSpacer';
import BEMHelper from '../../../utils/bem';
import { formatterPeriode } from '../../../utils/datoUtils';
import { formatterPenger } from '../../../utils/PengeUtils';
import { Refusjon } from '../../refusjon';
import { INNTEKTSTEGCLASSNAME } from './InntektSteg';

interface Props {
    refusjon: Refusjon;
}

const LonnsOpplysninger: FunctionComponent<Props> = (props: Props) => {
    const cls = BEMHelper(INNTEKTSTEGCLASSNAME);

    const deltakerNavn = `${props.refusjon.tilskuddsgrunnlag.deltakerFornavn} ${props.refusjon.tilskuddsgrunnlag.deltakerEtternavn}`;

    if (!props.refusjon.beregning) {
        return null;
    }

    return (
        <div className={cls.element('illustrajon')}>
            <Undertittel>Inntektsopplysninger for {deltakerNavn} i perioden</Undertittel>
            <VerticalSpacer rem={1} />
            <div className={cls.element('rad')}>
                <span className={cls.element('ikon')}>
                    <KalenderIkon />
                </span>
                <b>Periode:</b>{' '}
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
                <b>Total utbetalt lønn i perioden: </b>
                <span>{formatterPenger(props.refusjon.beregning.lønn)}</span>
            </div>

            <div className={cls.element('rad')}>
                <span className={cls.element('ikon')}>
                    <HelseKoffertIkon />
                </span>
                <b>Utbetalt feriepenger i perioden: </b>
                <span>{formatterPenger(0)}</span>
            </div>

            <div className={cls.element('rad')}>
                <span className={cls.element('ikon')}>
                    <FerieIkon />
                </span>
                <b>Utbetalt sykepenger i perioden: </b>
                <span>{formatterPenger(0)}</span>
            </div>
        </div>
    );
};

export default LonnsOpplysninger;
