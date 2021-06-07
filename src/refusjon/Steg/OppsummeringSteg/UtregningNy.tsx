import { ReactComponent as Bygg } from '@/asset/image/bygg.svg';
import { ReactComponent as ErlikTegn } from '@/asset/image/erlikTegn.svg';
import { ReactComponent as Pengesekken } from '@/asset/image/pengesekkdollar.svg';
import { ReactComponent as PlussTegn } from '@/asset/image/plussTegn.svg';
import { ReactComponent as ProsentTegn } from '@/asset/image/prosentTegn.svg';
import { ReactComponent as Sparegris } from '@/asset/image/sparegris.svg';
import { ReactComponent as Stranden } from '@/asset/image/strand.svg';
import { AlertStripeAdvarsel } from 'nav-frontend-alertstriper';
import { Element, Normaltekst, Systemtittel } from 'nav-frontend-typografi';
import React, { FunctionComponent } from 'react';
import VerticalSpacer from '../../../komponenter/VerticalSpacer';
import { inntektstypeTekst } from '../../../messages';
import BEMHelper from '../../../utils/bem';
import { formatterDato, formatterPeriode, NORSK_DATO_OG_TID_FORMAT } from '../../../utils/datoUtils';
import { formatterPenger } from '../../../utils/PengeUtils';
import { Refusjon } from '../../refusjon';
import './Utregning.less';
import Utregningsrad from './Utregningsrad';

interface Props {
    refusjon: Refusjon;
}

const cls = BEMHelper('utregning');

const UtregningNy: FunctionComponent<Props> = (props) => {
    if (!props.refusjon.beregning) {
        return null;
    }
    if (!props.refusjon.inntektsgrunnlag) {
        return null;
    }

    const bruttoLønnLabel = (
        <>
            Brutto lønn i perioden (hentet fra a-meldingen)
            <Element>
                Sist hentet:{' '}
                {formatterDato(props.refusjon.inntektsgrunnlag.innhentetTidspunkt, NORSK_DATO_OG_TID_FORMAT)}
            </Element>
        </>
    );

    return (
        <div className={cls.className}>
            <VerticalSpacer rem={1} />
            <Systemtittel>Utregningen</Systemtittel>
            <VerticalSpacer rem={1} />
            <Utregningsrad
                labelIkon={<Pengesekken />}
                labelTekst={bruttoLønnLabel}
                verdi={props.refusjon.beregning.lønn}
                border="INGEN"
            />
            {props.refusjon.inntektsgrunnlag.inntekter.length > 0 && (
                <>
                    <div className={cls.element('inntekter')}>
                        {props.refusjon.inntektsgrunnlag.inntekter.map((inntekt) => (
                            <div key={inntekt.id} className={cls.element('inntekt')}>
                                <Normaltekst>
                                    {inntektstypeTekst[inntekt.inntektType] || inntekt.inntektType}
                                </Normaltekst>
                                <Normaltekst>
                                    {formatterPeriode(inntekt.inntektFordelesFom, inntekt.inntektFordelesTom)}
                                </Normaltekst>
                                <Normaltekst>{formatterPenger(inntekt.beløp)}</Normaltekst>
                            </div>
                        ))}
                    </div>
                    <VerticalSpacer rem={2} />
                    <div style={{ borderBottom: '1px solid #c6c2bf' }}></div>
                </>
            )}
            {props.refusjon.inntektsgrunnlag.inntekter.length === 0 &&
                props.refusjon.inntektsgrunnlag.innhentetTidspunkt && (
                    <>
                        <VerticalSpacer rem={1} />
                        <AlertStripeAdvarsel>
                            Vi kan ikke finne inntekter fra a-meldingen for denne perioden. Sjekk at opplysningene er
                            rapportert i rett periode.
                        </AlertStripeAdvarsel>
                        <VerticalSpacer rem={2} />
                    </>
                )}

            <Utregningsrad
                labelIkon={<Stranden />}
                labelTekst="Feriepenger"
                labelSats={props.refusjon.tilskuddsgrunnlag.feriepengerSats}
                verdiOperator={<PlussTegn />}
                verdi={props.refusjon.beregning.feriepenger}
            />
            <Utregningsrad
                labelIkon={<Sparegris />}
                labelTekst="Innskudd obligatorisk tjenestepensjon"
                labelSats={props.refusjon.tilskuddsgrunnlag.otpSats}
                verdiOperator={<PlussTegn />}
                verdi={props.refusjon.beregning.tjenestepensjon}
            />
            <Utregningsrad
                labelIkon={<Bygg />}
                labelTekst="Arbeidsgiveravgift"
                labelSats={props.refusjon.tilskuddsgrunnlag.arbeidsgiveravgiftSats}
                verdiOperator={<PlussTegn />}
                verdi={props.refusjon.beregning.arbeidsgiveravgift}
            />
            <Utregningsrad
                labelTekst="Refusjonsgrunnlag"
                verdiOperator={<ErlikTegn />}
                verdi={props.refusjon.beregning.sumUtgifter}
            />
            <Utregningsrad
                labelTekst="Tilskuddsprosent"
                verdiOperator={<ProsentTegn />}
                ikkePenger
                verdi={props.refusjon.tilskuddsgrunnlag.lønnstilskuddsprosent}
            />
            <VerticalSpacer rem={3} />
            <Utregningsrad
                labelTekst="Refusjonsbeløp"
                verdiOperator={<ErlikTegn />}
                verdi={props.refusjon.beregning.refusjonsbeløp}
                border="TYKK"
            />
            <VerticalSpacer rem={1} />
        </div>
    );
};

export default UtregningNy;
