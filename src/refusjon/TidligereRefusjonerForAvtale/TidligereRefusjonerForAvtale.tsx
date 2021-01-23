import * as React from 'react';
import { FunctionComponent } from 'react';
import { useHentTidligereRefusjoner } from '../../services/rest-service';
import Ekspanderbartpanel from 'nav-frontend-ekspanderbartpanel';
import { formatterDato, formatterPeriode } from '../../utils/datoUtils';
import { EtikettInfo } from 'nav-frontend-etiketter';
import { storForbokstav } from '../../utils/stringUtils';
import { statusTekst } from '../../messages';
import './TidligereRefusjonerForAvtale.less';
import { Element, Normaltekst, Undertittel } from 'nav-frontend-typografi';
import VerticalSpacer from '../../komponenter/VerticalSpacer';
import { formatterPenger } from '../../utils/PengeUtils';
import { Link } from 'react-router-dom';

interface Props {
    refusjonId: string;
}

const TidligereRefusjonerForAvtale: FunctionComponent<Props> = (props) => {
    const refusjoner = useHentTidligereRefusjoner(props.refusjonId);

    if (refusjoner.length === 0) {
        return null;
    }

    return (
        <div>
            <Undertittel role="heading">Andre refusjoner tilknyttet samme avtale</Undertittel>
            <VerticalSpacer rem={1} />
            {refusjoner.map((refusjon, index) => (
                <Ekspanderbartpanel
                    aria-label={`ekspanderbartpanel med status oversikt over gitt periode ${formatterPeriode(
                        refusjon.tilskuddsgrunnlag.tilskuddFom,
                        refusjon.tilskuddsgrunnlag.tilskuddTom
                    )}`}
                    key={index}
                    className={'tidligere-refusjon-ekspanderbartpanel'}
                    tittel={
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                            <div>
                                {formatterPeriode(
                                    refusjon.tilskuddsgrunnlag.tilskuddFom,
                                    refusjon.tilskuddsgrunnlag.tilskuddTom
                                )}
                            </div>
                            <EtikettInfo aria-label="status refusjon">
                                {storForbokstav(statusTekst[refusjon.status])}
                            </EtikettInfo>
                        </div>
                    }
                >
                    {refusjon.status === 'KRAV_FREMMET' && (
                        <div>
                            <Element>Refusjonsbeløp: {formatterPenger(refusjon.beregning!.refusjonsbeløp)}</Element>
                            <Normaltekst>Krav fremmet {formatterDato(refusjon.godkjentAvArbeidsgiver!)}</Normaltekst>
                        </div>
                    )}
                    {refusjon.status === 'BEHANDLET' && (
                        <div>
                            <Element>Refusjonsbeløp: {formatterPenger(refusjon.beregning!.refusjonsbeløp)}</Element>
                            <Normaltekst>Utbetalt {formatterDato(refusjon.godkjentAvSaksbehandler!)}</Normaltekst>
                        </div>
                    )}

                    <VerticalSpacer rem={1} />
                    <Link
                        to={{ pathname: `/refusjon/${refusjon.id}`, search: window.location.search }}
                        target={'_blank'}
                    >
                        Gå til kvittering
                    </Link>
                </Ekspanderbartpanel>
            ))}
        </div>
    );
};

export default TidligereRefusjonerForAvtale;
