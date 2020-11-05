import React, { FunctionComponent } from 'react';
import { Undertittel } from 'nav-frontend-typografi';
import BEMHelper from '../../../utils/bem';
import { INNTEKTSTEGCLASSNAME } from './InntektSteg';
import LesMerPanel from '../../../komponenter/LesMerPanel/LesMerPanel';
import Ekspanderbartpanel from 'nav-frontend-ekspanderbartpanel';
import VerticalSpacer from '../../../komponenter/VerticalSpacer';
import { ReactComponent as Stranden } from '@/asset/image/inntektsteg.strand.svg';
import { ReactComponent as Sykepenger } from '@/asset/image/inntektsteg.sykepenger.svg';
import EkspanderbartpanelTittel from './EkspanderbartpanelTittel';

interface Props {
    feriepenger: number;
    sykepenger: number;
}

const SykdomOpplysninger: FunctionComponent<Props> = (props: Props) => {
    const cls = BEMHelper(INNTEKTSTEGCLASSNAME);

    return (
        <div className={cls.element('info-seksjon')}>
            <Undertittel>Inntektsopplysninger som gir fratrekk rapportert i perioden</Undertittel>
            <LesMerPanel
                åpneLabel="Les om hva som gir fratrekk"
                lukkLabel="Lukk"
                className={cls.element('lesmer-info')}
            >
                Her kan du lese om hva som inngår i beregningen.
            </LesMerPanel>
            <Ekspanderbartpanel
                tittel={
                    <EkspanderbartpanelTittel
                        ikon={<Stranden />}
                        tittel="Feriepenger"
                        visningssum={props.feriepenger}
                    />
                }
            >
                {/* TODO sette innhold til panel */}
                Her kan vi skrive noe mer om hvordan vi har hentet denne posten. Feks hva posten heter i A-meldingen.
                Eller om det er noe annet som er relevant å vise om denne posten.
            </Ekspanderbartpanel>
            <VerticalSpacer rem={1} />
            <Ekspanderbartpanel
                tittel={
                    <EkspanderbartpanelTittel
                        ikon={<Sykepenger />}
                        tittel="Sykepenger"
                        visningssum={props.sykepenger}
                    />
                }
            >
                {/* TODO sette innhold til panel */}
                Her kommer innholdet.
            </Ekspanderbartpanel>
        </div>
    );
};

export default SykdomOpplysninger;
