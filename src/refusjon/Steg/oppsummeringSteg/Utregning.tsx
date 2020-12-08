import { ReactComponent as Bygg } from '@/asset/image/bygg.svg';
import { ReactComponent as Pengesekken } from '@/asset/image/pengesekkdollar.svg';
import { ReactComponent as Sparegris } from '@/asset/image/sparegris.svg';
import { ReactComponent as Stranden } from '@/asset/image/strand.svg';
import { ReactComponent as Sykepenger } from '@/asset/image/sykepenger.svg';
import React, { FunctionComponent } from 'react';
import VerticalSpacer from '../../../komponenter/VerticalSpacer';
import Utregningsrad from './Utregningsrad';

interface Props {
    bruttolonn: number;
    fratrekkFerie: number;
    sykepenger: number;
    sumLonnsgrunnlag: number;
    satsFeriepenger: number;
    feriepenger: number;
    satsOtp: number;
    belopOtp: number;
    satsArbeidsgiveravgift: number;
    arbeidsgiverAvgift: number;
    sumRefusjonsgrunnlag: number;
    refusjonsbeløp: number;
    lonnstilskuddsprosent: number;
}

const Utregning: FunctionComponent<Props> = (props: Props) => {
    return (
        <div>
            <Utregningsrad labelIkon={<Pengesekken />} labelTekst="Brutto lønn i perioden" verdi={props.bruttolonn} />
            <Utregningsrad
                labelIkon={<Stranden />}
                labelTekst="Avviklede feriedager"
                verdiOperator="-"
                verdi={props.fratrekkFerie}
            />
            <Utregningsrad
                labelIkon={<Sykepenger />}
                labelTekst="Sykepenger"
                verdiOperator="-"
                verdi={props.sykepenger}
            />
            <Utregningsrad
                labelTekst="Sum refusjonsgrunnlag lønnsutgifter"
                verdiOperator="="
                verdi={props.sumLonnsgrunnlag}
                borderTykk={true}
            />
            <Utregningsrad
                labelIkon={<Stranden />}
                labelTekst="Feriepenger"
                labelSats={props.satsFeriepenger}
                verdiOperator="+"
                verdi={props.feriepenger}
            />
            <Utregningsrad
                labelIkon={<Sparegris />}
                labelTekst="Innskudd obligatorisk tjenestepensjon"
                labelSats={props.satsOtp}
                verdiOperator="+"
                verdi={props.belopOtp}
            />
            <Utregningsrad
                labelIkon={<Bygg />}
                labelTekst="Arbeidsgiveravgift"
                labelSats={props.satsArbeidsgiveravgift}
                verdiOperator="+"
                verdi={props.arbeidsgiverAvgift}
            />
            <Utregningsrad labelTekst="Refusjonsgrunnlag" verdiOperator="=" verdi={props.sumRefusjonsgrunnlag} />
            <Utregningsrad
                labelTekst="Lønnstilskuddsprosent"
                verdiOperator="%"
                ikkePenger
                verdi={props.lonnstilskuddsprosent}
            />
            <Utregningsrad
                labelTekst="Refusjonsbeløp"
                verdiOperator="="
                verdi={props.refusjonsbeløp}
                borderTykk={true}
            />
            <VerticalSpacer rem={1} />
        </div>
    );
};

export default Utregning;
