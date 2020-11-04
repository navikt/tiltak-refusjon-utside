import { ReactComponent as NavIkon } from '@/asset/image/navikon.svg';
import axios from 'axios';
import { Flatknapp } from 'nav-frontend-knapper';
import { Input } from 'nav-frontend-skjema';
import React, { FunctionComponent, useState } from 'react';
import { InnloggetBruker } from './bruker/BrukerContextType';

type Props = {
    innloggetBruker: InnloggetBruker | undefined;
};

const COOKIE_NAME = `tokenx-token`;

const LokalLogin: FunctionComponent<Props> = (props) => {
    const [pid, setPid] = useState('15000000000');

    const loggUtClick = () => {
        document.cookie = COOKIE_NAME + '=;expires=Tue, 15 Jan 2000 21:47:38 GMT;domain=localhost;path=/';
        window.location.reload();
    };
    const loggInnKnapp = async (pid: string) => {
        const response = await axios.get(
            `https://tiltak-fakelogin.labs.nais.io/token?aud=aud-localhost&iss=tokenx&acr=Level4&pid=${pid}`
        );
        document.cookie =
            COOKIE_NAME + '=' + response.data + ';expires=Tue, 15 Jan 2044 21:47:38 GMT;domain=localhost;path=/';
        window.location.reload();
    };

    return (
        <div style={{ display: 'flex', justifyContent: 'space-between', backgroundColor: 'white', padding: '0.5rem' }}>
            <div>
                <NavIkon
                    onClick={() => {
                        window.location.href = '/';
                    }}
                />
            </div>
            <div>
                {props.innloggetBruker !== undefined ? (
                    <div>
                        <span>{props.innloggetBruker.identifikator}</span>
                        <Flatknapp style={{ marginLeft: '0.5rem' }} onClick={loggUtClick}>
                            Logg ut
                        </Flatknapp>
                    </div>
                ) : (
                    <div style={{ display: 'flex' }}>
                        <Input
                            placeholder="Logg inn som"
                            value={pid}
                            onChange={(event) => setPid(event.currentTarget.value)}
                        />
                        <Flatknapp style={{ marginLeft: '0.5rem' }} disabled={!pid} onClick={() => loggInnKnapp(pid)}>
                            Logg inn
                        </Flatknapp>
                    </div>
                )}
            </div>
        </div>
    );
};

export default LokalLogin;
