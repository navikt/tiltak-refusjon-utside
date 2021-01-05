import { EtikettInfo } from 'nav-frontend-etiketter';
import Veilederpanel from 'nav-frontend-veilederpanel';
import React, { FunctionComponent } from 'react';
import { useHistory } from 'react-router-dom';
import { ReactComponent as SnakkeBoble } from '../../asset/image/snakkeboble.svg';
import { useInnloggetBruker } from '../../bruker/BrukerContext';
import { useHentRefusjoner } from '../../services/rest-service';
import BEMHelper from '../../utils/bem';
import { formatterDato, formatterPeriode } from '../../utils/datoUtils';
import { storForbokstav } from '../../utils/stringUtils';
import { useFilter } from './FilterContext';
import LabelRad from './LabelRad';
import './oversikt.less';

const cls = BEMHelper('oversikt');

const Kolonne: FunctionComponent = (props) => <div className={cls.element('kolonne')}>{props.children}</div>;

const Oversikt: FunctionComponent = () => {
    const brukerContext = useInnloggetBruker();
    const { filter } = useFilter();

    const refusjoner = useHentRefusjoner(brukerContext.valgtBedrift, filter.status, filter.tiltakstype);

    const history = useHistory();

    return (
        <div className={cls.className}>
            <LabelRad className={cls.className} />
            {refusjoner.length > 0 ? (
                refusjoner.map((refusjon) => (
                    <div
                        className={cls.element('rad')}
                        key={refusjon.id}
                        onClick={() =>
                            history.push({
                                pathname: `/refusjon/${refusjon.id}`,
                                search: window.location.search,
                            })
                        }
                    >
                        <Kolonne>
                            {refusjon.tilskuddsgrunnlag.deltakerFornavn} {refusjon.tilskuddsgrunnlag.deltakerEtternavn}
                        </Kolonne>
                        <Kolonne>
                            {formatterPeriode(
                                refusjon.tilskuddsgrunnlag.tilskuddFom,
                                refusjon.tilskuddsgrunnlag.tilskuddTom
                            )}
                        </Kolonne>
                        <Kolonne>{formatterDato(refusjon.fristForGodkjenning)}</Kolonne>
                        <Kolonne>
                            <EtikettInfo>{storForbokstav(refusjon.status)}</EtikettInfo>
                        </Kolonne>
                    </div>
                ))
            ) : (
                <Veilederpanel kompakt={true} svg={<SnakkeBoble />}>
                    Finner ingen refusjoner på organisasjonsnummer: {brukerContext.valgtBedrift}.
                </Veilederpanel>
            )}
        </div>
    );
};

export default Oversikt;
