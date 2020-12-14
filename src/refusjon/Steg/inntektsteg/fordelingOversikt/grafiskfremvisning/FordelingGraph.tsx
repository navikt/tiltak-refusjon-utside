import React, { FunctionComponent, useState } from 'react';
import BEMHelper from '../../../../../utils/bem';
import debounce from 'lodash.debounce';
import './fordelingGraph.less';
import { Normaltekst, Element } from 'nav-frontend-typografi';
import moment from 'moment';
import { Enhet, Inntekt, PositionInfo, TilskuddPeriode } from './fordelingTypes';

interface Props {
    svgWidth: number;
    svgHeight: number;
    gridEnhetMnd: number;
    maander: string[];
    tilskuddPeriode: (TilskuddPeriode | null)[];
    inntekt: Inntekt[];
    gridMap: Enhet[];
}

const cls = BEMHelper('inntektsgraf');

const FordelingGraph: FunctionComponent<Props> = (props) => {
    const [position, setPosition] = useState<PositionInfo | undefined>(undefined);

    const mousePointerEvent = (event: any) => {
        let inntektInfo: undefined | React.ReactNode = <Normaltekst>ingen inntekt</Normaltekst>;
        let inntektFelt: undefined | { id: string }[] = undefined;

        const inntekter = props.gridMap.find(
            (enhet) =>
                enhet.kordinatStart <= event.nativeEvent.layerX && enhet.kordinatSlutt >= event.nativeEvent.layerX
        );

        if (inntekter && inntekter.inntekt) {
            inntektFelt = inntekter.inntekt.map((i) => {
                return { id: i.id };
            });

            inntektInfo = inntekter.inntekt.map((i, dex) => {
                return (
                    <ul className={cls.element('label-list')} key={dex}>
                        <li>
                            <Normaltekst>
                                {moment(i.fraDato).format('MM.DD')}-{moment(i.tilDato).format('DD-MM')}
                            </Normaltekst>
                        </li>
                        <li>
                            <Normaltekst>{i.belop}kr</Normaltekst>
                        </li>
                    </ul>
                );
            });
        }

        setPosition({
            yPos: event.nativeEvent.layerY,
            xPos: event.nativeEvent.layerX,
            dato: inntekter?.dato,
            inntektLabel: inntektInfo,
            inntektFeltId: inntektFelt,
        });
    };

    const debounceMousePointerEvent = debounce(mousePointerEvent, 5);

    return (
        <>
            <figure className={cls.className}>
                <label
                    style={{ left: `${(position && (position.xPos - 110).toString().concat('px')) || '0'}` }}
                    className={cls.element('infolabel')}
                >
                    <Element className={cls.element('boldFont')}>Dato</Element>
                    <Normaltekst className={cls.element('boldFont')}>{(position && position.dato) || ''}</Normaltekst>
                    {position && position.inntektLabel}
                </label>
                <figcaption>
                    <svg
                        width={props.svgWidth.toString()}
                        height={props.svgHeight.toString()}
                        viewBox={`0 0 ${props.svgWidth} ${props.svgHeight}`}
                        onMouseMove={debounceMousePointerEvent}
                    >
                        <g className={cls.element('gridline')}>
                            <g className={cls.element('labels x-labels')}>
                                {props.maander.map((mnd: string, index: number) => {
                                    const xPosition = index * props.gridEnhetMnd;
                                    return (
                                        <text
                                            y="16"
                                            x={index === props.maander.length - 1 ? xPosition - 30 : xPosition}
                                            key={index}
                                        >
                                            {index === props.maander.length - 1
                                                ? moment(mnd, 'MMMM').format('MMM')
                                                : mnd}
                                        </text>
                                    );
                                })}
                            </g>
                            <line x1="0" x2={props.svgWidth} y1="32" y2="32" />
                            <rect className={cls.element('bakgrunnskygge')} height={48} width={props.svgWidth} y={64} />
                            <g x={props.tilskuddPeriode[0]!.kordinatStart} y={64}>
                                <rect
                                    className={cls.element('periode')}
                                    height={48}
                                    width={
                                        props.tilskuddPeriode[0]!.kordinatSlutt -
                                        props.tilskuddPeriode[0]!.kordinatStart
                                    }
                                    x={props.tilskuddPeriode[0]!.kordinatStart}
                                    y={64}
                                />

                                <path
                                    viewBox="0 0 24 24"
                                    fillRule="evenodd"
                                    clipRule="evenodd"
                                    transform={`translate(${props.tilskuddPeriode[0]!.kordinatStart + 7}, 75)`}
                                    d="M 24 22 a 2 2 0 0 1 -2 2 H 2 a 2 2 0 0 1 -2 -2 V 5 a 2 2 0 0 1 2 -2 h 4 V 1 A 1 1 0 0 1 7.993 0.883 L 8 1 v 2 h 7.999 L 16 1 a 1 1 0 0 1 1.993 -0.117 L 18 1 l -0.001 2 H 22 a 2 2 0 0 1 2 2 v 17 Z m -2 -10 H 2 v 10 h 20 V 12 Z M 6 5 H 2 v 5 h 20 V 5 h -4.001 L 18 7 a 1 1 0 0 1 -1.993 0.117 L 16 7 l -0.001 -2 H 8 v 2 a 1 1 0 0 1 -1.993 0.117 L 6 7 V 5 Z"
                                    fill="#3E3832"
                                />
                            </g>
                            {props.inntekt.map((inntekt, index) => {
                                return (
                                    <g key={index}>
                                        <rect
                                            className={cls.element('bakgrunnskygge')}
                                            height={48}
                                            width={props.svgWidth}
                                            y={128 + index * 64}
                                            key={index}
                                        />
                                        <rect
                                            id={inntekt.id}
                                            className={cls.element('inntekt')}
                                            height={48}
                                            width={inntekt.kordinatSlutt - inntekt.kordinatStart}
                                            x={inntekt.kordinatStart}
                                            y={128 + index * 64}
                                        />
                                        <path
                                            fillRule="evenodd"
                                            clipRule="evenodd"
                                            transform={`translate(${inntekt.kordinatStart + 7}, ${140 + index * 64})`}
                                            d="M19 0a5 5 0 014.584 7H24v14H0V7h10a5 5 0 015-5l.063-.082A4.991 4.991 0 0119 0zm3 9c-.836.628-1.875 1-3 1l.033-.044a5.012 5.012 0 01-2.394 1.77c.098.103.182.223.253.36.12.234.18.525.18.873 0 .432-.095.787-.284 1.066-.157.233-.36.416-.607.551l-.154.075L17.36 17h-1.485l-1.125-2.115h-.729V17h-1.322v-5.56a5.02 5.02 0 01-2.281-2.438L2 9v10h20V9zM8.157 11.132v2.403h.036l1.746-2.403h1.458l-1.773 2.34L11.721 17h-1.449l-1.431-2.475-.684.9V17H6.834v-5.868h1.323zm6.547 1.053h-.684v1.647h.684c.348 0 .614-.074.797-.22.183-.148.274-.365.274-.653 0-.288-.091-.489-.274-.603-.152-.095-.362-.15-.63-.166l-.167-.005zM15 4a3 3 0 100 6 3 3 0 000-6zm4-2c-.643 0-1.238.202-1.726.546l.132.07a4.999 4.999 0 012.524 5.22l.124-.027-.042.016A3.001 3.001 0 0019 2z"
                                            fill="#3E3832"
                                        />
                                    </g>
                                );
                            })}
                            <line
                                className={cls.element('stripletLinje')}
                                y1={64}
                                y2={props.svgHeight + 64}
                                x1={props.tilskuddPeriode[0]?.kordinatStart}
                                x2={props.tilskuddPeriode[0]?.kordinatStart}
                            />
                            <line
                                className={cls.element('stripletLinje')}
                                y1={64}
                                y2={props.svgHeight + 64}
                                x1={props.tilskuddPeriode[0]?.kordinatSlutt}
                                x2={props.tilskuddPeriode[0]?.kordinatSlutt}
                            />

                            <g className="grid v-grid" id="vGrid">
                                <line
                                    className={cls.element('dataInfo')}
                                    y1="64"
                                    y2={props.svgHeight - 15}
                                    x1={(position && position.xPos) || '0'}
                                    x2={(position && position.xPos) || '0'}
                                />

                                <polygon
                                    className={cls.element('dataInfo', 'triangle')}
                                    points="12,12 0,12 6,24"
                                    transform={`translate(${(position && position.xPos - 6) || 0}, 40)`}
                                    x={(position && position.xPos) || '0'}
                                    y="50"
                                    stroke="0"
                                />
                                {position?.inntektFeltId?.map((felt) => {
                                    return (
                                        <>
                                            <circle
                                                className={cls.element('dataInfo')}
                                                cx={(position && position.xPos) || '0'}
                                                cy={128 + parseInt(felt.id) * 64}
                                                r="2"
                                                strokeWidth="1"
                                                opacity="0.6"
                                                fill="black"
                                            />
                                            <circle
                                                className={cls.element('dataInfo')}
                                                cx={(position && position.xPos) || '0'}
                                                cy={128 + parseInt(felt.id) * 64}
                                                r="5"
                                                strokeWidth="0"
                                                opacity="0.6"
                                                fill="#B7CFC0"
                                            />
                                        </>
                                    );
                                })}
                            </g>
                        </g>
                    </svg>
                </figcaption>
            </figure>
        </>
    );
};

export default FordelingGraph;
