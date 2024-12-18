import { apiSlice } from "./apiSlice";

export const userApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation({
      query: (data) => ({
        url: "/login",
        method: "POST",
        body: data,
      }),
    }),
    register: builder.mutation({
      query: (data) => ({
        url: "/registration",
        method: "POST",
        body: data,
      }),
    }),
    logout: builder.mutation({
      query: () => ({
        url: "/login",
        method: "POST",
      }),
    }),
    getProfile: builder.query({
      query: () => ({
        url: "/profile",
        method: "GET",
      }),
    }),
    updateProfile: builder.mutation({
      query: (data) => ({
        url: "/profile/update",
        method: "PUT",
        body: data,
      }),
    }),
    updateProfileImg: builder.mutation({
      query: (data) => ({
        url: "/profile/image",
        method: "PUT",
        body: data,
      }),
      transformResponse: (response) => {
        return response.data;
      },
    }),
    getBalance: builder.query({
      query: () => ({
        url: "/balance",
        method: "GET",
        headers: (headers) => {
          const token = localStorage.getItem("userToken");
          if (token) {
            headers.set("Authorization", `Bearer ${token}`);
          }
          return headers;
        },
      }),
    }),
    getBanners: builder.query({
      query: () => ({
        url: "/banner",
        method: "GET",
      }),
    }),
    getServices: builder.query({
      query: () => ({
        url: "/services",
        method: "GET",
      }),
    }),
    topUpBalance: builder.mutation({
      query: (data) => ({
        url: "/topup",
        method: "POST",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("userToken")}`,
        },
        body: data,
      }),
    }),
    getTransactionHistory: builder.query({
      query: ({ limit = 10 }) => {
        return {
          url: "/transaction/history",
          method: "GET",
          params: {
            limit,
          },
          headers: (headers, { getState }) => {
            const token = getState().auth.token;
            if (token) {
              headers.set("Authorization", `Bearer ${token}`);
            }
            return headers;
          },
        };
      },
    }),
  }),
});

export const {
  useLoginMutation,
  useRegisterMutation,
  useLogoutMutation,
  useUpdateProfileMutation,
  useGetProfileQuery,
  useUpdateProfileImgMutation,
  useGetBalanceQuery,
  useGetBannersQuery,
  useGetServicesQuery,
  useTopUpBalanceMutation,
  useGetTransactionHistoryQuery,

} = userApiSlice;
