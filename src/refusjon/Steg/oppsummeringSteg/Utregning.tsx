import { ReactComponent as Bygg } from '@/asset/image/bygg.svg';
import { ReactComponent as Pengesekken } from '@/asset/image/pengesekkdollar.svg';
import { ReactComponent as Sparegris } from '@/asset/image/sparegris.svg';
import { ReactComponent as Stranden } from '@/asset/image/strand.svg';
import { ReactComponent as Sykepenger } from '@/asset/image/sykepenger.svg';
import React, { FunctionComponent } from 'react';
import VerticalSpacer from '../../../komponenter/VerticalSpacer';
import Utregningsrad from './Utregningsrad';
import { Refusjon } from '../../refusjon';

interface Props {
    refusjon: Refusjon;
}

const Utregning: FunctionComponent<Props> = (props) => {
    if (!props.refusjon.beregning) {
        return null;
    }

    return (
        <div>
            <Utregningsrad
                labelIkon={<Pengesekken />}
                labelTekst="Brutto lønn i perioden"
                verdi={props.refusjon.beregning.lønn}
                borderTykk={true}
            />
            <Utregningsrad
                labelIkon={<Stranden />}
                labelTekst="Feriepenger"
                labelSats={props.refusjon.tilskuddsgrunnlag.feriepengerSats}
                verdiOperator="+"
                verdi={props.refusjon.beregning.feriepenger}
            />
            <Utregningsrad
                labelIkon={<Sparegris />}
                labelTekst="Innskudd obligatorisk tjenestepensjon"
                labelSats={props.refusjon.tilskuddsgrunnlag.otpSats}
                verdiOperator="+"
                verdi={props.refusjon.beregning.tjenestepensjon}
            />
            <Utregningsrad
                labelIkon={<Bygg />}
                labelTekst="Arbeidsgiveravgift"
                labelSats={props.refusjon.tilskuddsgrunnlag.arbeidsgiveravgiftSats}
                verdiOperator="+"
                verdi={props.refusjon.beregning.arbeidsgiveravgift}
            />
            <Utregningsrad
                labelTekst="Refusjonsgrunnlag"
                verdiOperator="="
                verdi={props.refusjon.beregning.sumUtgifter}
            />
            <Utregningsrad
                labelTekst="Lønnstilskuddsprosent"
                verdiOperator="%"
                ikkePenger
                verdi={props.refusjon.tilskuddsgrunnlag.lønnstilskuddsprosent}
            />
            <Utregningsrad
                labelTekst="Refusjonsbeløp"
                verdiOperator="="
                verdi={props.refusjon.beregning.refusjonsbeløp}
                borderTykk={true}
            />
            <VerticalSpacer rem={1} />
        </div>
    );
};

export default Utregning;
