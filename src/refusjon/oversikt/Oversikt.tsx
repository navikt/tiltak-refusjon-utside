import { EtikettInfo } from 'nav-frontend-etiketter';
import React, { FunctionComponent } from 'react';
import { useHistory } from 'react-router-dom';
import { useInnloggetBruker } from '../../bruker/BrukerContext';
import { useHentRefusjoner } from '../../services/rest-service';
import BEMHelper from '../../utils/bem';
import { formatterDato, formatterPeriode } from '../../utils/datoUtils';
import { storForbokstav } from '../../utils/stringUtils';
import { useFilter } from './FilterContext';
import LabelRad from './LabelRad';
import './oversikt.less';
import { statusTekst } from '../../messages';
import FinnerIngenRefusjoner from './FinnerIngenRefusjon/FinnerIngenRefusjoner';
import { LenkepanelBase } from 'nav-frontend-lenkepanel';

const cls = BEMHelper('oversikt');

const Kolonne: FunctionComponent = (props) => <div className={cls.element('kolonne')}>{props.children}</div>;

const Oversikt: FunctionComponent = () => {
    const brukerContext = useInnloggetBruker();
    const { filter } = useFilter();
    const refusjoner = useHentRefusjoner(brukerContext.valgtBedrift, filter.status, filter.tiltakstype);
    const history = useHistory();

    return (
        <nav className={cls.className} aria-label="Main">
            <div role="list">
                <LabelRad className={cls.className} />
                {refusjoner.length > 0 ? (
                    refusjoner.map((refusjon) => (
                        <LenkepanelBase
                            className={cls.element('rad')}
                            role="listitem"
                            key={refusjon.id}
                            onClick={(event) => {
                                event.preventDefault();
                                history.push({
                                    pathname: `/refusjon/${refusjon.id}`,
                                    search: window.location.search,
                                });
                            }}
                            href={`/refusjon/${refusjon.id}`}
                        >
                            <Kolonne aria-labelledby={cls.element('deltaker')}>
                                {refusjon.tilskuddsgrunnlag.deltakerFornavn}{' '}
                                {refusjon.tilskuddsgrunnlag.deltakerEtternavn}
                            </Kolonne>
                            <Kolonne aria-labelledby={cls.element('periode')}>
                                {formatterPeriode(
                                    refusjon.tilskuddsgrunnlag.tilskuddFom,
                                    refusjon.tilskuddsgrunnlag.tilskuddTom
                                )}
                            </Kolonne>
                            <Kolonne aria-labelledby={cls.element('status')}>
                                <EtikettInfo>{storForbokstav(statusTekst[refusjon.status])}</EtikettInfo>
                            </Kolonne>
                            <Kolonne aria-labelledby={cls.element('frist-godkjenning')}>
                                {formatterDato(refusjon.fristForGodkjenning)}
                            </Kolonne>
                        </LenkepanelBase>
                    ))
                ) : (
                    <FinnerIngenRefusjoner orgnr={brukerContext.valgtBedrift} />
                )}
            </div>
        </nav>
    );
};

export default Oversikt;
