import * as React from 'react';
import KnappBase, { KnappBaseProps } from 'nav-frontend-knapper';
import { Nettressurs, Status } from '../nettressurs';
import { AlertStripeFeil } from 'nav-frontend-alertstriper';

interface LagreKnappProps {
    nettressurs: Nettressurs<any>;
}

export default (props: KnappBaseProps & LagreKnappProps) => {
    const spinner = props.nettressurs.status === Status.LasterInn || props.nettressurs.status === Status.SenderInn;
    const eventuellFeilmelding =
        props.nettressurs.status === Status.Feil ? <AlertStripeFeil>{props.nettressurs.error}</AlertStripeFeil> : null;
    return (
        <>
            <KnappBase spinner={spinner} {...props} />
            {eventuellFeilmelding}
        </>
    );
};
