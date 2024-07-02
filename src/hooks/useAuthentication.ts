import {useContext} from "react";
import {AuthenticationContext} from "@/src/contexts/authenticationContext";

export const useAuthentication = () => {
    return useContext(AuthenticationContext)
}