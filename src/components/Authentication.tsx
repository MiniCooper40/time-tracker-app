import {Session} from "@supabase/auth-js";
import {createContext, ReactNode, useEffect, useState} from "react";
import {AuthenticationContext} from "@/src/contexts/authenticationContext";
import {supabase} from "@/src/lib/supabase";
import {WithChildren} from "@/src/types/WithChildren";
import {router} from "expo-router";

export const Authentication = ({children}: WithChildren) => {
    const [session, setSession] = useState<Session | null>(null)
    const [loading, setLoading] = useState<boolean>(true)

    useEffect(() => {
        supabase.auth.getSession().then(({ data: { session } }) => {
            setSession(session)
            setLoading(false)
            router.replace("/")
        })

        supabase.auth.onAuthStateChange((_event, session) => {
            setSession(session)
            router.replace("/")
        })
    }, [])

    return (
        <AuthenticationContext.Provider value={{session, loading}}>
            {children}
        </AuthenticationContext.Provider>
    )
}