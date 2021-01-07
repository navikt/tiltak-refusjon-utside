import React, { FunctionComponent } from 'react';
import { getEnheterMellomStandardFormat, sjekkOmSluttDatoErSatt } from '../../../../../utils/datoUtils';
import { Inntektsgrunnlag, Tilskuddsgrunnlag } from '../../../../refusjon';
import {
    getDatoer,
    getDiffMellomToDatoer,
    getGridMap,
    getGridtUtFraStorstPeriode,
    getInntekt,
    getTilskuddsPeriode,
    gridHeight,
    setMndGrid,
} from '../../../../../utils/fordelingGrafUtils';
import FordelingGraphBuilder from './FordelingGraphBuilder';
import moment from 'moment';

interface Props {
    inntektsgrunnlag: Inntektsgrunnlag;
    tilskuddsgrunnlag: Tilskuddsgrunnlag;
}

const FordelingGraphProvider: FunctionComponent<Props> = (props) => {
    const { tilskuddFom, tilskuddTom } = props.tilskuddsgrunnlag;

    const SVG_GRID_WIDTH = 540;

    const førsteInntektsDato = moment.min(
        props.inntektsgrunnlag.inntekter.map((inntekt) => moment(inntekt.inntektFordelesFom))
    );
    const sisteInntektsDato = moment.max(
        props.inntektsgrunnlag.inntekter.map((inntekt) =>
            sjekkOmSluttDatoErSatt(moment(inntekt.inntektFordelesTom), moment(inntekt.inntektFordelesFom))
        )
    );

    const datoerTilskuddsGrunnlag = getEnheterMellomStandardFormat(tilskuddFom, tilskuddTom);

    const maneder = setMndGrid(
        tilskuddFom,
        tilskuddTom,
        førsteInntektsDato.format('YYYY-MM-DD'),
        sisteInntektsDato.format('YYYY-MM-DD')
    );
    const gridMaaleEnhetPrDag = getGridtUtFraStorstPeriode(
        getDiffMellomToDatoer(førsteInntektsDato.format('YYYY-MM-DD'), sisteInntektsDato.format('YYYY-MM-DD')),
        datoerTilskuddsGrunnlag.length
    );
    const gridEnhetMnd = SVG_GRID_WIDTH / (maneder.length - 1);

    const height = gridHeight(props.inntektsgrunnlag.inntekter.length);

    const datoMapping = getDatoer(
        tilskuddFom,
        tilskuddTom,
        førsteInntektsDato.format('YYYY-MM-DD'),
        sisteInntektsDato.format('YYYY-MM-DD')
    ).map((dato, i) => {
        const koordinatStart = gridMaaleEnhetPrDag + gridMaaleEnhetPrDag * i;
        const koordinatSlutt = gridMaaleEnhetPrDag + (gridMaaleEnhetPrDag * (i + 1) - 0.1);
        return { dato, koordinatStart, koordinatSlutt };
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
