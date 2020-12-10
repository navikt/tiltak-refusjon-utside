import React, { FunctionComponent, useState } from 'react';
import {
    finnForsteInntekstDato,
    finnSisteInntekstDato,
    getAntallMndTilSVGGrid,
    getEnheterMellomStandardFormat,
} from '../../../../../utils/datoUtils';
import { Inntektsgrunnlag, Tilskuddsgrunnlag } from '../../../../refusjon';
import { Moment } from 'moment';
import FordelingGraph from './FordelingGraph';
import moment from 'moment';

interface Props {
    inntektsgrunnlag: Inntektsgrunnlag;
    tilskuddsgrunnlag: Tilskuddsgrunnlag;
}

const FordelingGraphProvider: FunctionComponent<Props> = (props) => {
    const SVG_GRID_WIDTH = 540;
    const [forsteInntekstDato] = useState<Moment[]>(finnForsteInntekstDato(props.inntektsgrunnlag));
    const [sisteInntekstDato] = useState<Moment[]>(finnSisteInntekstDato(props.inntektsgrunnlag));

    const getSVGGridEnhetUtFraStorstLengde = (
        inntektsPeriodeLength: number,
        tilskuddsPeriodeLength: number
    ): number => {
        if (inntektsPeriodeLength > tilskuddsPeriodeLength) {
            return SVG_GRID_WIDTH / (inntektsPeriodeLength + 1);
        }
        return SVG_GRID_WIDTH / (tilskuddsPeriodeLength + 1);
    };

    const setMndGrid = (inntektsPeriodeLength: number, tilskuddsPeriodeLength: number): string[] => {
        if (inntektsPeriodeLength > tilskuddsPeriodeLength) {
            return getAntallMndTilSVGGrid(
                forsteInntekstDato[0].format('YYYY-MM-DD'),
                sisteInntekstDato[0].format('YYYY-MM-DD')
            );
        }
        return getAntallMndTilSVGGrid(props.tilskuddsgrunnlag.tilskuddFom, props.tilskuddsgrunnlag.tilskuddTom);
    };

    const [datoerInntektsPeriode] = useState(
        getEnheterMellomStandardFormat(
            forsteInntekstDato[0].format('YYYY-MM-DD'),
            sisteInntekstDato[0].format('YYYY-MM-DD')
        )
    );

    const [datoerTilskuddsGrunnlag] = useState<string[]>(
        getEnheterMellomStandardFormat(props.tilskuddsgrunnlag.tilskuddFom, props.tilskuddsgrunnlag.tilskuddTom)
    );

    const [maneder] = useState<string[]>(setMndGrid(datoerInntektsPeriode.length, datoerTilskuddsGrunnlag.length));

    const [gridMaaleEnhetPrDag] = useState<number>(
        getSVGGridEnhetUtFraStorstLengde(datoerInntektsPeriode.length, datoerTilskuddsGrunnlag.length)
    );

    const [gridmaaleEnhetPrMnd] = useState<number>(SVG_GRID_WIDTH / (maneder.length - 1));

    const svgHeight = () => (props.inntektsgrunnlag.inntekter.length * 4 + 5) * 16 + 48;

    const datoTilEnhet = datoerTilskuddsGrunnlag.map((dato, i) => {
        const enhet = gridMaaleEnhetPrDag + gridMaaleEnhetPrDag * i;
        return { dato, enhet };
    });

    const tilskuddPeriodeEnheter = datoTilEnhet
        .map((enhet) => {
            if (enhet.dato === props.tilskuddsgrunnlag.tilskuddFom) {
                const getPeriodeTOM = datoTilEnhet.filter((e) => e.dato === props.tilskuddsgrunnlag.tilskuddTom);
                const fraDato = enhet.dato;
                const fraEnhet = enhet.enhet;
                const tilDato = getPeriodeTOM[0].dato;
                const tilEnhet = getPeriodeTOM[0].enhet;
                return { fraDato: fraDato, fraEnhet: fraEnhet, tilDato: tilDato, tilEnhet: tilEnhet };
            }
            return null;
        })
        .filter((e) => e !== null);

    const inntektsEnheter = props.inntektsgrunnlag.inntekter.map((inntekt) => {
        const datoEnhet = datoTilEnhet.filter(
            (d) => d.dato === inntekt.opptjeningsperiodeTom || d.dato === inntekt.opptjeningsperiodeFom
        );
        if (!datoEnhet[1]) {
            const finnsluttenPaMnd = datoTilEnhet.find(
                (d) => d.dato === moment(datoEnhet[0].dato).endOf('month').format('YYYY-MM-DD')
            );
            return {
                fraDato: datoEnhet[0].dato,
                fraEnhet: datoEnhet[0].enhet,
                tilDato: finnsluttenPaMnd!.dato,
                tilEnhet: finnsluttenPaMnd!.enhet,
            };
        }
        return {
            fraDato: datoEnhet[0].dato,
            fraEnhet: datoEnhet[0].enhet,
            tilDato: datoEnhet[1].dato,
            tilEnhet: datoEnhet[1].enhet,
        };
    });

    const svgEnhetMap = datoTilEnhet.map((enhet) => {
        const inntektFunnet = inntektsEnheter.filter((i) => i.fraDato <= enhet.dato && i.tilDato >= enhet.dato);
        if (inntektFunnet.length !== 0) {
            return { ...enhet, inntekt: inntektFunnet };
        }
        return { ...enhet, inntekt: null };
    });

    return (
        <>
            <div>
                <FordelingGraph
                    svgWidth={SVG_GRID_WIDTH}
                    svgHeight={svgHeight()}
                    gridmaaleEnhetPrMnd={gridmaaleEnhetPrMnd}
                    maander={maneder}
                    tilskuddPeriodeEnheter={tilskuddPeriodeEnheter}
                    inntektsEnheter={inntektsEnheter}
                    inntektsgrunnlag={props.inntektsgrunnlag}
                    svgEnhetMap={svgEnhetMap}
                />
            </div>
        </>
    );
};

export default FordelingGraphProvider;
