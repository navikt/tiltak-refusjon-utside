import React, { FunctionComponent } from 'react';
import { Element, Normaltekst, Undertittel } from 'nav-frontend-typografi';
import { tiltakstypeTekst } from '../../../messages';
import VerticalSpacer from '../../../komponenter/VerticalSpacer';
import { formatterDato, formatterPeriode } from '../../../utils/datoUtils';
import { Refusjon } from '../../refusjon';
import { AlertStripeInfo } from 'nav-frontend-alertstriper';
import BEMHelper from '../../../utils/bem';

interface Props {
    refusjon: Refusjon;
    kanStarteRefusjon: boolean;
}

const RefusjonsInfo: FunctionComponent<Props> = (props) => {
    const cls = BEMHelper('startsteg');
    const { refusjon, kanStarteRefusjon } = props;
    const tiltakstype = tiltakstypeTekst[refusjon.tilskuddsgrunnlag.tiltakstype];
    return (
        <>
            <Undertittel role="heading" aria-label={`Refusjon av ${tiltakstype}`}>
                Refusjon av {tiltakstype}
            </Undertittel>
            {!kanStarteRefusjon && (
                <AlertStripeInfo className={cls.element('alertstripe')}>
                    <Element>
                        Dere kan ikke be om refusjon før perioden er over den{' '}
                        {formatterDato(refusjon.tilskuddsgrunnlag.tilskuddTom)}
                    </Element>
                    <Normaltekst>Når perioden er over har dere to måneder på dere på å be om refusjon</Normaltekst>
                </AlertStripeInfo>
            )}
            <VerticalSpacer rem={2} />
            <Element id="refusjonsinfo_periode">Periode</Element>
            <Normaltekst aria-labelledby="refusjonsinfo_periode">
                {formatterPeriode(refusjon.tilskuddsgrunnlag.tilskuddFom, refusjon.tilskuddsgrunnlag.tilskuddTom)}
            </Normaltekst>
            <VerticalSpacer rem={1} />
            <Element id="refusjonsinfo_deltaker">Deltaker</Element>
            <Normaltekst aria-labelledby="refusjonsinfo_deltaker">
                {refusjon.tilskuddsgrunnlag.deltakerFornavn} {refusjon.tilskuddsgrunnlag.deltakerEtternavn}
            </Normaltekst>
            <VerticalSpacer rem={1} />
            <Element>Ansvarlig i virksomheten</Element>
            <div aria-labelledby="arbeidstaker opplysninger">
                <Normaltekst id="refusjonsinfo_kontaktpersjon_bedrift">
                    Kontaktpersonen i bedriften (mangler)
                </Normaltekst>
                <Normaltekst aria-labelledby="refusjonsinfo_kontaktpersjon_bedrift">12345678 (mangler)</Normaltekst>
            </div>
        </>
    );
};

export default RefusjonsInfo;
