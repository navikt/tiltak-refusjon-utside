import axios, { AxiosError } from 'axios';
import useSWR, { mutate } from 'swr';
import { InnloggetBruker } from '../bruker/BrukerContextType';
import { feilmelding } from '../feilkodemapping';
import { Refusjon } from '../refusjon/refusjon';
import { Status } from '../refusjon/status';
import { Tiltak } from '../refusjon/tiltak';

export const API_URL = '/api/arbeidsgiver';

export class FeilkodeError extends Error {}

const api = axios.create({
    baseURL: '/api/arbeidsgiver',
    timeout: 5000,
    withCredentials: true,
    headers: { Pragma: 'no-cache', 'Cache-Control': 'no-cache' },
    validateStatus: (status) => status < 400,
});

const håndterFeil = (error: AxiosError) => {
    const feilkode = error.response?.headers.feilkode;
    if (feilkode) {
        return Promise.reject({ feilkode, feilmelding: feilmelding(feilkode) });
    }
    return Promise.reject(error);
};

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
    const response = await axios.post(`${API_URL}/refusjon/${refusjonId}/inntektsoppslag`).catch(håndterFeil);
    await mutate(`/refusjon/${refusjonId}`);
    return response.data;
};

export const godkjennRefusjon = async (refusjonId: string) => {
    const response = await axios.post(`${API_URL}/refusjon/${refusjonId}/godkjenn`).catch(håndterFeil);
    await mutate(`/refusjon/${refusjonId}`);
    return response.data;
};

export const setKid = async (refusjonId: string, kid: string) => {
    console.log('setKidNummer refusjon=', refusjonId);
    console.log('setKidNummer kid=', kid);
    // const response = await axios.put(`${API_URL}/refusjon/${refusjonId}/kid`, kid).catch(håndterFeil);
    // return response.data;
};

export const useHentRefusjoner = (bedriftnummer: string, status?: Status, tiltakstype?: Tiltak) => {
    const { data } = useSWR<Refusjon[]>(
        `/refusjon?bedriftNr=${bedriftnummer}&status=${status || ''}&tiltakstype=${tiltakstype || ''}`,
        swrConfig
    );
    return data!;
};

export const useHentRefusjon = (refusjonId: string) => {
    const { data } = useSWR<Refusjon>(`/refusjon/${refusjonId}`, swrConfig);
    return data!;
};

export const useHentTidligereRefusjoner = (refusjonId: string) => {
    const { data } = useSWR<Refusjon[]>(`/refusjon/${refusjonId}/tidligere-refusjoner`, swrConfig);
    return data!;
};
