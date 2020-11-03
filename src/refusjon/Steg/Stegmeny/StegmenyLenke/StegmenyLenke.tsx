import * as React from 'react';
import { FunctionComponent } from 'react';
import { NavLink } from 'react-router-dom';
import './StegmenyLenke.less';

interface Props {
    label: string;
    url: string;
}

const StegmenyLenke: FunctionComponent<Props> = (props) => {
    return (
        <NavLink
            to={{ pathname: props.url, search: window.location.search }}
            className="stegmenylenke"
            activeClassName="aktiv"
        >
            <span className="stegmenylenke__label">{props.label}</span>
        </NavLink>
    );
};

export default StegmenyLenke;
