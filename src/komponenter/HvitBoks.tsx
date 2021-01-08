import React, { FunctionComponent, HTMLAttributes } from 'react';

type Props = HTMLAttributes<HTMLDivElement>;

const HvitBoks: FunctionComponent<Props> = (props) => {
    const styling = {
        ...props.style,
        borderRadius: '4px',
        padding: '3rem 2.5rem',
        backgroundColor: 'white',
        marginBottom: '1rem',
        maxWidth: '50rem',
        width: '100%',
    };

    return <div className="hvitcontainer" style={styling} {...props} />;
};

export default HvitBoks;
