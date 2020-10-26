import React, { FunctionComponent, ReactNode, useContext, useEffect } from 'react';
import BEMHelper from '../../utils/bem';
import { ReactComponent as Status } from '../../asset/image/statusplayIkon.svg';
import moment from 'moment';
import './oversikt.less';
import LabelRad from './LabelRad';
import { BrukerContext } from '../../bruker/BrukerContext';
import Veilederpanel from 'nav-frontend-veilederpanel';
import { ReactComponent as SnakkeBoble } from '../../asset/image/snakkeboble.svg';

const cls = BEMHelper('oversikt');

const Oversikt: FunctionComponent = () => {
    const context = useContext(BrukerContext);
    const { hentRefusjon } = context;
    const organisasjonsNummer = new URLSearchParams(window.location.search).get('bedrift')! || '';

    const hentRefusjoner = () => {
        hentRefusjon(organisasjonsNummer);
    };
    useEffect(hentRefusjoner, []);

    const settKolonne = (input: string | number): ReactNode => <div className={cls.element('kolonne')}>{input}</div>;

    return (
        <>
            <div className={cls.className}>
                <LabelRad className={cls.className} />
                {context.refusjon ? (
                    context.refusjon.map((ref, index) => (
                        <div className={cls.element('rad')} key={index}>
                            {settKolonne(ref.bedrift)}
                            {settKolonne(ref.deltaker)}
                            {settKolonne(ref.veileder)}
                            {settKolonne(moment(ref.opprettet_tidspunkt).format('DD.MM.YYYY, kk:mm'))}
                            <div className={cls.element('kolonne')}>
                                <span className={cls.element('ikon')}>
                                    <Status />
                                </span>
                                <span>Status</span>
                            </div>
                        </div>
                    ))
                ) : (
                    <Veilederpanel kompakt={true} svg={<SnakkeBoble />}>
                        Det er ikke Registert noen refusjoner pa org. nr: {organisasjonsNummer}.
                    </Veilederpanel>
                )}
            </div>
        </>
    );
};

export default Oversikt;
