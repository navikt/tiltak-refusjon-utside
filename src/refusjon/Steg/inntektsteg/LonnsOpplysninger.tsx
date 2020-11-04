import React, { FunctionComponent } from 'react';
import { Undertittel } from 'nav-frontend-typografi';
import { ReactComponent as Bygg } from '@/asset/image/inntektsteg.illustrasjon.bygg.svg';
import { ReactComponent as Person } from '@/asset/image/inntektsteg.illustrasjon.person.svg';
import { ReactComponent as Periode } from '@/asset/image/inntektsteg.illustrasjon.periode.svg';

import { formatterDato } from '../../../utils/datoUtils';
import BEMHelper from '../../../utils/bem';
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
        <div className={cls.element('info-seksjon')}>
            <Undertittel>Inntektsopplysninger fra A-meldingen</Undertittel>
            <div className={cls.element('illustrajon')}>
                <div className={cls.element('rad')}>
                    <span className={cls.element('ikon')}>
                        <Bygg />
                    </span>
                    <span>{props.bedrift}</span>
                </div>
                <div className={cls.element('rad')}>
                    <span className={cls.element('ikon')}>
                        <Person />
                    </span>
                    <span>{props.deltaker}</span>
                </div>
                <div className={cls.element('rad')}>
                    <span className={cls.element('ikon')}>
                        <Periode />
                    </span>
                    <span>{`${formatterDato(props.fraDato)} - ${formatterDato(props.tilDato)}`}</span>
                </div>
            </div>
        </div>
    );
};

export default LonnsOpplysninger;
