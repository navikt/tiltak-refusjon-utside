import { HoyreChevron, VenstreChevron } from 'nav-frontend-chevron';
import React, { FunctionComponent } from 'react';
import { Link } from 'react-router-dom';
import BEMHelper from '../utils/bem';

interface Props {
    alleSteg: {
        path: string;
        label: string;
        komponent: React.ReactNode;
    }[];
    index: number;
    url: string;
}

const cls = BEMHelper('refusjonside');

const FremTilbakeNavigasjon: FunctionComponent<Props> = (props: Props) => {
    return (
        <div className={cls.element('fremTilbakeNavigasjon')}>
            <Link
                to={{
                    pathname: `${props.url}/${props.alleSteg[props.index === 0 ? 0 : props.index - 1].path}`,
                    search: window.location.search,
                }}
            >
                <VenstreChevron />
                <span>Tilbake</span>
            </Link>
            <Link
                to={{
                    pathname: `${props.url}/${
                        props.alleSteg[
                            props.index === props.alleSteg.length - 1 ? props.alleSteg.length - 1 : props.index + 1
                        ].path
                    }`,
                    search: window.location.search,
                }}
            >
                <span>Neste</span>
                <HoyreChevron />
            </Link>
        </div>
    );
};

export default FremTilbakeNavigasjon;
