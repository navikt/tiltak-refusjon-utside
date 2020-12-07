import axios from 'axios';
import useSWR, { mutate } from 'swr';
import { InnloggetBruker } from '../bruker/BrukerContextType';
import { Refusjon } from '../refusjon/refusjon';

export const API_URL = '/api/arbeidsgiver';

const api = axios.create({
    baseURL: '/api/arbeidsgiver',
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

export const gjorInntektsoppslag = async (refusjonId: string) => {
    const response = await axios.post(`${API_URL}/refusjon/${refusjonId}/inntektsoppslag`);
    mutate(`/refusjon/${refusjonId}`);
    return response.data;
};

export const useHentRefusjoner = (bedriftnummer: string) => {
    const { data } = useSWR<Refusjon[]>(`/refusjon?bedriftNr=${bedriftnummer}`, swrConfig);
    return data;
};

export const useHentRefusjon = (refusjonId: string) => {
    const { data } = useSWR<Refusjon>(`/refusjon/${refusjonId}`, swrConfig);
    return data!;
};
