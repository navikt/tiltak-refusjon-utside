import moment from 'moment';
import Veilederpanel from 'nav-frontend-veilederpanel';
import React, { FunctionComponent, ReactNode, useContext } from 'react';
import { useParams } from 'react-router';
import { ReactComponent as SnakkeBoble } from '../../asset/image/snakkeboble.svg';
import { ReactComponent as Status } from '../../asset/image/statusplayIkon.svg';
import { BrukerContext } from '../../bruker/BrukerContext';
import { useHentRefusjoner } from '../../services/rest-service';
import BEMHelper from '../../utils/bem';
import { urlParameter } from '../../utils/urlUtils';
import LabelRad from './LabelRad';
import './oversikt.less';

const cls = BEMHelper('oversikt');

type Props = {
    orgNr: string;
};

const Oversikt: FunctionComponent<Props> = (props) => {
    const context = useContext(BrukerContext);

    useParams();
    const refusjoner = useHentRefusjoner(urlParameter('bedrift'));

    const filtereListe = () => {
        const behandletType = refusjoner //context.refusjon
            ? refusjoner.filter((element) => element.status === context.filter.status)
            : [];
        if (context.filter.tiltakstype) {
            return behandletType.filter((element) => element.tiltakstype === context.filter.tiltakstype);
        }
        return behandletType;
    };

    const settKolonne = (input: string | number): ReactNode => <div className={cls.element('kolonne')}>{input}</div>;
    const filtrerteRefusjoner = filtereListe();

    return (
        <>
            <div className={cls.className}>
                <LabelRad className={cls.className} />
                {filtrerteRefusjoner && filtrerteRefusjoner.length > 0 ? (
                    filtrerteRefusjoner.map((ref, index) => (
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
                        Det er ikke Registert noen refusjoner pa org. nr: {props.orgNr}.
                    </Veilederpanel>
                )}
            </div>
        </>
    );
};

export default Oversikt;
