import React, { FunctionComponent } from 'react';
import { useHistory } from 'react-router';
import { useParams } from 'react-router-dom';
import LagreKnapp from '../../../komponenter/LagreKnapp';
import VerticalSpacer from '../../../komponenter/VerticalSpacer';
import { gjorInntektsoppslag, useHentRefusjon } from '../../../services/rest-service';
import BEMHelper from '../../../utils/bem';
import './StartSteg.less';
import RefusjonsInfo from './RefusjonsInfo';
import HvitBoks from '../../../komponenter/HvitBoks';
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

    const startRefusjon = async () => {
        await gjorInntektsoppslag(refusjonId);
        history.push({ pathname: `/refusjon/${refusjonId}/inntekt`, search: window.location.search });
    };

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
                            <LagreKnapp lagreFunksjon={startRefusjon} type="hoved">
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
