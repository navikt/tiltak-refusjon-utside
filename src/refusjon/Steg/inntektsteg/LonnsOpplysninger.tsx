import { ReactComponent as KalenderIkon } from '@/asset/image/calender.svg';
import { ReactComponent as HelseKoffertIkon } from '@/asset/image/health-case.svg';
import { ReactComponent as PengeIkon } from '@/asset/image/money.svg';
import { ReactComponent as FerieIkon } from '@/asset/image/vacation.svg';
import { Undertittel } from 'nav-frontend-typografi';
import React, { FunctionComponent } from 'react';
import VerticalSpacer from '../../../komponenter/VerticalSpacer';
import BEMHelper from '../../../utils/bem';
import { formatterDato } from '../../../utils/datoUtils';
import { INNTEKTSTEGCLASSNAME } from './InntektSteg';

interface Props {
    bedrift: string;
    deltaker: string;
    fraDato: string;
    tilDato: string;
}

const LonnsOpplysninger: FunctionComponent<Props> = (props: Props) => {
    const cls = BEMHelper(INNTEKTSTEGCLASSNAME);

    return (
        <div className={cls.element('illustrajon')}>
            <Undertittel>Inntektsopplysninger fra A-meldingen</Undertittel>
            <VerticalSpacer rem={1} />
            <div className={cls.element('rad')} style={{ borderBottom: '2px solid #CCE1F3', paddingBottom: '1rem' }}>
                <span className={cls.element('ikon')}>
                    <KalenderIkon />
                </span>
                <b>Periode:</b> <span>{`${formatterDato(props.fraDato)} - ${formatterDato(props.tilDato)}`}</span>
            </div>

            <div className={cls.element('rad')}>
                <span className={cls.element('ikon')}>
                    <PengeIkon />
                </span>
                <b>Total utbetalt lønn i perioden:</b>
                <span>3kr</span>
            </div>

            <div className={cls.element('rad')}>
                <span className={cls.element('ikon')}>
                    <HelseKoffertIkon />
                </span>
                <b>Utbetalt feriepenger i perioden: </b>
                <span>2kr</span>
            </div>

            <div className={cls.element('rad')}>
                <span className={cls.element('ikon')}>
                    <FerieIkon />
                </span>
                <b>Utbetalt sykepenger i perioden: </b>
                <span>6kr</span>
            </div>
        </div>
    );
};

export default LonnsOpplysninger;
