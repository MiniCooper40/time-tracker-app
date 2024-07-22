import {QueryClient, UseMutationOptions} from "react-query";

export const queryClient = new QueryClient({
    defaultOptions: {
        queries: {
            staleTime: 10000,
            refetchOnWindowFocus: false,
            refetchOnMount: false,
            refetchOnReconnect: false,
            retry: false,
        }
    }
})

export type MutationOptions<A,B,C,D> = Omit<UseMutationOptions<A,B,C,D>, "mutationFn">