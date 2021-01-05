import React, { FunctionComponent } from 'react';
import { Undertittel } from 'nav-frontend-typografi';
import { INNTEKTSTEGCLASSNAME } from './InntektSteg';
import { ReactComponent as Pengesekk } from '@/asset/image/pengesekkdollar.svg';
import BEMHelper from '../../../utils/bem';
import LesMerPanel from '../../../komponenter/LesMerPanel/LesMerPanel';
import Ekspanderbartpanel from 'nav-frontend-ekspanderbartpanel';
import EkspanderbartpanelTittel from './EkspanderbartpanelTittel';

interface Props {
    nettoMånedslønn: number;
}

const FerieOpplysninger: FunctionComponent<Props> = (props: Props) => {
    const cls = BEMHelper(INNTEKTSTEGCLASSNAME);

    return (
        <div className={cls.element('info-seksjon')}>
            <Undertittel>Lønn utbetalt i perioden</Undertittel>
            <LesMerPanel
                åpneLabel="Les om hva som inngår i beregningen"
                lukkLabel="Lukk"
                className={cls.element('lesmer-info')}
            >
                Her kan du lese om hva som inngår i beregningen.
            </LesMerPanel>
            <Ekspanderbartpanel
                tittel={
                    <EkspanderbartpanelTittel
                        ikon={<Pengesekk />}
                        tittel="Brutto lønn i perioden"
                        visningssum={props.nettoMånedslønn}
                    />
                }
            >
                {/* TODO sette innhold til panel */}
                Her kommer innholdet
            </Ekspanderbartpanel>
        </div>
    );
};

export default FerieOpplysninger;
