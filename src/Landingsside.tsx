import { Knapp } from 'nav-frontend-knapper';
import React, { FunctionComponent } from 'react';
import { useHistory } from 'react-router-dom';

const Landingsside: FunctionComponent = () => {
    const history = useHistory();

    const loggInn = () => {
        history.push({
            pathname: `/refusjon/`,
            search: window.location.search,
        });
    };

    return (
        <div>
            <Knapp onClick={loggInn}>Logg inn</Knapp>
        </div>
    );
};

export default Landingsside;
