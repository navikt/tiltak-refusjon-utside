import React, { FunctionComponent } from 'react';
import { HoyreChevron, VenstreChevron } from 'nav-frontend-chevron';
import BEMHelper from '../utils/bem';
import Lenke from 'nav-frontend-lenker';

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
            <Lenke href={`${props.url}/${props.alleSteg[props.index === 0 ? 0 : props.index - 1].path}`}>
                <VenstreChevron />
                <span>Tilbake</span>
            </Lenke>
            <Lenke
                href={`${props.url}/${
                    props.alleSteg[
                        props.index === props.alleSteg.length - 1 ? props.alleSteg.length - 1 : props.index + 1
                    ].path
                }`}
            >
                <span>Neste</span>
                <HoyreChevron />
            </Lenke>
        </div>
    );
};

export default FremTilbakeNavigasjon;
