import axios from 'axios';
import {InnloggetBruker} from "../bruker/BrukerContextType";
import {Refusjon} from "../refusjon/refusjon";

export const API_URL = '/api';

export const hentInnloggetBruker = async (): Promise<InnloggetBruker> => {
    const response = await axios.get(`${API_URL}/innloggetBruker`);
    return response.data;
};

export const hentRefusjoner = async (): Promise<Refusjon[]> => {
    const response= await axios.get(`${API_URL}/refusjon`);
    return response.data
};
