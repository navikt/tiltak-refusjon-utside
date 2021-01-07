import React, { FunctionComponent, useEffect, useState } from 'react';
import { useHistory } from 'react-router';
import { useParams } from 'react-router-dom';
import HvitBoks from '../../../komponenter/HvitBoks';
import VerticalSpacer from '../../../komponenter/VerticalSpacer';
import { gjorInntektsoppslag, useHentRefusjon } from '../../../services/rest-service';
import BEMHelper from '../../../utils/bem';
import './StartSteg.less';
import { Nettressurs, Status } from '../../../nettressurs';
import LagreKnapp from '../../../komponenter/LagreKnapp';
import RefusjonsInfo from './RefusjonsInfo';
import ForDuBegynnerInfo from './ForDuBegynnerInfo';

const cls = BEMHelper('startsteg');
interface Props {
    kanStarteRefusjon: boolean;
}

const StartSteg: FunctionComponent<Props> = (props) => {
    const { kanStarteRefusjon } = props;
    const { refusjonId } = useParams();
    const refusjon = useHentRefusjon(refusjonId);
    const history = useHistory();

    const [inntektsoppslag, setInntektsoppslag] = useState<Nettressurs<any>>({ status: Status.IkkeLastet });

    const startRefusjon = async () => {
        try {
            setInntektsoppslag({ status: Status.LasterInn });
            await gjorInntektsoppslag(refusjonId);
            setInntektsoppslag({ status: Status.Sendt });
        } catch (e) {
            setInntektsoppslag({ status: Status.Feil, error: e.feilmelding ?? 'Uventet feil' });
        }
    };

    useEffect(() => {
        if (inntektsoppslag.status === Status.Sendt) {
            history.push({ pathname: `/refusjon/${refusjonId}/inntekt`, search: window.location.search });
        }
    }, [history, inntektsoppslag, refusjonId]);

    return (
        <>
            <VerticalSpacer rem={2} />
            <div className={cls.element('container')}>
                <HvitBoks>
                    <RefusjonsInfo refusjon={refusjon} kanStarteRefusjon={kanStarteRefusjon} />
                    <VerticalSpacer rem={2} />
                    {kanStarteRefusjon && (
                        <>
                            <ForDuBegynnerInfo />
                            <VerticalSpacer rem={2} />
                            <LagreKnapp onClick={startRefusjon} nettressurs={inntektsoppslag} type="hoved">
                                Start
                            </LagreKnapp>
                        </>
                    )}
                </HvitBoks>
            </div>
        </>
    );
};

export default StartSteg;
