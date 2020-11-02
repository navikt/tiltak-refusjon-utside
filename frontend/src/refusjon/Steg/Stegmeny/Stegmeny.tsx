import * as React from 'react';
import { FunctionComponent } from 'react';
import { useRouteMatch } from 'react-router';
import './Stegmeny.less';
import StegmenyLenke from './StegmenyLenke/StegmenyLenke';
import { matchPath } from 'react-router-dom';

type Steg = 'tiltaket' | 'inntekt' | 'oppsummering';

const Stegmeny: FunctionComponent = () => {
    const { path, url } = useRouteMatch();
    const alleSteg: Steg[] = ['tiltaket', 'inntekt', 'oppsummering'];

    const stegLenker = alleSteg.map((steg) => {
        const stegUrl = url + `/${steg}`;
        return (
            <StegmenyLenke
                label={steg}
                url={stegUrl}
                key={steg}
            />
        );
    });

    return <nav className="stegmeny">{stegLenker}</nav>;
};

export default Stegmeny;
