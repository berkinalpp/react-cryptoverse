import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/query/react";

const cryptoApiHeaders = {
  "x-rapidapi-host": process.env.REACT_APP_CRYPTO_API_HOST,
  "x-rapidapi-key": process.env.REACT_APP_CRYPTO_API_KEY,
};

const baseUrl = process.env.REACT_APP_CRYPTO_API_BASEURL;

const createRequest = (url) => ({
  url,
  headers: cryptoApiHeaders,
});

export const cryptoApi = createApi({
  reducerPath: "cryptoApi",
  baseQuery: fetchBaseQuery({baseUrl}),
  endpoints: (builder) => ({
    getCryptos: builder.query({
      query: (count) => createRequest(`/coins?limit=${count}`),
    }),
    getCryptoDetails: builder.query({
      query: (coinID) => createRequest(`/coin/${coinID}`),
    }),
    getCryptoHistory: builder.query({
      query: ({coinID, timePeriod}) =>
        createRequest(`/coin/${coinID}/history?timePeriod=${timePeriod}`),
    }),
    getCryptoExchanges: builder.query({
      query: (coinID) => createRequest(`/coin/${coinID}/exchanges`),
    }),
  }),
});

export const {
  useGetCryptosQuery,
  useGetCryptoDetailsQuery,
  useGetCryptoHistoryQuery,
  useGetCryptoExchangesQuery,
} = cryptoApi;
