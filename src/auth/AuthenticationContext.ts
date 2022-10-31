import React from "react";
import { claim } from "./auth.models"

const AuthenticationContext = React.createContext<{
    claims: claim[];
    update(claims: claim[]): void;    // funzione per aggiornare i claims
}>({ claims: [], update: () => { } });  // oggetto di default

export default AuthenticationContext;