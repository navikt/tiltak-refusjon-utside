import React, { FunctionComponent, useContext, useState } from 'react';
import { Status } from '../status';
import { Tiltak } from '../tiltak';

export interface Filter {
    status: Status;
    tiltakstype: Tiltak | undefined;
}

type FilterContextType = { filter: Filter; oppdaterFilter: (nyttFilter: Filter) => void };

const FilterContext = React.createContext<FilterContextType | undefined>(undefined);

// Egen hook fordi det sjekkes at den blir brukt riktig, og kan ha undefined som defaultValue
export const useFilter = () => {
    const context = useContext(FilterContext);
    if (context === undefined) {
        throw new Error('Kan kun brukes innenfor FilterProvider');
    }
    return context;
};

export const FilterProvider: FunctionComponent = (props) => {
    const [filter, setFilter] = useState<Filter>({
        status: Status.NY,
        tiltakstype: undefined,
    });

    const oppdaterFilter = (nyttFilter: Filter) => {
        setFilter({ ...filter, ...nyttFilter });
    };

    return (
        <FilterContext.Provider
            value={{
                filter,
                oppdaterFilter,
            }}
        >
            {props.children}
        </FilterContext.Provider>
    );
};
