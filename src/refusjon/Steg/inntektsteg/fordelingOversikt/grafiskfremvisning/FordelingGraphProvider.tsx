import React, { FunctionComponent, useState } from 'react';
import {
    finnForsteInntekstDato,
    finnSisteInntekstDato,
    getEnheterMellomStandardFormat,
} from '../../../../../utils/datoUtils';
import { Inntektsgrunnlag, Tilskuddsgrunnlag } from '../../../../refusjon';
import { Moment } from 'moment';
import {
    getDatoer,
    getDiffMellomToDatoer,
    getGridMap,
    getInntekt,
    getGridtUtFraStorstPeriode,
    getTilskuddsPeriode,
    gridHeight,
    setMndGrid,
} from '../../../../../utils/fordelingGrafUtils';
import FordelingGraphBuilder from './FordelingGraphBuilder';

interface Props {
    inntektsgrunnlag: Inntektsgrunnlag;
    tilskuddsgrunnlag: Tilskuddsgrunnlag;
}

const FordelingGraphProvider: FunctionComponent<Props> = (props) => {
    const { tilskuddFom, tilskuddTom } = props.tilskuddsgrunnlag;

    const SVG_GRID_WIDTH = 540;
    const [forsteInntekstDato] = useState<Moment[]>(finnForsteInntekstDato(props.inntektsgrunnlag));
    const [sisteInntekstDato] = useState<Moment[]>(finnSisteInntekstDato(props.inntektsgrunnlag));
    const [datoerTilskuddsGrunnlag] = useState<string[]>(getEnheterMellomStandardFormat(tilskuddFom, tilskuddTom));

    const [maneder] = useState<string[]>(
        setMndGrid(
            tilskuddFom,
            tilskuddTom,
            forsteInntekstDato[0].format('YYYY-MM-DD'),
            sisteInntekstDato[0].format('YYYY-MM-DD')
        )
    );

    const [gridMaaleEnhetPrDag] = useState<number>(
        getGridtUtFraStorstPeriode(
            getDiffMellomToDatoer(
                forsteInntekstDato[0].format('YYYY-MM-DD'),
                sisteInntekstDato[0].format('YYYY-MM-DD')
            ),
            datoerTilskuddsGrunnlag.length
        )
    );

    const [gridEnhetMnd] = useState<number>(SVG_GRID_WIDTH / (maneder.length - 1));

    const height = gridHeight(props.inntektsgrunnlag.inntekter.length);

    const datoMapping = getDatoer(
        tilskuddFom,
        tilskuddTom,
        forsteInntekstDato[0].format('YYYY-MM-DD'),
        sisteInntekstDato[0].format('YYYY-MM-DD')
    ).map((dato, i) => {
        const kordinatStart = gridMaaleEnhetPrDag + gridMaaleEnhetPrDag * i;
        const kordinatSlutt = gridMaaleEnhetPrDag + (gridMaaleEnhetPrDag * (i + 1) - 0.1);
        return { dato, kordinatStart, kordinatSlutt };
    });

    const tilskuddPeriode = getTilskuddsPeriode(datoMapping, props.tilskuddsgrunnlag);
    const inntekt = getInntekt(props.inntektsgrunnlag, datoMapping);
    const gridMap = getGridMap(datoMapping, inntekt);

    return (
        <>
            <div>
                <FordelingGraphBuilder
                    svgWidth={SVG_GRID_WIDTH}
                    svgHeight={height}
                    gridEnhetMnd={gridEnhetMnd}
                    maander={maneder}
                    tilskuddPeriode={tilskuddPeriode}
                    inntekt={inntekt}
                    gridMap={gridMap}
                />
            </div>
        </>
    );
};

export default FordelingGraphProvider;
