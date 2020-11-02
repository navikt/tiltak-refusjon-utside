import React, { FunctionComponent } from 'react';
import { Route, useParams, useRouteMatch } from 'react-router';
import { useHentRefusjon } from '../../services/rest-service';
import BEMHelper from '../../utils/bem';
import InntektSteg from '../Steg/InntektSteg';
import OppsummeringSteg from '../Steg/OppsummeringSteg';
import Stegmeny from '../Steg/Stegmeny/Stegmeny';
import TiltaketSteg from '../Steg/TiltaketSteg';
import './RefusjonSide.less';

type Props = {};

const cls = BEMHelper('refusjonside');

const RefusjonSide: FunctionComponent<Props> = (props) => {
    const { refusjonId } = useParams();
    const refusjon = useHentRefusjon(refusjonId);
    let { path } = useRouteMatch();

    return (
        <>
            <div>STEGMENY</div>
            <Stegmeny />

            <Route exact path={`${path}/tiltaket`}>
                <TiltaketSteg refusjon={refusjon} />
            </Route>
            <Route path={`${path}/inntekt`}>
                <InntektSteg />
            </Route>
            <Route path={`${path}/oppsummering`}>
                <OppsummeringSteg />
            </Route>
        </>
    );
};

export default RefusjonSide;
