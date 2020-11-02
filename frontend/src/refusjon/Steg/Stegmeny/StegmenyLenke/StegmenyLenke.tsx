import * as React from 'react';
import { FunctionComponent } from 'react';
import { Link } from 'react-router-dom';
import './StegmenyLenke.less';

interface Props {
    label: string;
    aktiv: boolean;
    ferdig: boolean;
    url: string;
}

const StegmenyLenke: FunctionComponent<Props> = (props) => {
    let className = 'stegmenylenke';
    if (props.aktiv) {
        className += ' aktiv';
    }
    return (
        <Link
            to={{ pathname: props.url, search: window.location.search }}
            className={className}
            //onClick={avtaleContext.endretSteg}
        >
            <span className="stegmenylenke__label">{props.label}</span>
        </Link>
    );
};

export default StegmenyLenke;
