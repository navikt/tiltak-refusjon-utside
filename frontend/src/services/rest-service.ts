import axios from 'axios';
import { InnloggetBruker } from '../BrukerContext';

export const API_URL = '/api';

export const hentInnloggetBruker = async (): Promise<InnloggetBruker> => {
    return await axios.get(`${API_URL}/innloggetBruker`);
};
