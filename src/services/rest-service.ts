import axios from 'axios';
import useSWR from 'swr';
import { InnloggetBruker } from '../bruker/BrukerContextType';
import { Refusjon } from '../refusjon/refusjon';

export const API_URL = '/api';

const api = axios.create({
    baseURL: '/api',
    timeout: 5000,
    withCredentials: true,
    headers: { Pragma: 'no-cache', 'Cache-Control': 'no-cache' },
});

const axiosFetcher = (url: string) => api.get(url).then((res) => res.data);

const swrConfig = {
    fetcher: axiosFetcher,
    suspense: true,
};

export const hentInnloggetBruker = async () => {
    const response = await axios.get<InnloggetBruker>(`${API_URL}/innlogget-bruker`);
    return response.data;
};

export const useHentRefusjoner = (bedriftnummer: string) => {
    const { data } = useSWR<Refusjon[]>(`/refusjon/bedrift/${bedriftnummer}`, swrConfig);
    return data;
};

export const useHentRefusjon = (refusjonId: string) => {
    const { data } = useSWR<Refusjon>(`/refusjon/${refusjonId}`, swrConfig);
    return data!;
};
