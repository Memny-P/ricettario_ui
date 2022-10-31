import axios from "axios";
import { getToken } from "../auth/handleJWT";

export default function configureInteceptor() {
    // voglio intercettare tutte le richieste effettuate per aggiungere se disponibile 
    // il token di autorizzazione JWT => per essere autenticato lato server
    axios.interceptors.request.use(
        function (config) {
            const token = getToken();
            // assegno il token alla richiesta
            if (token)
                config.headers!.Authorization = `bearer ${token}`;

            return config;
        },
        function (error) {
            return Promise.reject(error);
        });
}