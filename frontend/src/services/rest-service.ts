import axios from 'axios';
import { AxiosResponse } from 'axios';

export const API_URL = '/api';

export const hentInnloggetBruker = async (): Promise<AxiosResponse> => {
    return await axios.get(`${API_URL}/innloggetBruker`);
};
