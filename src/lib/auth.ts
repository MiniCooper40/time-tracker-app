import {supabase} from "@/src/lib/supabase";

export const login = (email: string, password: string) => {
    return supabase.auth.signInWithPassword({
        email,
        password
    })
}

export const register = (email: string, password: string) => {
    return supabase.auth.signUp({
        email,
        password
    })
}