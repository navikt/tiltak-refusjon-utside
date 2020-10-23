import axios from 'axios';
import {InnloggetBruker} from "../Context-Provider/BrukerContextType";

export const API_URL = '/api';

export const hentInnloggetBruker = async (): Promise<InnloggetBruker> => {
    const response = await axios.get(`${API_URL}/innloggetBruker`);
    return response.data;
};
