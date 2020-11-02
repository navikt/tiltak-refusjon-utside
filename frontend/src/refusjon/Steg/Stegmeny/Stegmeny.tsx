import * as React from 'react';
import { FunctionComponent } from 'react';
import { useRouteMatch } from 'react-router';
import './Stegmeny.less';
import StegmenyLenke from './StegmenyLenke/StegmenyLenke';

type Steg = 'tiltaket' | 'inntekt' | 'oppsummering';

const Stegmeny: FunctionComponent = () => {
    const { path, url } = useRouteMatch();
    const steg: Steg[] = ['tiltaket', 'inntekt', 'oppsummering'];
    const aktiv = url + `/${steg}`;

    const sjekkOmStegIPath = (steg: Steg) => window.location.pathname.includes(steg.toLowerCase());

    const stegLenker = steg.map((steg) => {
        return (
            <StegmenyLenke
                label={steg}
                aktiv={sjekkOmStegIPath(steg)}
                ferdig={false}
                url={url + `/${steg}`}
                key={steg}
            />
        );
    });

    return <nav className="stegmeny">{stegLenker}</nav>;
};

export default Stegmeny;
