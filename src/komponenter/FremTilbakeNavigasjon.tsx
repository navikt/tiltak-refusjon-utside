import React, { FunctionComponent } from 'react';
import { HoyreChevron, VenstreChevron } from 'nav-frontend-chevron';
import BEMHelper from '../utils/bem';
import { Link } from 'react-router-dom';

interface Props {
    alleSteg: {
        path: string;
        tittel: string;
        komponent: React.ReactNode;
    }[];
    index: number;
    url: string;
}

const cls = BEMHelper('refusjonside');

const FremTilbakeNavigasjon: FunctionComponent<Props> = (props: Props) => {
    return (
        <div className={cls.element('fremTilbakeNavigasjon')}>
            <Link to={`${props.url}/${props.alleSteg[props.index === 0 ? 0 : props.index - 1].path}`}>
                <VenstreChevron />
                <span>Tilbake</span>
            </Link>
            <Link
                to={`${props.url}/${
                    props.alleSteg[
                        props.index === props.alleSteg.length - 1 ? props.alleSteg.length - 1 : props.index + 1
                    ].path
                }`}
            >
                <span>Neste</span>
                <HoyreChevron />
            </Link>
        </div>
    );
};

export default FremTilbakeNavigasjon;
