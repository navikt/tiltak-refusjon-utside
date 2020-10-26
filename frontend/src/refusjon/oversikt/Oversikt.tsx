import React, { FunctionComponent, ReactNode, useEffect, useState } from 'react';
import BEMHelper from '../../utils/bem';
import { hentRefusjoner } from '../../services/rest-service';
import { Refusjon } from '../refusjon';
import { ReactComponent as Status } from '../../asset/image/statusplayIkon.svg';
import moment from 'moment';
import './oversikt.less';
import LabelRad from './LabelRad';

const cls = BEMHelper('oversikt');

const Oversikt: FunctionComponent = () => {
    const [refusjon, setRefusjon] = useState<Refusjon[] | undefined>(undefined);
    useEffect(() => {
        hentRefusjon();
    }, []);

    const hentRefusjon = async () => {
        try {
            const ref = await hentRefusjoner();
            setRefusjon(ref);
        } catch (e) {
            console.warn(e);
        }
    };

    const settKolonne = (input: string | number): ReactNode => <div className={cls.element('kolonne')}>{input}</div>;

    return refusjon ? (
        <>
            <div className={cls.className}>
                <LabelRad className={cls.className} />
                {refusjon.map((ref) => (
                    <div className={cls.element('rad')}>
                        {settKolonne(ref.bedrift)}
                        {settKolonne(ref.deltaker)}
                        {settKolonne(ref.veileder)}
                        {settKolonne(moment(ref.opprettet_tidspunkt).format('DD.MM.YYYY, kk:mm:ss'))}
                        <div className={cls.element('kolonne')}>
                            <span className={cls.element('ikon')}>
                                <Status />
                            </span>
                            <span>Status</span>
                        </div>
                    </div>
                ))}
            </div>
        </>
    ) : null;
};

export default Oversikt;
