import {queryClient} from "@/src/lib/reactQuery";
import {useMutation, useQuery, useQueryClient} from "react-query";
import { User } from "../types/User";
import {api} from "@/src/lib/api";
import {AxiosError} from "axios";

const getUser = (): Promise<User> => {
    return api.get("auth/me")
}

export const useUser = () => {
    return useQuery<User, AxiosError>({
        queryKey: ["me"],
        queryFn: getUser,
        onError: err => {
            console.warn(err.toJSON())
            console.log(err.status)
        },
        onSuccess: console.log
    })
}

export const useUserId = () => {
    const useUserResponse = useUser();
    const {data: user} = useUserResponse
    if (user) return user.userId
    else return undefined
}