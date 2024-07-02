import {QueryClient} from "react-query";

export const queryClient = new QueryClient({
    defaultOptions: {
        queries: {
            staleTime: 10000,
            refetchOnMount: false,
            refetchOnWindowFocus: false,
            refetchOnReconnect: true
        }
    }
})