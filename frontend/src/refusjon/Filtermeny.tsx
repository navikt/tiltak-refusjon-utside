import React, { FunctionComponent } from 'react';
import Ekspanderbartpanel from 'nav-frontend-ekspanderbartpanel';
import { RadioGruppe, Radio } from 'nav-frontend-skjema';

const Filtermeny: FunctionComponent = () => {
    return (
        <>
            <Ekspanderbartpanel tittel="Status" apen={true}>
                <RadioGruppe legend="">
                    <Radio label={'Ubehandlet'} name="status" />
                    <Radio label={'Behandlet'} name="status" />
                </RadioGruppe>
            </Ekspanderbartpanel>
            <div style={{ marginTop: '1.25rem' }} />
            <Ekspanderbartpanel tittel="TiltaksType" apen={true}>
                <RadioGruppe legend="">
                    <Radio label={'Alle'} name="tiltak" />
                    <Radio label={'Mentor'} name="tiltak" />
                    <Radio label={'Midlertidig lønnstilskudd'} name="tiltak" />
                    <Radio label={'Varig lønnstilskudd'} name="tiltak" />
                </RadioGruppe>
            </Ekspanderbartpanel>
        </>
    );
};

export default Filtermeny;
