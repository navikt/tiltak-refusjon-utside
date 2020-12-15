import {
    DatoKoordinater,
    Inntekt,
} from '../refusjon/Steg/inntektsteg/fordelingOversikt/grafiskfremvisning/fordelingTypes';
import moment from 'moment';
import { Inntektsgrunnlag, Tilskuddsgrunnlag } from '../refusjon/refusjon';
import { getAntallMndTilSVGGrid, getEnheterMellomStandardFormat } from './datoUtils';

const SVG_GRID_WIDTH = 540;
const REM = 16;
const HOYDE_TOPPOVERSIKT_I_REM = 5;
const HOYDE_INNTEKTSFELT_I_REM = 4;

export const setMndGrid = (
    tilskuddsStart: string,
    tilskuddSlutt: string,
    inntektStart: string,
    inntektSlutt: string
): string[] => {
    const tilskuddperiode = getDiffMellomToDatoer(tilskuddsStart, tilskuddSlutt);
    const inntektsperiode = getDiffMellomToDatoer(inntektStart, inntektSlutt);

    if (inntektsPeriodeStorst(inntektsperiode, tilskuddperiode)) {
        return getAntallMndTilSVGGrid(inntektStart, inntektSlutt);
    }
    return getAntallMndTilSVGGrid(tilskuddsStart, tilskuddSlutt);
};

export const getGridtUtFraStorstPeriode = (inntektsPeriode: number, tilskuddsPeriode: number): number => {
    if (inntektsPeriodeStorst(inntektsPeriode, tilskuddsPeriode)) {
        return SVG_GRID_WIDTH / (inntektsPeriode + 1);
    }
    return SVG_GRID_WIDTH / (tilskuddsPeriode + 1);
};

export const inntektsPeriodeStorst = (inntektsPeriode: number, tilskuddsPeriode: number) => {
    return inntektsPeriode > tilskuddsPeriode;
};

export const getDiffMellomToDatoer = (datoFra: string, datoTil: string) => {
    return moment(datoTil).diff(moment(datoFra), 'days') + 1;
};

// utlede de forskjellige tallene her.
export const gridHeight = (antallIntekter: number) =>
    (antallIntekter * HOYDE_INNTEKTSFELT_I_REM + HOYDE_TOPPOVERSIKT_I_REM) * REM + 48;

export const getGridMap = (datoKordinater: DatoKoordinater[], inntekt: Inntekt[]) => {
    return datoKordinater.map((enhet) => {
        const inntektFunnet = inntekt.filter((i) => i.fraDato <= enhet.dato && i.tilDato >= enhet.dato);
        if (inntektFunnet.length !== 0) {
            return { ...enhet, inntekt: inntektFunnet };
        }
        return { ...enhet, inntekt: null };
    });
};

export const getInntekt = (inntektsgrunnlag: Inntektsgrunnlag, datoKoordinater: DatoKoordinater[]) => {
    return inntektsgrunnlag.inntekter.map((inntekt, index) => {
        const inntekter = datoKoordinater.filter(
            (d) => d.dato === inntekt.opptjeningsperiodeTom || d.dato === inntekt.opptjeningsperiodeFom
        );
        if (!inntekter[1]) {
            const setsluttDato = datoKoordinater.find(
                (d) => d.dato === moment(inntekter[0].dato).endOf('month').format('YYYY-MM-DD')
            );
            return {
                fraDato: inntekter[0].dato,
                tilDato: setsluttDato!.dato,
                koordinatStart: inntekter[0].koordinatStart,
                koordinatSlutt: setsluttDato!.koordinatStart,
                belop: inntekt.beløp,
                id: index.toString(),
            };
        }
        return {
            fraDato: inntekter[0].dato,
            tilDato: inntekter[1].dato,
            koordinatStart: inntekter[0].koordinatStart,
            koordinatSlutt: inntekter[1].koordinatStart,
            belop: inntekt.beløp,
            id: index.toString(),
        };
    });
};

export const getTilskuddsPeriode = (datoKordinater: DatoKoordinater[], tilskuddsgrunnlag: Tilskuddsgrunnlag) => {
    return datoKordinater
        .map((enhet) => {
            if (enhet.dato === tilskuddsgrunnlag.tilskuddFom) {
                const getPeriodeSlutt = datoKordinater.filter((e) => e.dato === tilskuddsgrunnlag.tilskuddTom);
                const datoFra = enhet.dato;
                const datoTil = getPeriodeSlutt[0].dato;
                const kordinatStart = enhet.koordinatStart;
                const kordinatSlutt = getPeriodeSlutt[0].koordinatStart;
                return {
                    datoFra: datoFra,
                    koordinatStart: kordinatStart,
                    datoTil: datoTil,
                    koordinatSlutt: kordinatSlutt,
                };
            }
            return null;
        })
        .filter((e) => e !== null);
};

export const getDatoer = (
    tilskuddsStart: string,
    tilskuddSlutt: string,
    inntektStart: string,
    inntektSlutt: string
): string[] => {
    const tilskuddperiode = getDiffMellomToDatoer(tilskuddsStart, tilskuddSlutt);
    const inntektsperiode = getDiffMellomToDatoer(inntektStart, inntektSlutt);

    if (inntektsPeriodeStorst(inntektsperiode, tilskuddperiode)) {
        return getEnheterMellomStandardFormat(inntektStart, inntektSlutt);
    }

    return getEnheterMellomStandardFormat(tilskuddsStart, tilskuddSlutt);
};
